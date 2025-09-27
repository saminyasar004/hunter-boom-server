import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PricingController } from "./pricing.controller";
import { PricingService } from "./pricing.service";
import Product from "@/model/product.model";
import AgentGroup from "@/model/agent-group.model";
import ProductAgentPricing from "@/model/product-agent-pricing.model";
import { UpdatePricingDto } from "./dto/update-pricing.dto";
import { CreatePricingDto } from "./dto/create-pricing.dto";

@Module({
  imports: [
    SequelizeModule.forFeature([Product, AgentGroup, ProductAgentPricing]),
  ],
  controllers: [PricingController],
  providers: [PricingService],
  exports: [PricingService],
})
export class PricingModule {}
