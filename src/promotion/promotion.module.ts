import Promotion from "@/model/promotion.model";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PromotionController } from "./promotion.controller";
import { PromotionService } from "./promotion.service";

@Module({
  imports: [SequelizeModule.forFeature([Promotion])],
  controllers: [PromotionController],
  providers: [PromotionService],
})
export class PromotionModule {}
