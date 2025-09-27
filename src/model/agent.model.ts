import { status } from "@/interfaces";
import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";

export interface AgentProps {
  agentId: number;
  code: string;
  agentName: string;
  file?: string;
  contactNumber: string;
  addContactNumber: string;
  address: string;
  addressPostalCode: string;
  addressCity: string;
  addressState: string;
  username: string;
  password: string;
  agentGroupId: number;
  isDeleted: boolean;
  accountBook: string;
  creditLimit: string;
  creditTerm: string;
  status: status;
  isTopLevel: number;
  uplineAgentId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentCreationProps {
  code: string;
  agentName: string;
  file?: string;
  contactNumber: string;
  addContactNumber: string;
  address: string;
  addressPostalCode: string;
  addressCity: string;
  addressState: string;
  username: string;
  password: string;
  agentGroupId: number;
  isDeleted: boolean;
  accountBook: string;
  creditLimit: string;
  creditTerm: string;
  status: status;
  isTopLevel: number;
  uplineAgentId: number | null;
}

@Table({
  tableName: "Agents",
  timestamps: true,
})
export default class Agent extends Model<AgentProps, AgentCreationProps> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare agentId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare code: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare agentName: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare file?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare contactNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare addContactNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare addressPostalCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare addressCity: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare addressState: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare agentGroupId: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare isDeleted: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare accountBook: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare creditLimit: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare creditTerm: string;

  @Column({
    type: DataType.ENUM("active", "inactive"),
    allowNull: false,
  })
  declare status: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare isTopLevel: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  declare uplineAgentId: number | null;
}
