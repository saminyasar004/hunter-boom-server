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
  productId?: number;
  cartId?: number;
  qty: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItemCreationProps {
  productId?: number;
  cartId?: number;
  qty: number;
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
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare cartId?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare qty: number;
}
