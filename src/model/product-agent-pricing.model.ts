import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Product from "./product.model";
import AgentGroup from "./agent-group.model";

export interface ProductAgentPricingProps {
  productId: number;
  agentGroupId: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductAgentPricingCreationProps {
  productId: number;
  agentGroupId: number;
  price: number;
}

@Table({
  tableName: "ProductAgentPricings",
  timestamps: true,
})
export default class ProductAgentPricing extends Model<
  ProductAgentPricingProps,
  ProductAgentPricingCreationProps
> {
  @PrimaryKey
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  declare productId: number;

  @PrimaryKey
  @ForeignKey(() => AgentGroup)
  @Column({ type: DataType.INTEGER })
  declare agentGroupId: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  declare price: number;
}
