import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import OrderItem from "./order-item.model";
import Promotion, { PromotionProps } from "./promotion.model";

export interface OrderProps {
  orderId: number;
  orderNumber: string;
  agentId?: string;
  partnerId?: string;
  promotionId?: number;
  soNumber?: string;
  date?: Date;
  address: string;
  status: string;
  remark?: string;
  subTotal?: number;
  tax?: number;
  total: number;
  courier?: string;
  shippingPrice: number;
  returnReason?: string;
  returnRemark?: string;
  shippingInvoice?: string;
  approveDate?: Date;
  shippedDate?: Date;
  cancelledDate?: Date;
  cancelledReason?: string;
  completedDate?: Date;
  returnDate?: Date;
  autocountStatus?: string;
  autocountAccountId?: string;
  isDeleted: number;
  printDatetime?: Date;
  creditTerm: string;
  creditLimit: string;
  createdAt: Date;
  updatedAt: Date;
  promotion?: PromotionProps; // Added for BelongsTo
  orderItems: OrderItem[]; // Added for HasMany
}

export interface OrderCreationProps {
  agentId?: string;
  orderNumber: string;
  partnerId?: string;
  promotionId?: number;
  soNumber?: string;
  date?: Date;
  address: string;
  status: string;
  remark?: string;
  subTotal?: number;
  tax?: number;
  total: number;
  courier?: string;
  shippingPrice: number;
  returnReason?: string;
  returnRemark?: string;
  shippingInvoice?: string;
  approveDate?: Date;
  shippedDate?: Date;
  cancelledDate?: Date;
  cancelledReason?: string;
  completedDate?: Date;
  returnDate?: Date;
  autocountStatus?: string;
  autocountAccountId?: string;
  isDeleted: number;
  printDatetime?: Date;
  creditTerm: string;
  creditLimit: string;
}

@Table({
  tableName: "Orders",
  timestamps: true,
})
export default class Order extends Model<OrderProps, OrderCreationProps> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare orderId: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare orderNumber?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare agentId?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare partnerId?: string;

  @ForeignKey(() => Promotion)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare promotionId?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare soNumber?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare date?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare status: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare remark?: string;

  @Column({
    type: DataType.DECIMAL(18, 3),
    allowNull: true,
  })
  declare subTotal?: number;

  @Column({
    type: DataType.DECIMAL(18, 3),
    allowNull: true,
  })
  declare tax?: number;

  @Column({
    type: DataType.DECIMAL(18, 3),
    allowNull: false,
  })
  declare total: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare courier?: string;

  @Column({
    type: DataType.DECIMAL(18, 3),
    allowNull: false,
  })
  declare shippingPrice: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare returnReason?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare returnRemark?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare shippingInvoice?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare approveDate?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare shippedDate?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare cancelledDate?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare cancelledReason?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare completedDate?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare returnDate?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare autocountStatus?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare autocountAccountId?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare isDeleted: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare printDatetime?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare creditTerm: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare creditLimit: string;

  @BelongsTo(() => Promotion, "promotionId")
  declare promotion?: PromotionProps;

  @HasMany(() => OrderItem, "orderId")
  declare orderItems: OrderItem[];
}
