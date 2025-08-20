import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";

export interface OrderItemProps {
  orderItemId: number;
  productId?: number;
  orderId?: number;
  productQty?: number;
  productPrice?: number;
  productTotal?: number;
  productUom?: string;
  isDeleted: number;
  isReturn: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItemCreationProps {
  productId?: number;
  orderId?: number;
  productQty?: number;
  productPrice?: number;
  productTotal?: number;
  productUom?: string;
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

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare productId?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare orderId?: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
  })
  declare productQty?: number;

  @Column({
    type: DataType.DOUBLE(18, 3),
    allowNull: true,
  })
  declare productPrice?: number;

  @Column({
    type: DataType.DOUBLE(18, 3),
    allowNull: true,
  })
  declare productTotal?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare productUom?: string;

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
}
