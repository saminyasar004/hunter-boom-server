import { Controller, Get, Post, Body, Put, Param } from "@nestjs/common";
import { PricingService } from "./pricing.service";
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreatePricingDto } from "./dto/create-pricing.dto";
import { PricingResponseDto } from "./dto/pricing-response.dto";
import { UpdatePricingDto } from "./dto/update-pricing.dto";

class CreatePricingResponseDto {
  @ApiProperty({
    description: "Status message",
    example: "Pricing created successfully",
  })
  message: string;

  @ApiProperty({
    description: "Array of created pricing entries",
    type: [Object],
    example: [
      { productId: 1, agentGroupId: 1, price: 90.0 },
      { productId: 1, agentGroupId: 2, price: 84.0 },
    ],
  })
  createdPricings: Array<{
    productId: number;
    agentGroupId: number;
    price: number;
  }>;
}

@ApiTags("Pricing")
@Controller("pricing")
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get()
  @ApiOperation({
    summary: "Get pricing data for all products and agent groups",
  })
  @ApiResponse({
    status: 200,
    description: "Pricing data retrieved successfully",
    type: PricingResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  async getPricingData() {
    return this.pricingService.getAllPricing();
  }

  @Post()
  @ApiOperation({
    summary: "Create new pricing entries for product-agent group pairs",
  })
  @ApiResponse({
    status: 201,
    description: "Pricing created successfully",
    type: CreatePricingResponseDto,
  })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  @ApiResponse({ status: 404, description: "Product or agent group not found" })
  @ApiResponse({ status: 409, description: "Pricing entries already exist" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async createPricing(@Body() createPricingDto: CreatePricingDto) {
    return this.pricingService.createPricing(createPricingDto);
  }

  @Put("/update")
  @ApiOperation({
    summary: "Update pricing entries for a single product",
  })
  @ApiResponse({
    status: 200,
    description: "Pricing updated successfully",
    type: PricingResponseDto,
  })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  @ApiResponse({ status: 404, description: "Product not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async updatePricing(@Body() updatePricingDto: UpdatePricingDto) {
    return this.pricingService.updatePricing(updatePricingDto);
  }
}
