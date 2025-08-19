import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";

export interface PromotionAgentGroupProps {
  promotionAgentGroupId: number;
  productId: number;
  promotionId: number;
  agentGroupId: number;
  minQty: number;
  maxQty: number;
  operation: string;
  value: number;
  isDeleted: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromotionAgentGroupCreationProps {
  productId: number;
  promotionId: number;
  agentGroupId: number;
  minQty: number;
  maxQty: number;
  operation: string;
  value: number;
  isDeleted: number;
}

@Table({
  tableName: "PromotionAgentGroups",
  timestamps: true,
})
export default class PromotionAgentGroup extends Model<
  PromotionAgentGroupProps,
  PromotionAgentGroupCreationProps
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare promotionAgentGroupId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare productId: number;

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
  declare minQty: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare maxQty: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare operation: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  declare value: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  })
  declare isDeleted: number;
}
