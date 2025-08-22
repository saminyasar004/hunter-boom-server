import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  IsEnum,
  IsArray,
  ValidateNested,
  MinLength,
  Matches,
  IsInt,
  IsISO8601,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export enum uom {
  PC = "pc",
  KG = "kg",
  BOX = "box",
}

export class CreateOrderItemDto {
  @ApiProperty({
    description: "The ID of the product for this order item",
    example: 1,
    required: true,
  })
  @IsInt({ message: "Product ID must be an integer" })
  productId: number;

  @ApiProperty({
    description: "The code of the product",
    example: "PROD001",
    required: true,
  })
  @IsString({ message: "Product code must be a string" })
  @MinLength(3, { message: "Product code must be at least 3 characters long" })
  productCode: string;

  @ApiProperty({
    description: "Description of the product (optional)",
    example: "Laptop Pro X - 16GB RAM, 512GB SSD",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Product description must be a string" })
  productDescription?: string;

  @ApiProperty({
    description: "Quantity of the product (optional)",
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: "Product quantity must be a number" })
  productQty?: number;

  @ApiProperty({
    description: "Unit of measure for the product",
    enum: uom,
    example: uom.PC,
    required: true,
  })
  @IsEnum(uom, { message: "Product UOM must be one of: pc, kg, box" })
  productUom: uom;

  @ApiProperty({
    description: "Unit price of the product",
    example: 999.99,
    required: true,
  })
  @IsNumber({}, { message: "Product unit price must be a number" })
  productUnitPrice: number;

  @ApiProperty({
    description: "Total price for this order item (quantity * unit price)",
    example: 1999.98,
    required: true,
  })
  @IsNumber({}, { message: "Product total must be a number" })
  productTotal: number;

  @ApiProperty({
    description:
      "Indicates if the order item is soft-deleted (0 for not deleted, 1 for deleted)",
    example: 0,
    required: true,
  })
  @IsInt({ message: "isDeleted must be an integer" })
  isDeleted: number;

  @ApiProperty({
    description:
      "Indicates if the order item is marked for return (0 for not returned, 1 for returned)",
    example: 0,
    required: true,
  })
  @IsInt({ message: "isReturn must be an integer" })
  isReturn: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: "Unique order number",
    example: "ORD001",
    required: true,
  })
  @IsString({ message: "Order number must be a string" })
  @MinLength(3, { message: "Order number must be at least 3 characters long" })
  orderNumber: string;

  @ApiProperty({
    description: "ID of the agent placing the order (optional)",
    example: "AGT001",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Agent ID must be a string" })
  agentId?: string;

  @ApiProperty({
    description: "ID of the partner associated with the order (optional)",
    example: "PART001",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Partner ID must be a string" })
  partnerId?: string;

  @ApiProperty({
    description: "ID of the promotion applied to the order (optional)",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: "Promotion ID must be an integer" })
  promotionId?: number;

  @ApiProperty({
    description: "Sales order number (optional)",
    example: "SO001",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "SO number must be a string" })
  soNumber?: string;

  @ApiProperty({
    description: "Date of the order (optional)",
    example: "2025-08-22T15:00:00Z",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsISO8601()
  date?: Date;

  @ApiProperty({
    description: "Street address for delivery",
    example: "123 Main St",
    required: true,
  })
  @IsString({ message: "Address must be a string" })
  @MinLength(5, { message: "Address must be at least 5 characters long" })
  address: string;

  @ApiProperty({
    description: "Postal code for delivery",
    example: "12345",
    required: true,
  })
  @IsString({ message: "Postal code must be a string" })
  @MinLength(3, { message: "Postal code must be at least 3 characters long" })
  addressPostalCode: string;

  @ApiProperty({
    description: "City for delivery",
    example: "New York",
    required: true,
  })
  @IsString({ message: "City must be a string" })
  @MinLength(2, { message: "City must be at least 2 characters long" })
  addressCity: string;

  @ApiProperty({
    description: "State or region for delivery",
    example: "NY",
    required: true,
  })
  @IsString({ message: "State must be a string" })
  @MinLength(2, { message: "State must be at least 2 characters long" })
  addressState: string;

  @ApiProperty({
    description:
      "Status of the order (e.g., pending, approved, shipped, cancelled, completed)",
    example: "pending",
    required: true,
  })
  @IsString({ message: "Status must be a string" })
  @MinLength(3, { message: "Status must be at least 3 characters long" })
  status: string;

  @ApiProperty({
    description: "Additional remarks for the order (optional)",
    example: "Urgent delivery requested",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Remark must be a string" })
  remark?: string;

  @ApiProperty({
    description: "Subtotal of the order before tax (optional)",
    example: 1999.98,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: "Subtotal must be a number" })
  subTotal?: number;

  @ApiProperty({
    description: "Tax amount for the order (optional)",
    example: 159.99,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: "Tax must be a number" })
  tax?: number;

  @ApiProperty({
    description: "Total amount for the order",
    example: 2159.97,
    required: true,
  })
  @IsNumber({}, { message: "Total must be a number" })
  total: number;

  @ApiProperty({
    description: "Courier service used for shipping (optional)",
    example: "FedEx",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Courier must be a string" })
  courier?: string;

  @ApiProperty({
    description: "Shipping cost for the order",
    example: 20.0,
    required: true,
  })
  @IsNumber({}, { message: "Shipping price must be a number" })
  shippingPrice: number;

  @ApiProperty({
    description: "Reason for return (optional)",
    example: "Defective product",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Return reason must be a string" })
  returnReason?: string;

  @ApiProperty({
    description: "Additional remarks for return (optional)",
    example: "Product damaged during shipping",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Return remark must be a string" })
  returnRemark?: string;

  @ApiProperty({
    description: "Shipping invoice number (optional)",
    example: "INV12345",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Shipping invoice must be a string" })
  shippingInvoice?: string;

  @ApiProperty({
    description: "Date the order was approved (optional)",
    example: "2025-08-23T10:00:00Z",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsISO8601()
  approveDate?: Date;

  @ApiProperty({
    description: "Date the order was shipped (optional)",
    example: "2025-08-24T12:00:00Z",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsISO8601()
  shippedDate?: Date;

  @ApiProperty({
    description: "Date the order was cancelled (optional)",
    example: "2025-08-25T15:00:00Z",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsISO8601()
  cancelledDate?: Date;

  @ApiProperty({
    description: "Reason for cancellation (optional)",
    example: "Customer request",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Cancelled reason must be a string" })
  cancelledReason?: string;

  @ApiProperty({
    description: "Date the order was completed (optional)",
    example: "2025-08-26T18:00:00Z",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsISO8601()
  completedDate?: Date;

  @ApiProperty({
    description: "Date the order was returned (optional)",
    example: "2025-08-27T09:00:00Z",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsISO8601()
  returnDate?: Date;

  @ApiProperty({
    description: "Autocount status of the order (optional)",
    example: "synced",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Autocount status must be a string" })
  autocountStatus?: string;

  @ApiProperty({
    description: "Autocount account ID (optional)",
    example: "ACC001",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Autocount account ID must be a string" })
  autocountAccountId?: string;

  @ApiProperty({
    description:
      "Indicates if the order is soft-deleted (0 for not deleted, 1 for deleted)",
    example: 0,
    required: true,
  })
  @IsInt({ message: "isDeleted must be an integer" })
  isDeleted: number;

  @ApiProperty({
    description: "Date and time the order was printed (optional)",
    example: "2025-08-22T16:00:00Z",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsISO8601()
  printDatetime?: Date;

  @ApiProperty({
    description: 'Credit term for the order (e.g., "30 days")',
    example: "30 days",
    required: true,
  })
  @IsString({ message: "Credit term must be a string" })
  @MinLength(3, { message: "Credit term must be at least 3 characters long" })
  creditTerm: string;

  @ApiProperty({
    description:
      "Credit limit for the order (as a string, e.g., currency amount)",
    example: "1000.00",
    required: true,
  })
  @IsString({ message: "Credit limit must be a string" })
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: "Credit limit must be a valid currency amount (e.g., 1000.00)",
  })
  creditLimit: string;

  @ApiProperty({
    description: "Array of order items",
    type: [CreateOrderItemDto],
    required: true,
  })
  @IsArray({ message: "Order items must be an array" })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
