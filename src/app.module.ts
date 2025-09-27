import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AgentGroupModule } from "./agent-group/agent-group.module";
import { AgentModule } from "./agent/agent.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { dbConnectionString } from "./config/dotenv.config";
import { ProductModule } from "./product/product.module";
import { PromotionAgentGroupModule } from "./promotion-agent-group/promotion-agent-group.module";
import { PromotionModule } from "./promotion/promotion.module";
import { OrderModule } from "./order/order.module";
import { Sequelize } from "sequelize-typescript";
import { PricingModule } from './pricing/pricing.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      uri: dbConnectionString,
      models: [__dirname + "/**/*.model{.ts,.js}"],
      autoLoadModels: true,
      synchronize: false, // Set to false in production
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false, // Required for Supabase
        },
      },
    }),
    AuthModule,
    AgentModule,
    AgentGroupModule,
    PromotionModule,
    PromotionAgentGroupModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [SequelizeModule],
})
export class AppModule {}
