import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";

export interface AuditTrailsProps {
  auditTrailsId: number;
  userId?: number;
  action?: string;
  content?: string;
  module?: string;
  tableRelated?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditTrailsCreationProps {
  userId?: number;
  action?: string;
  content?: string;
  module?: string;
  tableRelated?: string;
}

@Table({
  tableName: "AuditTrails",
  timestamps: true,
})
export default class AuditTrails extends Model<
  AuditTrailsProps,
  AuditTrailsCreationProps
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare auditTrailsId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare userId?: number;

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
}
