import { status } from "@/interfaces";
import { PromotionProductCreationProps } from "@/model/promotion-product.model";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsString,
  MinLength,
} from "class-validator";

export class UpdatePromotionDto {
  @ApiProperty({
    description: "The name of the promotion",
    example: "Summer Sale",
    required: true,
  })
  @IsString({ message: "Name must be a string" })
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  name: string;

  @ApiProperty({
    description: "The status of the promotion (active or inactive)",
    enum: ["active", "inactive"],
    example: "active",
    required: true,
  })
  @IsEnum(["active", "inactive"], {
    message: "Status must be either active or inactive",
  })
  status: status;

  @ApiProperty({
    description: "The start date of the promotion (ISO 8601 format)",
    example: "2025-08-21T10:00:00Z",
    required: true,
  })
  @IsString()
  @IsISO8601()
  startDate: Date;

  @ApiProperty({
    description: "The end date of the promotion (ISO 8601 format)",
    example: "2025-08-31T23:59:59Z",
    required: true,
  })
  @IsString()
  @IsISO8601()
  endDate: Date;

  // @ApiProperty({
  //   description: "The promotion products associated with the promotion",
  //   example: [
  //     {
  //       productId: 1,
  //       promotionId: 1,
  //       agentId: 1,
  //       minimumQuantity: 1,
  //       maximumQuantity: 1,
  //       operationType: "fixed",
  //       value: 1,
  //     },
  //   ],
  //   required: true,
  // })
  // @IsArray()
  // promotionProducts: PromotionProductCreationProps[];
}
