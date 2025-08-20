import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";

export interface ProductCategoryProps {
  productCategoryId: number;
  name: string;
  status: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategoryCreationProps {
  name: string;
  status: string;
}

@Table({
  tableName: "ProductCategories",
  timestamps: true,
})
export default class ProductCategory extends Model<
  ProductCategoryProps,
  ProductCategoryCreationProps
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare productCategoryId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare status: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare isDeleted: boolean;
}
