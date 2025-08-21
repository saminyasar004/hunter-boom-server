import { IsEnum, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Data transfer object for creating a promotion-agent group association.
 */
export class CreatePromotionAgentGroupDto {
  @ApiProperty({
    description: "The ID of the product associated with the promotion",
    example: 1,
    required: true,
  })
  @IsNumber({}, { message: "Product ID must be a number" })
  productId: number;

  @ApiProperty({
    description: "The ID of the promotion to associate",
    example: 1,
    required: true,
  })
  @IsNumber({}, { message: "Promotion ID must be a number" })
  promotionId: number;

  @ApiProperty({
    description: "The ID of the agent group to associate",
    example: 1,
    required: true,
  })
  @IsNumber({}, { message: "Agent group ID must be a number" })
  agentGroupId: number;

  @ApiProperty({
    description: "The minimum quantity required for the promotion",
    example: 10,
    required: true,
  })
  @IsNumber({}, { message: "Minimum quantity must be a number" })
  minQty: number;

  @ApiProperty({
    description: "The maximum quantity allowed for the promotion",
    example: 100,
    required: true,
  })
  @IsNumber({}, { message: "Maximum quantity must be a number" })
  maxQty: number;

  @ApiProperty({
    description: "The type of discount operation (fixed amount or percentage)",
    enum: ["fixed", "percentage"],
    example: "fixed",
    required: true,
  })
  @IsEnum(["fixed", "percentage"], {
    message: "Operation must be either fixed or percentage",
  })
  operation: "fixed" | "percentage";

  @ApiProperty({
    description: "The value of the discount (e.g., fixed amount or percentage)",
    example: 20,
    required: true,
  })
  @IsNumber({}, { message: "Value must be a number" })
  value: number;

  @ApiProperty({
    description:
      "Indicates if the association is soft-deleted (0 for not deleted, 1 for deleted)",
    example: 0,
    required: true,
  })
  @IsNumber({}, { message: "isDeleted must be a number (0 or 1)" })
  isDeleted: number;
}
