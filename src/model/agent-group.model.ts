import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";
import { status } from "../interfaces/";

export interface AgentGroupProps {
  agentGroupId: number;
  code?: string;
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
    type: DataType.STRING,
    allowNull: true,
  })
  declare code: string;

  @Column({
    type: DataType.ENUM("active", "inactive"),
    allowNull: false,
  })
  declare status: status;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  })
  declare isDeleted: boolean;
}
