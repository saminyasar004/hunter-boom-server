import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import PromotionAgentGroup, {
  PromotionAgentGroupCreationProps,
} from "@/model/promotion-agent-group.model";
import { CreatePromotionAgentGroupDto } from "./dto/create-promotion-agent-group.dto";

/**
 * Service for managing promotion-agent group associations in the database.
 */
@Injectable()
export class PromotionAgentGroupService {
  constructor(
    @InjectModel(PromotionAgentGroup)
    private readonly promotionAgentGroupModel: typeof PromotionAgentGroup,
  ) {}

  /**
   * Creates a new association between a promotion and an agent group.
   * @param createPromotionAgentGroupDto - The data transfer object containing promotion and agent group IDs.
   * @returns The created association as a plain object, or null if creation fails.
   * @throws InternalServerErrorException if an error occurs during creation.
   */
  async createPromotionAgentGroup(
    createPromotionAgentGroupDto: CreatePromotionAgentGroupDto,
  ): Promise<PromotionAgentGroupCreationProps | null> {
    try {
      const createdPromotionAgentGroup =
        await this.promotionAgentGroupModel.create(
          createPromotionAgentGroupDto,
        );
      return createdPromotionAgentGroup
        ? createdPromotionAgentGroup.toJSON()
        : null;
    } catch (err: any) {
      console.error("Error creating promotion-agent group association:", err);
      throw new InternalServerErrorException(
        "Failed to create promotion-agent group association",
      );
    }
  }
}
