import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { status } from "../interfaces";

export interface PromotionProps {
  promotionId: number;
  name: string;
  status: status;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromotionCreationProps {
  name: string;
  status: status;
  startDate: Date;
  endDate: Date;
}

@Table({
  tableName: "Promotions",
  timestamps: true,
})
export default class Promotion extends Model<
  PromotionProps,
  PromotionCreationProps
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare promotionId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.ENUM("active", "inactive"),
    allowNull: false,
  })
  declare status: status;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare startDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare endDate: Date;
}
