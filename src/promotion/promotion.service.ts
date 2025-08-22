import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Promotion, { PromotionCreationProps } from "@/model/promotion.model";
import { CreatePromotionDto } from "./dto/create-promotion.dto";

/**
 * Service for managing promotions in the database.
 */
@Injectable()
export class PromotionService {
  constructor(
    @InjectModel(Promotion)
    private readonly promotionModel: typeof Promotion,
  ) {}

  /**
   * Retrieves all promotions from the database.
   *
   * @returns An array of promotion objects, or an empty array if no promotions exist.
   * @throws InternalServerErrorException if an error occurs during retrieval.
   */
  async getPromotions(): Promise<PromotionCreationProps[]> {
    try {
      const promotions = await this.promotionModel.findAll();
      return promotions ? promotions.map((p) => p.toJSON()) : [];
    } catch (err: any) {
      console.error("Error getting promotions:", err);
      throw new InternalServerErrorException("Failed to get promotions");
    }
  }

  /**
   * Creates a new promotion in the database.
   * @param createPromotionDto - The data transfer object containing promotion details.
   * @returns The created promotion as a plain object, or null if creation fails.
   * @throws InternalServerErrorException if an error occurs during creation.
   */
  async createPromotion(
    createPromotionDto: CreatePromotionDto,
  ): Promise<PromotionCreationProps | null> {
    try {
      const promotion = await this.promotionModel.create(createPromotionDto);
      return promotion ? promotion.toJSON() : null;
    } catch (err: any) {
      console.error("Error creating promotion:", err);
      throw new InternalServerErrorException("Failed to create promotion");
    }
  }
}
