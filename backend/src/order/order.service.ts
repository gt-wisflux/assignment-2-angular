import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { Cart } from '../cart/cart.model';
import { Item } from '../item/item.model';
import { ICreateOrderRequest } from './order.interface';
import { Sequelize } from 'sequelize-typescript';
import { OrderItem } from '../link_tables/orderItem.model';
import { CartItem } from '../link_tables/cartItem.model';
import { Ingredient } from '../ingredient/ingredient.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private readonly orderModel: typeof Order,
    @InjectModel(Cart) private readonly cartModel: typeof Cart,
    @InjectModel(CartItem) private readonly cartItemModel: typeof CartItem,
    @InjectModel(Item) private readonly itemModel: typeof Item,
    @InjectModel(Ingredient) private readonly ingredientModel: typeof OrderItem,
    @InjectModel(OrderItem) private readonly orderItemModel: typeof OrderItem,
    private readonly sequelize: Sequelize,
  ) {}

  async createOrder(data: ICreateOrderRequest) {
    try {
      const { userId, totalPrice, cartId } = data;
      const cart = await this.cartModel.findOne({
        where: { id: cartId, userId },
        include: [
          {
            model: this.cartItemModel,
            include: [this.itemModel], // Fetch associated items
          },
        ],
      });
      if (!cart) {
        throw new Error('Cart not found');
      }

      const order = await this.orderModel.create({
        userId,
        totalPrice,
        status: 'pending',
      } as Order);

      //for (const item of cart.items) {
      //  await this.orderItemModel.create({
      //    orderId: order.id,
      //    itemId: item.id,
      //    itemSize: item.size,
      //    itemPrice: item.price,
      //  } as OrderItem);
      //}

      for (const cartItem of cart.cartItems) {
        await this.orderItemModel.create({
          orderId: order.id,
          itemId: cartItem.item.id, // Get the actual item ID from cartItem
          itemSize: cartItem.item.size, // Use item details
          itemSizePrice: cartItem.item.sizePrice,
          itemPrice: cartItem.item.price,
        } as OrderItem);
      }

      const orderwithItems = await this.orderModel.findOne({
        where: { id: order.id },
        include: [
          {
            model: this.orderItemModel,
            include: [this.itemModel],
          },
        ],
      });

      return orderwithItems;
    } catch (err) {
      console.error('Error creating order', err);
      throw new Error('Failed to creat order');
    }
  }

  async fetchLatestOrderByUserId(userId: number) {
    try {
      //const latestOrder = await this.orderModel.findOne({
      //  where: { userId },
      //  include: [
      //    {
      //      model: this.orderItemModel,
      //      include: [Item],
      //    },
      //  ],
      //  order: [['createdAt', 'DESC']], // Orders the records by creation date descending
      //});

      const latestOrder = await this.orderModel.findOne({
        where: { userId },
        include: [
          {
            model: this.orderItemModel,
            include: [
              {
                model: this.itemModel, // Fetch items inside order_items
                include: [
                  {
                    model: this.ingredientModel, // Fetch ingredients from items
                    through: { attributes: [] }, // Hide join table fields
                  },
                ],
              },
            ],
          },
        ],

        order: [['createdAt', 'DESC']], // Orders the records by creation date descending
      });
      return latestOrder;
    } catch (error) {
      console.error('Error fetching the latest order', error);
      throw new Error('Failed to fetch the latest order');
    }
  }

  async checkout(userId: number) {
    try {
      const order = await this.fetchLatestOrderByUserId(userId);

      if (!order) {
        throw new Error('No pending order found for the user.');
      }
      const udpatedOrder = await order.update({ status: 'completed' });
      return udpatedOrder;
    } catch (error) {
      console.error('Error during checkout:', error);
      throw new Error('Checkout failed');
    }
  }

  async getOrders(userId: number) {
    return await this.orderModel.findAll({
      where: { userId },
      include: [
        {
          model: this.orderItemModel,
          include: [
            {
              model: this.itemModel, // Fetch items inside order_items
              include: [
                {
                  model: this.ingredientModel, // Fetch ingredients from items
                  through: { attributes: [] }, // Hide join table fields
                },
              ],
            },
          ],
        },
      ],

      order: [['createdAt', 'DESC']], // Orders the records by creation date descending
    });
  }
}
