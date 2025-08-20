import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";

export interface NotificationProps {
  notificationId: number;
  title: string;
  content: string;
  image?: string;
  agentId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationCreationProps {
  title: string;
  content: string;
  image?: string;
  agentId: number;
}

@Table({
  tableName: "Notifications",
  timestamps: true,
})
export default class Notification extends Model<
  NotificationProps,
  NotificationCreationProps
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare notificationId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare content: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare image?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare agentId: number;
}
