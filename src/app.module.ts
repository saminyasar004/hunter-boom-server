import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
// import { dbConnectionString } from "./config/dotenv.config";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      uri: "mysql://root:12345678@localhost:3306/hunter_boom",
      models: [__dirname + "/**/*.model{.ts,.js}"],
      autoLoadModels: true,
      synchronize: false, // Set to false in production
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false, // Required for Supabase
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
