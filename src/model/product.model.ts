import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";
import ProductAgentPricing from "./product-agent-pricing.model";
import AgentGroup from "./agent-group.model";

export interface ProductProps {
  productId: number;
  name: string;
  code?: string;
  productCategoryId: number;
  status: string;
  stockQty: number;
  basePrice: number;
  uom: string;
  image1?: string;
  image2?: string;
  lastAutocountSync?: Date;
  isDeleted: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCreationProps {
  name: string;
  code?: string;
  productCategoryId: number;
  status: string;
  stockQty: number;
  basePrice: number;
  uom: string;
  image1?: string;
  image2?: string;
  lastAutocountSync?: Date;
  isDeleted: number;
}

@Table({
  tableName: "Products",
  timestamps: true,
})
export default class Product extends Model<ProductProps, ProductCreationProps> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare productId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare code?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare productCategoryId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare status: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare stockQty: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  declare basePrice: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare uom: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare image1?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare image2?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare lastAutocountSync?: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare isDeleted: number;

  static associate() {
    Product.hasMany(ProductAgentPricing, { foreignKey: "productId" });
    Product.belongsToMany(AgentGroup, {
      through: ProductAgentPricing,
      foreignKey: "productId",
    });
  }
}
