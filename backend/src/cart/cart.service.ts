import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './cart.model';
import { IAddToCartRequest } from './cart.interface';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private cartModel: typeof Cart) {}

  async createCart(data: IAddToCartRequest) {
    try {
      const userId = Number(data.userId); // Convert to number
      if (isNaN(userId)) {
        throw new Error('Invalid userId: Must be a number');
      }
      // Check if a cart already exists for the user
      let cart = await this.cartModel.findOne({
        where: { userId },
      });

      if (cart) {
        // Append new items to the existing cart
        cart.items = [...cart.items, ...data.items];

        // Update total price
        cart.totalPrice += data.totalPrice;

        // Save the updated cart
        await cart.save();

        console.log(`Cart updated for user ${data.userId}`);
        return cart;
      } else {
        // Create a new cart if one doesn't exist
        cart = await this.cartModel.create({
          userId: data.userId,
          totalPrice: data.totalPrice,
          items: data.items,
        } as Cart);

        console.log(`New cart created for user ${data.userId}`);
        return cart;
      }
    } catch (error) {
      console.error('Error handling cart:', error);
      throw error;
    }
  }

  // Fetch cart by userId
  async getCartByUserId(userId: number) {
    try {
      const cart = await this.cartModel.findOne({
        where: { userId },
      });

      if (!cart) {
        throw new Error('Cart not found for the provided userId');
      }

      return cart;
    } catch (error) {
      console.error('Error fetching cart by userId:', error);
      throw error;
    }
  }
}
