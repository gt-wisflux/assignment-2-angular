import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './cart.model';
import { CartItem } from 'src/link_tables/cartItem.model';
import { Item } from '../item/item.model';
import { IAddToCartRequest } from './cart.interface';
import { Ingredient } from '../ingredient/ingredient.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private cartModel: typeof Cart,
    @InjectModel(Item) private itemModel: typeof Item,
    @InjectModel(CartItem) private cartItemModel: typeof CartItem,
    @InjectModel(Ingredient) private ingredientModel: typeof Ingredient,
  ) {}

  /*
   * Create or update a cart for a user
   */
  async upsert(data: IAddToCartRequest) {
    const { userId, totalPrice, items } = data;
    try {
      let cart = await this.cartModel.findOne({ where: { userId } });
      if (cart) {
        cart.totalPrice = Number(cart.totalPrice) + Number(totalPrice);
        await cart.save();
      } else {
        cart = await this.cartModel.create({
          userId: userId,
          totalPrice: totalPrice,
        } as Cart);
      }

      for (const item of items) {
        const newItem = await this.itemModel.create({
          cartId: cart.id,
          size: item.size,
          sizePrice: item.sizePrice,
          price: item.price,
        } as Item);

        await this.cartItemModel.create({
          cartId: cart.id,
          itemId: newItem.id,
          itemSize: item.size,
          itemSizePrice: item.sizePrice,
          itemPrice: item.price,
        } as CartItem);

        if (item.ingredients && item.ingredients.length > 0) {
          const ingredientsId = item.ingredients.map(
            (ingredient) => ingredient.id,
          );
          await newItem.$set('ingredients', ingredientsId);
        }
      }
      return cart;
    } catch (err) {
      console.error('Error creating cart', err);
      throw new Error('Failed to create cart');
    }
  }

  /**
   * Fetch cart by userId along with associated items
   */
  async getCartByUserId(userId: number) {
    try {
      const cart = await this.cartModel.findOne({
        where: { userId },
        include: [
          {
            model: this.cartItemModel, // Fetch cart items instead of items directly
            include: [
              {
                model: this.itemModel, // Get item details from itemModel
                include: [
                  {
                    model: this.ingredientModel, // Get ingredients for each item
                    through: { attributes: [] }, // Exclude join table attributes
                  },
                ],
              },
            ],
          },
        ],
      });
      return cart;
    } catch (err) {
      console.error('Error fetching cart', err);
      throw new Error('Failed to fetch cart');
    }
  }

  /**
   * Clear cart item from cartItemModel
   */
  async clearCartItems(cartId: number) {
    try {
      // Delete all cart items associated with this cart
      await this.cartItemModel.destroy({
        where: { cartId }, // Deletes only the cart contents, not the items themselves
      });

      // Reset the cart's total price
      await this.cartModel.update({ totalPrice: 0 }, { where: { id: cartId } });

      return {
        success: true,
        message: 'Cart items cleared successfully',
      };
    } catch (err) {
      console.error('Error clearing cart items', err);
      throw new Error('Failed to clear cart items');
    }
  }

  //async clearCart(cartId: number) {
  //  try {
  //    const deletedCount = await this.itemModel.destroy({ where: { cartId } });
  //    if (deletedCount === 0) {
  //      console.warn(`No items found for cartId: ${cartId}, nothing to clear.`);
  //      return { message: 'Cart was already empty or not found' };
  //    }
  //    console.log(`Cart cleared successfully for cartId: ${cartId}`);
  //    return { message: 'Cart cleared successfully' };
  //  } catch (error) {
  //    console.error('Error clearing cart', error);
  //    throw new Error('Failed to clear cart');
  //  }
  //}
}
