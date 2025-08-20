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
  uplineAgentId?: number;
  isTopLevel: boolean;
  code: string;
  companyName: string;
  photo?: string;
  tinCode?: string;
  personInCharge: string;
  contactNumber: string;
  addContactNumber: string;
  email: string;
  address: string;
  addressPostalCode: string;
  addressCity: string;
  addressState: string;
  icSsm: string;
  username: string;
  password: string;
  agentGroupId: number;
  blacklisted: boolean;
  isDeleted: boolean;
  accountBook: string;
  displayTerm: string;
  creditLimit: string;
  creditTerm: string;
  overdueLimit: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentCreationProps {
  uplineAgentId: number;
  isTopLevel: boolean;
  code: string;
  companyName: string;
  photo?: string;
  tinCode?: string;
  personInCharge: string;
  contactNumber: string;
  addContactNumber: string;
  email: string;
  address: string;
  addressPostalCode: string;
  addressCity: string;
  addressState: string;
  icSsm: string;
  username: string;
  name: string;
  password: string;
  agentGroupId: number;
  blacklisted: boolean;
  isDeleted: boolean;
  accountBook: string;
  displayTerm: string;
  creditLimit: string;
  creditTerm: string;
  overdueLimit: number;
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare uplineAgentId: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare isTopLevel: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare companyName: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare photo?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare tinCode?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare personInCharge: string;

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
  declare email: string;

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
  declare icSsm: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

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
  declare blacklisted: boolean;

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
  declare displayTerm: string;

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
    type: DataType.DOUBLE,
    allowNull: false,
  })
  declare overdueLimit: number;
}
