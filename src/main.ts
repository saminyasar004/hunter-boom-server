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
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
  });

  // Trust proxy (ngrok acts as one)
  app.enable("trust proxy", true); // Or app.set('trust proxy', true) if using Express directly

  // Force HTTPS scheme for requests from ngrok (prevents HTTP redirects)
  app.use((req, res, next) => {
    if (req.get("host")?.includes("ngrok")) {
      // Or check req.hostname
      req = req as any; // TypeScript workaround if needed
      req.secure = true; // Treat as secure
      (req as any).protocol = "https"; // Force protocol
    }
    next();
  });

  // Enable CORS for all origins
  app.enableCors({
    // originorigin: ["https://localhost:5173/", "https://*.ngrok-free.app"],: "*", // Allow all origins (for development/LAN)
    // origin: ["https://localhost:5173/", "https://*.ngrok-free.app"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Allowed methods
    credentials: true, // Allow cookies/auth headers (if needed)
  });

  // Serve static files
  app.useStaticAssets(join(__dirname, "..", "uploads"), {
    prefix: "/",
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("Hunter Boom")
    .setDescription("API for Hunter Boom project")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document); // Serve Swagger UI at /api

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

  await app.listen(port ?? 3000, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`.green);
    initializeDatabase();
  });
}
bootstrap();
