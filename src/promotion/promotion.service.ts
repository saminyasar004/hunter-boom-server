import Promotion, { PromotionCreationProps } from "@/model/promotion.model";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePromotionDto } from "./dto/create-promotion.dto";

@Injectable()
export class PromotionService {
  constructor(
    @InjectModel(Promotion)
    private readonly promotionModel: typeof Promotion,
  ) {}

  async createPromotion(
    createPromotionDto: CreatePromotionDto,
  ): Promise<Promotion | PromotionCreationProps | null> {
    try {
      const promotion = await this.promotionModel.create(createPromotionDto);

      if (promotion) {
        return promotion.toJSON();
      }

      return null;
    } catch (err: any) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
