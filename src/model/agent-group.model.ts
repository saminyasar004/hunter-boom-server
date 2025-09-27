import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";
import { status } from "../interfaces/";
import ProductAgentPricing from "./product-agent-pricing.model";
import Product from "./product.model";

export interface AgentGroupProps {
  agentGroupId: number;
  name?: string;
  status: status;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentGroupCreationProps {
  name: string;
  status: status;
}

@Table({
  tableName: "AgentGroups",
  timestamps: true,
})
export default class AgentGroup extends Model<
  AgentGroupProps,
  AgentGroupCreationProps
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare agentGroupId: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare name: string;

  @Column({
    type: DataType.ENUM("active", "inactive"),
    allowNull: false,
  })
  declare status: status;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare isDeleted: boolean;

  static associate() {
    AgentGroup.hasMany(ProductAgentPricing, { foreignKey: "agentGroupId" });
    AgentGroup.belongsToMany(Product, {
      through: ProductAgentPricing,
      foreignKey: "agentGroupId",
    });
  }
}
