import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { Cart } from '../cart/cart.model';
import { ICreateOrderRequest } from './order.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private readonly orderModel: typeof Order,
    @InjectModel(Cart) private readonly cartModel: typeof Cart,
  ) {}

  async createOrder(data: ICreateOrderRequest) {
    const cart = await this.cartModel.findOne({
      where: { userId: data.userId },
    });

    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    const order = await this.orderModel.create({
      userId: data.userId,
      totalPrice: cart.totalPrice,
      items: cart.items, // Copying items from cart
      status: 'pending',
    } as Order);

    // Clear the user's cart after creating the order
    await this.cartModel.update(
      { items: [], totalPrice: 0 },
      { where: { userId: data.userId } },
    );

    return order;
  }

  async fetchLatestOrderByUserId(userId: number) {
    const latestOrder = await this.orderModel.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']], // Get the most recent order
    });

    if (!latestOrder) {
      throw new Error('No recent order found');
    }

    return latestOrder;
  }
  
  async checkout(userId: number) {
    const latestOrder = await this.fetchLatestOrderByUserId(userId);

    if (latestOrder.status === 'completed') {
      throw new Error('Latest order is already completed');
    }

    // Update the status of the latest order to 'completed'
    await this.orderModel.update(
      { status: 'completed' },
      { where: { id: latestOrder.id } },
    );
    
    
    const updatedOrder = await this.orderModel.findOne({ where: { id: latestOrder.id } });

    return updatedOrder;
  }
  

  async getOrders(userId: number) {
    return this.orderModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']] // Sort by createdAt in descending order (latest first)
    });
  }
}
