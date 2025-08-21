import { Module } from "@nestjs/common";
import { PromotionAgentGroupService } from "./promotion-agent-group.service";
import { PromotionAgentGroupController } from "./promotion-agent-group.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import PromotionAgentGroup from "@/model/promotion-agent-group.model";

@Module({
  imports: [SequelizeModule.forFeature([PromotionAgentGroup])],
  controllers: [PromotionAgentGroupController],
  providers: [PromotionAgentGroupService],
})
export class PromotionAgentGroupModule {}
