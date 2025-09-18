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

  /**
   * Deletes an existing promotion by its ID.
   * @param id - The ID of the promotion to delete.
   * @returns True if the promotion was deleted, false otherwise.
   * @throws InternalServerErrorException if an error occurs during deletion.
   */
  async deletePromotion(id: number): Promise<boolean> {
    try {
      const isDeleted = await this.promotionModel.destroy({
        where: { promotionId: id },
      });
      if (isDeleted) {
        return true;
      }
      return false;
    } catch (err: any) {
      console.error("Error deleting promotion:", err);
      throw new InternalServerErrorException("Failed to delete promotion");
    }
  }

  /**
   * Retrieves an existing promotion by its ID.
   * @param id - The ID of the promotion to retrieve.
   * @returns The promotion as a plain object, or null if not found.
   * @throws InternalServerErrorException if an error occurs during retrieval.
   */
  async findPromotionById(id: number): Promise<PromotionCreationProps | null> {
    try {
      const promotion = await this.promotionModel.findByPk(id);
      return promotion ? promotion.toJSON() : null;
    } catch (err: any) {
      console.error("Error getting promotion by ID:", err);
      throw new InternalServerErrorException("Failed to get promotion by ID");
    }
  }

  /**
   * Updates an existing promotion in the database.
   * @param id - The ID of the promotion to update.
   * @param updatePromotionDto - The data transfer object containing updated promotion details.
   * @returns The updated promotion as a plain object, or null if update fails.
   * @throws InternalServerErrorException if an error occurs during update.
   */
  async updatePromotion(
    id: number,
    updatePromotionDto: CreatePromotionDto,
  ): Promise<PromotionCreationProps | null> {
    try {
      const isUpdated = await this.promotionModel.update(updatePromotionDto, {
        where: { promotionId: id },
      });

      if (isUpdated) {
        return this.findPromotionById(id);
      }
      return null;
    } catch (err: any) {
      console.error("Error updating promotion:", err);
      throw new InternalServerErrorException("Failed to update promotion");
    }
  }
}
