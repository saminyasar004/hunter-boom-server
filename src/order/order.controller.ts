import Order from "@/model/order.model";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderService } from "./order.service";

@ApiTags("orders")
@Controller("api/order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: "Get all orders" })
  @ApiResponse({
    status: 200,
    description: "Orders retrieved successfully",
    schema: {
      type: "object",
      properties: {
        status: { type: "number", example: 200 },
        message: {
          type: "string",
          example: "Orders retrieved successfully",
        },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              orderId: { type: "number", example: 1 },
              orderNumber: { type: "string", example: "ORD001" },
              agentId: { type: "string", example: "AGT001", nullable: true },
              partnerId: { type: "string", example: "PART001", nullable: true },
              promotionId: { type: "number", example: 1, nullable: true },
              soNumber: { type: "string", example: "SO001", nullable: true },
              date: {
                type: "string",
                format: "date-time",
                example: "2025-08-22T15:00:00Z",
                nullable: true,
              },
              address: { type: "string", example: "123 Main St" },
              status: { type: "string", example: "pending" },
              remark: {
                type: "string",
                example: "Urgent delivery requested",
                nullable: true,
              },
              subTotal: { type: "number", example: 1999.98, nullable: true },
              tax: { type: "number", example: 159.99, nullable: true },
              total: { type: "number", example: 2159.97 },
              courier: { type: "string", example: "FedEx", nullable: true },
              shippingPrice: { type: "number", example: 20.0 },
              returnReason: {
                type: "string",
                example: "Defective product",
                nullable: true,
              },
              returnRemark: {
                type: "string",
                example: "Product damaged during shipping",
                nullable: true,
              },
              shippingInvoice: {
                type: "string",
                example: "INV12345",
                nullable: true,
              },
              approveDate: {
                type: "string",
                format: "date-time",
                example: "2025-08-23T10:00:00Z",
                nullable: true,
              },
              shippedDate: {
                type: "string",
                format: "date-time",
                example: "2025-08-24T12:00:00Z",
                nullable: true,
              },
              cancelledDate: {
                type: "string",
                format: "date-time",
                example: "2025-08-25T15:00:00Z",
                nullable: true,
              },
              cancelledReason: {
                type: "string",
                example: "Customer request",
                nullable: true,
              },
              completedDate: {
                type: "string",
                format: "date-time",
                example: "2025-08-26T18:00:00Z",
                nullable: true,
              },
              returnDate: {
                type: "string",
                format: "date-time",
                example: "2025-08-27T09:00:00Z",
                nullable: true,
              },
              autocountStatus: {
                type: "string",
                example: "synced",
                nullable: true,
              },
              autocountAccountId: {
                type: "string",
                example: "ACC001",
                nullable: true,
              },
              isDeleted: { type: "number", example: 0 },
              printDatetime: {
                type: "string",
                format: "date-time",
                example: "2025-08-22T16:00:00Z",
                nullable: true,
              },
              creditTerm: { type: "string", example: "30 days" },
              creditLimit: { type: "string", example: "1000.00" },
              items: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    orderItemId: { type: "number", example: 1 },
                    orderId: { type: "number", example: 1 },
                    productId: { type: "number", example: 1 },
                    productCode: { type: "string", example: "PROD001" },
                    productDescription: {
                      type: "string",
                      example: "Laptop Pro X - 16GB RAM, 512GB SSD",
                      nullable: true,
                    },
                    productQty: { type: "number", example: 2, nullable: true },
                    productUom: {
                      type: "string",
                      enum: ["pc", "kg", "box"],
                      example: "pc",
                    },
                    productUnitPrice: { type: "number", example: 999.99 },
                    productTotal: { type: "number", example: 1999.98 },
                    isDeleted: { type: "number", example: 0 },
                    isReturn: { type: "number", example: 0 },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      example: "2025-08-22T15:00:00Z",
                    },
                    updatedAt: {
                      type: "string",
                      format: "date-time",
                      example: "2025-08-22T15:00:00Z",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async getAllOrders() {
    try {
      const orders = await this.orderService.getAllOrders();

      if (!orders) {
        return {
          status: 500,
          message: "Internal server error",
        };
      }

      return {
        status: 200,
        message: "Orders retrieved successfully",
        data: orders,
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
  @ApiOperation({ summary: "Create a new order with associated order items" })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({
    status: 201,
    description: "Order created successfully",
    type: Order, // Reference the Order model for schema
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data",
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", example: 400 },
        message: {
          type: "string",
          example: "Invalid input data",
        },
        error: { type: "string", example: "Bad Request" },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", example: 500 },
        message: { type: "string", example: "Internal server error" },
      },
    },
  })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      // Validate that items array is not empty
      if (!createOrderDto.items || createOrderDto.items.length === 0) {
        throw new BadRequestException("Items array cannot be empty");
      }

      const createdOrder = await this.orderService.createOrder(createOrderDto);

      return {
        status: 201,
        message: "Order created successfully",
        data: createdOrder,
      };
    } catch (err) {
      console.log(err);
      if (err instanceof BadRequestException) {
        throw err;
      }
      return {
        status: err.status || 500,
        message: err.message || "Internal server error",
      };
    }
  }

  @Get("/:id")
  @ApiOperation({ summary: "Get order by ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Object,
    description: "Order retrieved successfully",
    schema: {
      type: "object",
      properties: {
        orderId: { type: "number", example: 1 },
        orderNumber: { type: "string", example: "ORD001" },
        agentId: { type: "string", example: "AGT001", nullable: true },
        partnerId: { type: "string", example: "PART001", nullable: true },
        promotionId: { type: "number", example: 1, nullable: true },
        soNumber: { type: "string", example: "SO001", nullable: true },
        date: {
          type: "string",
          format: "date-time",
          example: "2025-08-22T15:00:00Z",
          nullable: true,
        },
        address: { type: "string", example: "123 Main St" },
        status: { type: "string", example: "pending" },
        remark: {
          type: "string",
          example: "Urgent delivery requested",
          nullable: true,
        },
        subTotal: { type: "number", example: 1999.98, nullable: true },
        tax: { type: "number", example: 159.99, nullable: true },
        total: { type: "number", example: 2159.97 },
        courier: { type: "string", example: "FedEx", nullable: true },
        shippingPrice: { type: "number", example: 20.0 },
        returnReason: {
          type: "string",
          example: "Defective product",
          nullable: true,
        },
        returnRemark: {
          type: "string",
          example: "Product damaged during shipping",
          nullable: true,
        },
        shippingInvoice: {
          type: "string",
          example: "INV12345",
          nullable: true,
        },
        approveDate: {
          type: "string",
          format: "date-time",
          example: "2025-08-23T10:00:00Z",
          nullable: true,
        },
        shippedDate: {
          type: "string",
          format: "date-time",
          example: "2025-08-24T12:00:00Z",
          nullable: true,
        },
        cancelledDate: {
          type: "string",
          format: "date-time",
          example: "2025-08-25T15:00:00Z",
          nullable: true,
        },
        cancelledReason: {
          type: "string",
          example: "Customer request",
          nullable: true,
        },
        completedDate: {
          type: "string",
          format: "date-time",
          example: "2025-08-26T18:00:00Z",
          nullable: true,
        },
        returnDate: {
          type: "string",
          format: "date-time",
          example: "2025-08-27T09:00:00Z",
          nullable: true,
        },
        autocountStatus: {
          type: "string",
          example: "synced",
          nullable: true,
        },
        autocountAccountId: {
          type: "string",
          example: "ACC001",
          nullable: true,
        },
        isDeleted: { type: "number", example: 0 },
        printDatetime: {
          type: "string",
          format: "date-time",
          example: "2025-08-22T16:00:00Z",
          nullable: true,
        },
        creditTerm: { type: "string", example: "30 days" },
        creditLimit: { type: "string", example: "1000.00" },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              orderItemId: { type: "number", example: 1 },
              orderId: { type: "number", example: 1 },
              productId: { type: "number", example: 1 },
              productCode: { type: "string", example: "PROD001" },
              productDescription: {
                type: "string",
                example: "Laptop Pro X - 16GB RAM, 512GB SSD",
                nullable: true,
              },
              productQty: { type: "number", example: 2, nullable: true },
              productUom: {
                type: "string",
                enum: ["pc", "kg", "box"],
                example: "pc",
              },
              productUnitPrice: { type: "number", example: 999.99 },
              productTotal: { type: "number", example: 1999.98 },
              isDeleted: { type: "number", example: 0 },
              isReturn: { type: "number", example: 0 },
              createdAt: {
                type: "string",
                format: "date-time",
                example: "2025-08-22T15:00:00Z",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                example: "2025-08-22T15:00:00Z",
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Order not found",
  })
  async getOrderById(@Param("id") id: number) {
    try {
      const order = await this.orderService.getOrderById(id);
      if (!order) {
        return {
          status: 404,
          message: "Order not found",
        };
      }
      return {
        status: 200,
        message: "Order retrieved successfully",
        data: order,
      };
    } catch (err) {
      console.log(err);
      return {
        status: err.status || 500,
        message: err.message || "Internal server error",
      };
    }
  }

  @Put(":id")
  @ApiOperation({ summary: "Update an order" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Object,
    description: "Order updated successfully",
    schema: {
      type: "object",
      properties: {
        orderId: { type: "number", example: 1 },
        orderNumber: { type: "string", example: "ORD001" },
        agentId: { type: "string", example: "AGT001", nullable: true },
        partnerId: { type: "string", example: "PART001", nullable: true },
        promotionId: { type: "number", example: 1, nullable: true },
        soNumber: { type: "string", example: "SO001", nullable: true },
        date: {
          type: "string",
          format: "date-time",
          example: "2025-08-22T15:00:00Z",
          nullable: true,
        },
        address: { type: "string", example: "123 Main St" },
        status: { type: "string", example: "pending" },
        remark: {
          type: "string",
          example: "Urgent delivery requested",
          nullable: true,
        },
        subTotal: { type: "number", example: 1999.98, nullable: true },
        tax: { type: "number", example: 159.99, nullable: true },
        total: { type: "number", example: 2159.97 },
        courier: { type: "string", example: "FedEx", nullable: true },
        shippingPrice: { type: "number", example: 20.0 },
        returnReason: {
          type: "string",
          example: "Defective product",
          nullable: true,
        },
        returnRemark: {
          type: "string",
          example: "Product damaged during shipping",
          nullable: true,
        },
        shippingInvoice: {
          type: "string",
          example: "INV12345",
          nullable: true,
        },
        approveDate: {
          type: "string",
          format: "date-time",
          example: "2025-08-23T10:00:00Z",
          nullable: true,
        },
        shippedDate: {
          type: "string",
          format: "date-time",
          example: "2025-08-24T12:00:00Z",
          nullable: true,
        },
        cancelledDate: {
          type: "string",
          format: "date-time",
          example: "2025-08-25T15:00:00Z",
          nullable: true,
        },
        cancelledReason: {
          type: "string",
          example: "Customer request",
          nullable: true,
        },
        completedDate: {
          type: "string",
          format: "date-time",
          example: "2025-08-26T18:00:00Z",
          nullable: true,
        },
        returnDate: {
          type: "string",
          format: "date-time",
          example: "2025-08-27T09:00:00Z",
          nullable: true,
        },
        autocountStatus: {
          type: "string",
          example: "synced",
          nullable: true,
        },
        autocountAccountId: {
          type: "string",
          example: "ACC001",
          nullable: true,
        },
        isDeleted: { type: "number", example: 0 },
        printDatetime: {
          type: "string",
          format: "date-time",
          example: "2025-08-22T16:00:00Z",
          nullable: true,
        },
        creditTerm: { type: "string", example: "30 days" },
        creditLimit: { type: "string", example: "1000.00" },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              orderItemId: { type: "number", example: 1 },
              orderId: { type: "number", example: 1 },
              productId: { type: "number", example: 1 },
              productCode: { type: "string", example: "PROD001" },
              productDescription: {
                type: "string",
                example: "Laptop Pro X - 16GB RAM, 512GB SSD",
                nullable: true,
              },
              productQty: { type: "number", example: 2, nullable: true },
              productUom: {
                type: "string",
                enum: ["pc", "kg", "box"],
                example: "pc",
              },
              productUnitPrice: { type: "number", example: 999.99 },
              productTotal: { type: "number", example: 1999.98 },
              isDeleted: { type: "number", example: 0 },
              isReturn: { type: "number", example: 0 },
              createdAt: {
                type: "string",
                format: "date-time",
                example: "2025-08-22T15:00:00Z",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                example: "2025-08-22T15:00:00Z",
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Order not found",
  })
  async editOrder(
    @Param("id") id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const order = await this.orderService.editOrder(id, updateOrderDto);
      if (!order) {
        return {
          status: 404,
          message: "Order not found",
        };
      }
      return {
        status: 200,
        message: "Order updated successfully",
        data: order,
      };
    } catch (err) {
      console.log(err);
      if (err instanceof BadRequestException) {
        throw err;
      }
      return {
        status: err.status || 500,
        message: err.message || "Internal server error",
      };
    }
  }
}
