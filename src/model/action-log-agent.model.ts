import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";

export interface ActionLogAgentProps {
  actionLogAgentId: number;
  agentId?: number;
  action?: string;
  content?: string;
  module?: string;
  tableRelated?: string;
  isSuccess: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActionLogAgentCreationProps {
  agentId?: number;
  action?: string;
  content?: string;
  module?: string;
  tableRelated?: string;
  isSuccess: boolean;
}

@Table({
  tableName: "ActionLogAgents",
  timestamps: true,
})
export default class ActionLogAgent extends Model<
  ActionLogAgentProps,
  ActionLogAgentCreationProps
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare actionLogAgentId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare agentId?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare action?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare content?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare module?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare tableRelated?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  })
  declare isSuccess: boolean;
}
