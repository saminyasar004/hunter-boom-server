import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from "@nestjs/common";
import { PromotionService } from "./promotion.service";
import { CreatePromotionDto } from "./dto/create-promotion.dto";

@Controller("api/promotion")
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post("create")
  async createPromotion(@Body() CreatePromotionDto: CreatePromotionDto) {
    try {
      const promotion =
        await this.promotionService.createPromotion(CreatePromotionDto);

      if (!promotion) {
        return {
          status: 500,
          message: "Internal server error",
        };
      }

      return {
        status: 201,
        message: "Promotion created successfully",
        data: promotion,
      };
    } catch (err: any) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
