import "colors";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { port } from "./config/dotenv.config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { initializeDatabase } from "./config/db.config";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationError } from "class-validator";
import { ValidationPipe, BadRequestException } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS for all origins
  app.enableCors({
    origin: "*", // Allow all origins (for development/LAN)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Allowed methods
    credentials: true, // Allow cookies/auth headers (if needed)
  });

  // Serve static files
  app.useStaticAssets(join(__dirname, "..", "uploads"), {
    prefix: "/uploads/",
  });

  // Swagger configuration
  // const config = new DocumentBuilder()
  //   .setTitle("AI Capitol API")
  //   .setDescription("API for AI Capitol project")
  //   .setVersion("1.0")
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup("api/docs", app, document); // Serve Swagger UI at /api

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => ({
          field: error.property,
          errors: Object.values(error.constraints || {}),
        }));
        return new BadRequestException({
          statusCode: 400,
          message: "Validation failed",
          errors: messages,
        });
      },
    }),
  );

  await app.listen(port ?? 3000, () => {
    console.log(`Server is running on port ${port}`.green);
    initializeDatabase();
  });
}
bootstrap();
