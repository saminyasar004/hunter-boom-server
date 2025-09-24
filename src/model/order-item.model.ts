import { uom } from "@/interfaces";
import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Order, { OrderProps } from "./order.model";

export interface OrderItemProps {
  orderItemId: number;
  orderId: number;
  productId: number;
  productCode: string;
  productDescription?: string;
  productQty?: number;
  productUom: uom;
  productUnitPrice: number;
  productTotal: number;
  isDeleted: number;
  isReturn: number;
  createdAt: Date;
  updatedAt: Date;
  order: OrderProps; // Added for BelongsTo
}

export interface OrderItemCreationProps {
  orderId: number;
  productId: number;
  productCode: string;
  productDescription?: string;
  productQty?: number;
  productUom: uom;
  productUnitPrice: number;
  productTotal: number;
  isDeleted: number;
  isReturn: number;
}

@Table({
  tableName: "OrderItems",
  timestamps: true,
})
export default class OrderItem extends Model<
  OrderItemProps,
  OrderItemCreationProps
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare orderItemId: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare orderId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare productId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare productCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare productDescription?: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true, // Changed to true to match OrderItemCreationProps
  })
  declare productQty?: number;

  @Column({
    type: DataType.ENUM("pc", "kg", "box"),
    allowNull: false,
  })
  declare productUom: uom;

  @Column({
    type: DataType.DOUBLE(18, 3),
    allowNull: false,
  })
  declare productUnitPrice: number;

  @Column({
    type: DataType.DOUBLE(18, 3),
    allowNull: false,
  })
  declare productTotal: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare isDeleted: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare isReturn: number;

  @BelongsTo(() => Order, "orderId")
  declare order: OrderProps;
}
