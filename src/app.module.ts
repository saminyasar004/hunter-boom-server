import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { dbConnectionString } from "./config/dotenv.config";
import { AuthModule } from "./auth/auth.module";

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
