import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Promotion, { PromotionProps } from "./promotion.model";

export interface PromotionProductProps {
  productId: number;
  promotionId: number;
  agentGroupId: number;
  minimumQuantity: number;
  maximumQuantity: number;
  operationType: "fixed" | "percentage";
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromotionProductCreationProps {
  productId: number;
  promotionId: number;
  agentGroupId: number;
  minimumQuantity: number;
  maximumQuantity: number;
  operationType: "fixed" | "percentage";
  value: number;
}

@Table({
  tableName: "PromotionProducts",
  timestamps: true,
})
export default class PromotionProduct extends Model<
  PromotionProductProps,
  PromotionProductCreationProps
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare productId: number;

  @ForeignKey(() => Promotion) // Moved ForeignKey here
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare promotionId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare agentGroupId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare minimumQuantity: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare maximumQuantity: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare operationType: "fixed" | "percentage";

  @Column({
    type: DataType.DECIMAL(18, 3),
    allowNull: false,
  })
  declare value: number;

  @BelongsTo(() => Promotion, "promotionId") // Specify foreign key
  declare promotion: PromotionProps;
}
