import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";

export interface CartProps {
  cartId: number;
  agentId?: number;
  cartNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartCreationProps {
  agentId?: number;
  cartNumber?: string;
}

@Table({
  tableName: "Cart",
  timestamps: true,
})
export default class Cart extends Model<CartProps, CartCreationProps> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare cartId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare agentId?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare cartNumber?: string;
}
