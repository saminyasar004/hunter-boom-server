import { Controller, Get } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("products")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({
    status: 200,
    description: "Products retrieved successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 200 },
        message: {
          type: "string",
          example: "Products retrieved successfully",
        },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number", example: 1 },
              name: { type: "string", example: "Laptop Pro X" },
              code: { type: "string", example: "PROD001" },
              productCategoryId: {
                type: "number",
                example: 1,
              },
              status: {
                type: "string",
                enum: ["active", "inactive"],
                example: "active",
              },
              stockQty: {
                type: "number",
                example: 50,
              },
              basePrice: {
                type: "number",
                example: 999.99,
              },
              uom: {
                type: "string",
                example: "unit",
              },
              image1: {
                type: "string",
                example: "laptop-pro-x-1.jpg",
              },
              image2: {
                type: "string",
                example: "laptop-pro-x-2.jpg",
              },
              lastAutocountSync: {
                type: "string",
                format: "date-time",
                example: "2025-08-22T15:00:00Z",
              },
              isDeleted: {
                type: "number",
                example: 0,
              },
              createdAt: {
                type: "string",
                format: "date-time",
                example: "2025-08-22T07:35:00Z",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                example: "2025-08-22T07:35:00Z",
              },
            },
          },
        },
      },
    },
  })
  async getProducts() {
    try {
      const products = await this.productService.getProducts();

      if (!products) {
        return {
          status: 500,
          message: "Internal server error",
        };
      }

      return {
        status: 200,
        message: "Products retrieved successfully",
        data: products,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
}
