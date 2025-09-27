import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsPositive, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class PricingItemDto {
  @ApiProperty({ description: "ID of the product", example: 1 })
  @IsNumber()
  @IsPositive()
  productId: number;

  @ApiProperty({ description: "ID of the agent group", example: 1 })
  @IsNumber()
  @IsPositive()
  agentGroupId: number;

  @ApiProperty({
    description: "Custom price for the product-agent group pair",
    example: 90.0,
  })
  @IsNumber()
  @IsPositive()
  price: number;
}

export class CreatePricingDto {
  @ApiProperty({
    description: "Array of pricing entries to create",
    type: [PricingItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PricingItemDto)
  pricings: PricingItemDto[];
}
