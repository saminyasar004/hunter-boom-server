import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  InternalServerErrorException,
  Get,
  Put,
  NotFoundException,
  Param,
  Delete,
} from "@nestjs/common";
import { PromotionService } from "./promotion.service";
import { CreatePromotionDto } from "./dto/create-promotion.dto";
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from "@nestjs/swagger";
import { PromotionCreationProps } from "@/model/promotion.model";
import { ResponseProps } from "@/interfaces";

/**
 * Controller for managing promotion-related API endpoints.
 */
@ApiTags("promotions")
@Controller("api/promotion")
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get()
  @ApiOperation({ summary: "Get all promotions" })
  @ApiResponse({
    status: 200,
    description: "Promotions retrieved successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 200 },
        message: {
          type: "string",
          example: "Promotions retrieved successfully",
        },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number", example: 1 },
              name: { type: "string", example: "Summer Sale" },
              status: {
                type: "string",
                enum: ["active", "inactive"],
                example: "active",
              },
              startDate: {
                type: "string",
                format: "date-time",
                example: "2025-08-21T10:00:00Z",
              },
              endDate: {
                type: "string",
                format: "date-time",
                example: "2025-08-31T23:59:59Z",
              },
              promotionProducts: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    productId: { type: "number", example: 1 },
                    promotionId: { type: "number", example: 1 },
                    agentGroupId: { type: "number", example: 1 },
                    minimumQuantity: { type: "number", example: 1 },
                    maximumQuantity: { type: "number", example: 1 },
                    operationType: {
                      type: "string",
                      enum: ["fixed", "percentage"],
                      example: "fixed",
                    },
                    value: { type: "number", example: 1 },
                  },
                },
              },
              createdAt: {
                type: "string",
                format: "date-time",
                example: "2025-08-21T07:35:00Z",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                example: "2025-08-21T07:35:00Z",
              },
            },
          },
        },
      },
    },
  })
  async getPromotions() {
    try {
      const promotions = await this.promotionService.getPromotions();

      if (!promotions) {
        return {
          status: 500,
          message: "Internal server error",
        };
      }

      return {
        status: 200,
        message: "Promotions retrieved successfully",
        data: promotions,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }

  @Post("create")
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiOperation({ summary: "Create a new promotion" })
  @ApiBody({ type: CreatePromotionDto })
  @ApiResponse({
    status: 201,
    description: "Promotion created successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 201 },
        message: { type: "string", example: "Promotion created successfully" },
        data: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            name: { type: "string", example: "Summer Sale" },
            status: {
              type: "string",
              enum: ["active", "inactive"],
              example: "active",
            },
            startDate: {
              type: "string",
              format: "date-time",
              example: "2025-08-21T10:00:00Z",
            },
            endDate: {
              type: "string",
              format: "date-time",
              example: "2025-08-31T23:59:59Z",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-08-21T07:35:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-08-21T07:35:00Z",
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 400 },
        message: { type: "string", example: "Invalid input data" },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 500 },
        message: { type: "string", example: "Internal server error" },
      },
    },
  })
  async createPromotion(@Body() createPromotionDto: CreatePromotionDto) {
    try {
      const promotion =
        await this.promotionService.createPromotion(createPromotionDto);

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
      console.error("Error creating promotion:", err);
      throw new InternalServerErrorException("Failed to create promotion");
    }
  }

  @Put(":id")
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiOperation({ summary: "Update an existing promotion" })
  @ApiBody({ type: CreatePromotionDto })
  @ApiResponse({
    status: 200,
    description: "Promotion updated successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 200 },
        message: { type: "string", example: "Promotion updated successfully" },
        data: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            name: { type: "string", example: "Summer Sale" },
            status: {
              type: "string",
              enum: ["active", "inactive"],
              example: "active",
            },
            startDate: {
              type: "string",
              format: "date-time",
              example: "2025-08-21T10:00:00Z",
            },
            endDate: {
              type: "string",
              format: "date-time",
              example: "2025-08-31T23:59:59Z",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-08-21T07:35:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-08-21T07:35:00Z",
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 400 },
        message: { type: "string", example: "Invalid input data" },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Promotion not found",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 404 },
        message: { type: "string", example: "Promotion not found" },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 500 },
        message: { type: "string", example: "Internal server error" },
      },
    },
  })
  async updatePromotion(
    @Param("id") id: number,
    @Body() updatePromotionDto: CreatePromotionDto,
  ): Promise<PromotionCreationProps> {
    try {
      const promotion = await this.promotionService.updatePromotion(
        id,
        updatePromotionDto,
      );
      if (!promotion) {
        throw new NotFoundException("Promotion not found");
      }
      return promotion;
    } catch (err: any) {
      console.error("Error updating promotion:", err);
      throw new InternalServerErrorException("Failed to update promotion");
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an existing promotion" })
  @ApiResponse({
    status: 200,
    description: "Promotion deleted successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 200 },
        message: { type: "string", example: "Promotion deleted successfully" },
        data: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            name: { type: "string", example: "Summer Sale" },
            status: {
              type: "string",
              enum: ["active", "inactive"],
              example: "active",
            },
            startDate: {
              type: "string",
              format: "date-time",
              example: "2025-08-21T10:00:00Z",
            },
            endDate: {
              type: "string",
              format: "date-time",
              example: "2025-08-31T23:59:59Z",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-08-21T07:35:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-08-21T07:35:00Z",
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Promotion not found",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 404 },
        message: { type: "string", example: "Promotion not found" },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 500 },
        message: { type: "string", example: "Internal server error" },
      },
    },
  })
  async deletePromotion(@Param("id") id: number): Promise<ResponseProps> {
    try {
      const isDeleted = await this.promotionService.deletePromotion(id);
      if (!isDeleted) {
        throw new NotFoundException("Promotion not found");
      }
      return {
        status: 200,
        message: "Promotion deleted successfully",
      };
    } catch (err: any) {
      console.error("Error deleting promotion:", err);
      throw new InternalServerErrorException("Failed to delete promotion");
    }
  }
}
