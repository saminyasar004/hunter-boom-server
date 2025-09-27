import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Product from "@/model/product.model";
import AgentGroup from "@/model/agent-group.model";
import ProductAgentPricing from "@/model/product-agent-pricing.model";
import { Op } from "sequelize";
import { UpdatePricingDto } from "./dto/update-pricing.dto";
import { CreatePricingDto } from "./dto/create-pricing.dto";

@Injectable()
export class PricingService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(AgentGroup) private agentGroupModel: typeof AgentGroup,
    @InjectModel(ProductAgentPricing)
    private pricingModel: typeof ProductAgentPricing,
  ) {}

  async getAllPricing() {
    // Fetch all active products
    const products = await this.productModel.findAll({
      where: { status: "active", isDeleted: 0 },
      attributes: ["productId", "name", "basePrice"],
    });

    // Fetch all active agent groups
    const agentGroups = await this.agentGroupModel.findAll({
      where: { status: "active", isDeleted: false },
      attributes: ["agentGroupId", "name"],
    });

    // Fetch all custom pricings
    const pricings = await this.pricingModel.findAll({
      attributes: ["productId", "agentGroupId", "price"],
    });

    // Build a map for quick lookup: { productId: { agentGroupId: price } }
    const pricingMap = pricings.reduce((map, pricing) => {
      if (!map[pricing.productId]) {
        map[pricing.productId] = {};
      }
      map[pricing.productId][pricing.agentGroupId] = pricing.price;
      return map;
    }, {});

    // Shape the response
    const formattedProducts = products.map((product) => ({
      productId: product.productId,
      name: product.name,
      basePrice: product.basePrice,
      agentPrices: agentGroups.reduce((acc, group) => {
        const customPrice = pricingMap[product.productId]?.[group.agentGroupId];
        acc[group.agentGroupId] = {
          agentGroupName: group.name,
          price: customPrice !== undefined ? customPrice : product.basePrice,
        };
        return acc;
      }, {}),
    }));

    return {
      products: formattedProducts,
      agentGroups: agentGroups.map((group) => ({
        id: group.agentGroupId,
        name: group.name,
      })),
    };
  }

  async createPricing(createPricingDto: CreatePricingDto) {
    const { pricings } = createPricingDto;

    // Validate that all products and agent groups exist
    const productIds = [...new Set(pricings.map((p) => p.productId))];
    const agentGroupIds = [...new Set(pricings.map((p) => p.agentGroupId))];

    const products = await this.productModel.findAll({
      where: { productId: { [Op.in]: productIds }, isDeleted: 0 },
      attributes: ["productId"],
    });

    const agentGroups = await this.agentGroupModel.findAll({
      where: { agentGroupId: { [Op.in]: agentGroupIds }, isDeleted: false },
      attributes: ["agentGroupId"],
    });

    const foundProductIds = products.map((p) => p.productId);
    const foundAgentGroupIds = agentGroups.map((ag) => ag.agentGroupId);

    const invalidProductIds = productIds.filter(
      (id) => !foundProductIds.includes(id),
    );
    const invalidAgentGroupIds = agentGroupIds.filter(
      (id) => !foundAgentGroupIds.includes(id),
    );

    if (invalidProductIds.length > 0) {
      throw new NotFoundException(
        `Products with IDs ${invalidProductIds.join(", ")} not found or deleted`,
      );
    }
    if (invalidAgentGroupIds.length > 0) {
      throw new NotFoundException(
        `Agent groups with IDs ${invalidAgentGroupIds.join(", ")} not found or deleted`,
      );
    }

    // Check for existing pricings to avoid duplicates
    const existingPricings = await this.pricingModel.findAll({
      where: {
        [Op.or]: pricings.map(({ productId, agentGroupId }) => ({
          productId,
          agentGroupId,
        })),
      },
      attributes: ["productId", "agentGroupId"],
    });

    if (existingPricings.length > 0) {
      const duplicatePairs = existingPricings.map(
        (p) => `productId: ${p.productId}, agentGroupId: ${p.agentGroupId}`,
      );
      throw new ConflictException(
        `Pricing entries already exist for: ${duplicatePairs.join(", ")}`,
      );
    }

    // Create new pricing entries
    const createPromises = pricings.map(({ productId, agentGroupId, price }) =>
      this.pricingModel.create({
        productId,
        agentGroupId,
        price,
      }),
    );

    const createdPricings = await Promise.all(createPromises);

    return {
      message: "Pricing created successfully",
      createdPricings: createdPricings.map((pricing) => ({
        productId: pricing.productId,
        agentGroupId: pricing.agentGroupId,
        price: pricing.price,
      })),
    };
  }

  async updatePricing(updatePricingDto: UpdatePricingDto) {
    const { pricings } = updatePricingDto;

    // Validate that all products and agent groups exist
    const productIds = [...new Set(pricings.map((p) => p.productId))];
    const agentGroupIds = [...new Set(pricings.map((p) => p.agentGroupId))];

    const products = await this.productModel.findAll({
      where: { productId: { [Op.in]: productIds }, isDeleted: 0 },
      attributes: ["productId"],
    });

    const agentGroups = await this.agentGroupModel.findAll({
      where: { agentGroupId: { [Op.in]: agentGroupIds }, isDeleted: false },
      attributes: ["agentGroupId"],
    });

    const foundProductIds = products.map((p) => p.productId);
    const foundAgentGroupIds = agentGroups.map((ag) => ag.agentGroupId);

    const invalidProductIds = productIds.filter(
      (id) => !foundProductIds.includes(id),
    );
    const invalidAgentGroupIds = agentGroupIds.filter(
      (id) => !foundAgentGroupIds.includes(id),
    );

    if (invalidProductIds.length > 0) {
      throw new NotFoundException(
        `Products with IDs ${invalidProductIds.join(", ")} not found or deleted`,
      );
    }
    if (invalidAgentGroupIds.length > 0) {
      throw new NotFoundException(
        `Agent groups with IDs ${invalidAgentGroupIds.join(", ")} not found or deleted`,
      );
    }

    // Perform updates using upsert
    const updatePromises = pricings.map(
      async ({ productId, agentGroupId, price }) => {
        await this.pricingModel.upsert({
          productId,
          agentGroupId,
          price,
        });
      },
    );

    await Promise.all(updatePromises);

    // Fetch updated pricing data to return
    const updatedPricings = await this.pricingModel.findAll({
      where: {
        productId: { [Op.in]: productIds },
        agentGroupId: { [Op.in]: agentGroupIds },
      },
      attributes: ["productId", "agentGroupId", "price"],
    });

    return {
      message: "Pricing updated successfully",
      updatedPricings: updatedPricings.map((pricing) => ({
        productId: pricing.productId,
        agentGroupId: pricing.agentGroupId,
        price: pricing.price,
      })),
    };
  }
}
