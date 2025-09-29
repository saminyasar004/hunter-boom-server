import OrderItem from "@/model/order-item.model";
import Order, { OrderProps } from "@/model/order.model";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    @InjectModel(OrderItem)
    private readonly orderItemModel: typeof OrderItem,
  ) {}

  async getAllOrders(): Promise<OrderProps[]> {
    try {
      const orders = await this.orderModel.findAll({
        include: [
          {
            model: OrderItem,
            as: "orderItems",
          },
        ],
      });
      return orders ? orders.map((o) => o.toJSON()) : [];
    } catch (err: any) {
      console.error("Error getting orders:", err);
      throw new InternalServerErrorException("Failed to get orders");
    }
  }

  async getOrderById(orderId: number): Promise<OrderProps | null> {
    try {
      const order = await this.orderModel.findByPk(orderId, {
        include: [
          {
            model: OrderItem,
            as: "orderItems",
          },
        ],
      });
      return order ? order.toJSON() : null;
    } catch (err: any) {
      console.error("Error getting order by ID:", err);
      throw new InternalServerErrorException("Failed to get order by ID");
    }
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<any | null> {
    try {
      // Convert date strings to Date objects
      const orderData = {
        ...createOrderDto,
        date: createOrderDto.date ? new Date(createOrderDto.date) : undefined,
        approveDate: createOrderDto.approveDate
          ? new Date(createOrderDto.approveDate)
          : undefined,
        shippedDate: createOrderDto.shippedDate
          ? new Date(createOrderDto.shippedDate)
          : undefined,
        cancelledDate: createOrderDto.cancelledDate
          ? new Date(createOrderDto.cancelledDate)
          : undefined,
        completedDate: createOrderDto.completedDate
          ? new Date(createOrderDto.completedDate)
          : undefined,
        returnDate: createOrderDto.returnDate
          ? new Date(createOrderDto.returnDate)
          : undefined,
        printDatetime: createOrderDto.printDatetime
          ? new Date(createOrderDto.printDatetime)
          : undefined,
      };

      const order = await this.orderModel.create(orderData);

      // Map items to ensure orderId is defined
      const orderItemsData = createOrderDto.items.map((item) => ({
        ...item,
        orderId: order.orderId, // Ensure orderId is always set
      }));

      if (order) {
        await this.orderItemModel.bulkCreate(orderItemsData);
      }

      const createdOrder = await this.getOrderById(order.orderId);
      return createdOrder ? createdOrder : null;
    } catch (err: any) {
      console.error("Error creating order:", err);
      throw new InternalServerErrorException("Failed to create order");
    }
  }

  async editOrder(
    orderId: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<any | null> {
    try {
      // Find the existing order
      const order = await this.orderModel.findByPk(orderId);
      if (!order) {
        console.error("Order not found:", orderId);
        return null;
      }

      // Convert date strings to Date objects
      const orderData = {
        ...updateOrderDto,
        date: updateOrderDto.date ? new Date(updateOrderDto.date) : undefined,
        approveDate: updateOrderDto.approveDate
          ? new Date(updateOrderDto.approveDate)
          : undefined,
        shippedDate: updateOrderDto.shippedDate
          ? new Date(updateOrderDto.shippedDate)
          : undefined,
        cancelledDate: updateOrderDto.cancelledDate
          ? new Date(updateOrderDto.cancelledDate)
          : undefined,
        completedDate: updateOrderDto.completedDate
          ? new Date(updateOrderDto.completedDate)
          : undefined,
        returnDate: updateOrderDto.returnDate
          ? new Date(updateOrderDto.returnDate)
          : undefined,
        printDatetime: updateOrderDto.printDatetime
          ? new Date(updateOrderDto.printDatetime)
          : undefined,
      };

      // Update the order
      await order.update(orderData);

      // Delete existing order items
      await this.orderItemModel.destroy({ where: { orderId } });

      // Map new items to ensure orderId is defined
      const orderItemsData = updateOrderDto.items.map((item) => ({
        ...item,
        orderId: order.orderId,
      }));

      // Create new order items
      if (order) {
        await this.orderItemModel.bulkCreate(orderItemsData);
      }

      return order ? order.toJSON() : null;
    } catch (err: any) {
      console.error("Error updating order:", err);
      throw new InternalServerErrorException("Failed to update order");
    }
  }
}
