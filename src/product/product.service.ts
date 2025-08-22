import Product, { ProductCreationProps } from "@/model/product.model";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async onModuleInit() {
    // Check if the table is empty to avoid duplicate insertions
    const userCount = await this.productModel.count();
    if (userCount === 0) {
      console.log("Inserting initial product data...");
      await this.insertInitialProducts();
    } else {
      console.log("Product already exist, skipping initialization.");
    }
  }

  async insertInitialProducts() {
    const initialProducts: ProductCreationProps[] = [
      {
        name: "Laptop Pro X",
        code: "PROD001",
        productCategoryId: 1, // Electronics
        status: "active",
        stockQty: 50,
        basePrice: 999.99,
        uom: "unit",
        image1: "laptop-pro-x-1.jpg",
        image2: "laptop-pro-x-2.jpg",
        lastAutocountSync: new Date("2025-08-22T15:00:00Z"),
        isDeleted: 0,
      },
      {
        name: "Wireless Mouse",
        code: "PROD002",
        productCategoryId: 1, // Electronics
        status: "active",
        stockQty: 200,
        basePrice: 29.99,
        uom: "unit",
        image1: "wireless-mouse-1.jpg",
        isDeleted: 0,
      },
      {
        name: "Office Chair",
        code: "PROD003",
        productCategoryId: 2, // Furniture
        status: "inactive",
        stockQty: 30,
        basePrice: 149.99,
        uom: "unit",
        image1: "office-chair-1.jpg",
        isDeleted: 0,
      },
      {
        name: "Smartphone Z",
        code: "PROD004",
        productCategoryId: 1, // Electronics
        status: "active",
        stockQty: 100,
        basePrice: 699.99,
        uom: "unit",
        image1: "smartphone-z-1.jpg",
        image2: "smartphone-z-2.jpg",
        lastAutocountSync: new Date("2025-08-22T14:00:00Z"),
        isDeleted: 0,
      },
      {
        name: "Desk Lamp",
        code: "PROD005",
        productCategoryId: 2, // Furniture
        status: "active",
        stockQty: 75,
        basePrice: 39.99,
        uom: "unit",
        image1: "desk-lamp-1.jpg",
        isDeleted: 0,
      },
      {
        name: "Bluetooth Speaker",
        code: "PROD006",
        productCategoryId: 1, // Electronics
        status: "active",
        stockQty: 150,
        basePrice: 59.99,
        uom: "unit",
        image1: "bluetooth-speaker-1.jpg",
        isDeleted: 0,
      },
      {
        name: "Bookshelf",
        code: "PROD007",
        productCategoryId: 2, // Furniture
        status: "inactive",
        stockQty: 20,
        basePrice: 199.99,
        uom: "unit",
        image1: "bookshelf-1.jpg",
        image2: "bookshelf-2.jpg",
        isDeleted: 0,
      },
      {
        name: "USB-C Cable",
        code: "PROD008",
        productCategoryId: 1, // Electronics
        status: "active",
        stockQty: 300,
        basePrice: 9.99,
        uom: "unit",
        image1: "usb-c-cable-1.jpg",
        isDeleted: 0,
      },
    ];

    try {
      await this.productModel.bulkCreate(initialProducts);
      console.log("Initial products inserted successfully.");
    } catch (error) {
      console.error("Error inserting initial products", error);
    }
  }

  /**
   * Get all products
   *
   * @returns {Promise<ProductCreationProps[]>} Array of product objects
   * @throws {InternalServerErrorException} If an error occurs during the operation
   */
  async getProducts(): Promise<ProductCreationProps[]> {
    try {
      const products = await this.productModel.findAll();
      return products;
    } catch (err: any) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
