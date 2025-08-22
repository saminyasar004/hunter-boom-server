import { uom } from "@/interfaces";
import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";

export interface CartItemProps {
  cartItemId: number;
  productId: number;
  productCode: string;
  description?: string;
  cartId: number;
  qty: number;
  uom: uom;
  unitPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItemCreationProps {
  productId?: number;
  cartId: number;
  productCode: string;
  description?: string;
  qty: number;
  uom: uom;
  unitPrice: number;
}

@Table({
  tableName: "CartItems",
  timestamps: true,
})
export default class CartItem extends Model<
  CartItemProps,
  CartItemCreationProps
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare cartItemId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare productId?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare productCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare description?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare cartId?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare qty: number;

  @Column({
    type: DataType.ENUM("pc", "kg", "box"),
    allowNull: false,
  })
  declare uom: uom;

  @Column({
    type: DataType.DECIMAL(18, 3),
    allowNull: false,
  })
  declare unitPrice: number;
}
