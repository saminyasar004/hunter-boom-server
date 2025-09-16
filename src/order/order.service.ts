import OrderItem from "@/model/order-item.model";
import Order from "@/model/order.model";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Sequelize } from "sequelize";
import Product from "@/model/product.model";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    @InjectModel(OrderItem)
    private readonly orderItemModel: typeof OrderItem,
    @InjectModel(Product)
    private readonly productModel: typeof Product,
    private readonly sequelize: Sequelize,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const transaction = await this.sequelize.transaction();
    try {
      // Validate order items
      if (createOrderDto.items.length === 0) {
        console.log("Order must include at least one item");
        throw new BadRequestException("Order must include at least one item");
      }

      // Validate product IDs and codes
      const productIds = createOrderDto.items.map((item) => item.productId);
      const products = await this.productModel.findAll({
        where: { productId: productIds },
        transaction,
      });

      console.log("products ", products);
      if (products.length !== new Set(productIds).size) {
        console.log("One or more product IDs are invalid");
        throw new BadRequestException("One or more product IDs are invalid");
      }

      // for (const item of createOrderDto.items) {
      //   const product = products.find((p) => p.productId === item.productId);
      //   if (product && product.code !== item.productCode) {
      //     console.log(
      //       `Product code ${item.productCode} does not match product ID ${item.productId}`,
      //     );
      //     throw new BadRequestException(
      //       `Product code ${item.productCode} does not match product ID ${item.productId}`,
      //     );
      //   }
      // }

      // // Create the order
      // const order = await this.orderModel.create(
      //   {
      //     orderNumber: createOrderDto.orderNumber,
      //     agentId: createOrderDto.agentId,
      //     partnerId: createOrderDto.partnerId,
      //     promotionId: createOrderDto.promotionId,
      //     soNumber: createOrderDto.soNumber,
      //     date: createOrderDto.date,
      //     address: createOrderDto.address,
      //     addressPostalCode: createOrderDto.addressPostalCode,
      //     addressCity: createOrderDto.addressCity,
      //     addressState: createOrderDto.addressState,
      //     status: createOrderDto.status,
      //     remark: createOrderDto.remark,
      //     subTotal: createOrderDto.subTotal,
      //     tax: createOrderDto.tax,
      //     total: createOrderDto.total,
      //     courier: createOrderDto.courier,
      //     shippingPrice: createOrderDto.shippingPrice,
      //     returnReason: createOrderDto.returnReason,
      //     returnRemark: createOrderDto.returnRemark,
      //     shippingInvoice: createOrderDto.shippingInvoice,
      //     approveDate: createOrderDto.approveDate,
      //     shippedDate: createOrderDto.shippedDate,
      //     cancelledDate: createOrderDto.cancelledDate,
      //     cancelledReason: createOrderDto.cancelledReason,
      //     completedDate: createOrderDto.completedDate,
      //     returnDate: createOrderDto.returnDate,
      //     autocountStatus: createOrderDto.autocountStatus,
      //     autocountAccountId: createOrderDto.autocountAccountId,
      //     isDeleted: createOrderDto.isDeleted,
      //     printDatetime: createOrderDto.printDatetime,
      //     creditTerm: createOrderDto.creditTerm,
      //     creditLimit: createOrderDto.creditLimit,
      //   },
      //   { transaction },
      // );

      // // Create order items
      // const orderItems = createOrderDto.items.map((item) => ({
      //   orderId: order.orderId,
      //   productId: item.productId,
      //   productCode: item.productCode,
      //   productDescription: item.productDescription,
      //   productQty: item.productQty,
      //   productUom: item.productUom,
      //   productUnitPrice: item.productUnitPrice,
      //   productTotal: item.productTotal,
      //   isDeleted: item.isDeleted,
      //   isReturn: item.isReturn,
      // }));

      // await this.orderItemModel.bulkCreate(orderItems, {
      //   transaction,
      //   validate: true,
      // });

      // await transaction.commit();
      // console.log(
      //   `Order ${order.orderNumber} created with ${orderItems.length} items`,
      // );

      return {
        status: 201,
        message: "Order created successfully",
        // data: {
        //   ...order.toJSON(),
        //   items: orderItems,
        // },
      };
    } catch (error) {
      // await transaction.rollback();
      console.log("Error creating order:", error.message, error.stack);
      // if (error.name === "SequelizeForeignKeyConstraintError") {
      //   throw new BadRequestException("Invalid product ID reference");
      // }
      // if (error.name === "SequelizeValidationError") {
      //   console.log(error.errors.map((e) => e.message));
      //   throw new BadRequestException(error.errors.map((e) => e.message));
      // }
      // throw error;
    }
  }
}
