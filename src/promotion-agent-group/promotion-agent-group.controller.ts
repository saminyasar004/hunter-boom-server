import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  InternalServerErrorException,
} from "@nestjs/common";
import { PromotionAgentGroupService } from "./promotion-agent-group.service";
import { CreatePromotionAgentGroupDto } from "./dto/create-promotion-agent-group.dto";
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from "@nestjs/swagger";

/**
 * Controller for managing promotion-agent group associations.
 */
@ApiTags("promotion-agent-groups")
@Controller("api/promotion-agent-group")
export class PromotionAgentGroupController {
  constructor(
    private readonly promotionAgentGroupService: PromotionAgentGroupService,
  ) {}

  @Post("create")
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiOperation({ summary: "Create a new promotion-agent group association" })
  @ApiBody({ type: CreatePromotionAgentGroupDto })
  @ApiResponse({
    status: 201,
    description: "Promotion-agent group association created successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 201 },
        message: {
          type: "string",
          example: "Promotion-agent group association created successfully",
        },
        data: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            promotionId: { type: "number", example: 1 },
            agentGroupId: { type: "number", example: 1 },
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
  async createPromotionAgentGroup(
    @Body() createPromotionAgentGroupDto: CreatePromotionAgentGroupDto,
  ) {
    try {
      const promotionAgentGroup =
        await this.promotionAgentGroupService.createPromotionAgentGroup(
          createPromotionAgentGroupDto,
        );

      if (!promotionAgentGroup) {
        return {
          status: 500,
          message: "Internal server error",
        };
      }

      return {
        status: 201,
        message: "Promotion-agent group association created successfully",
        data: promotionAgentGroup,
      };
    } catch (err: any) {
      console.error("Error creating promotion-agent group:", err);
      throw new InternalServerErrorException(
        "Failed to create promotion-agent group association",
      );
    }
  }
}
