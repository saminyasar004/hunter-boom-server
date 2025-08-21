import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { dbConnectionString } from "./config/dotenv.config";
import { AuthModule } from "./auth/auth.module";
import { AgentModule } from './agent/agent.module';
import { AgentGroupModule } from './agent-group/agent-group.module';
import { PromotionModule } from './promotion/promotion.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
