import {
  Column,
  Model,
  Table,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Cart } from '../cart/cart.model';
import { Item } from '../item/item.model';

@Table({ tableName: 'cart_items' })
export class CartItem extends Model<CartItem> {
  @ForeignKey(() => Cart)
  @Column
  cartId: number;

  @ForeignKey(() => Item)
  @Column
  itemId: number;
  
  @Column({ type: DataType.STRING, allowNull: false })
  itemSize: string;
  
  @Column({ type: DataType.INTEGER, allowNull: false })
  itemPrice: number;
  
  @Column({ type: DataType.INTEGER, allowNull: false })
  itemSizePrice: number;

  @BelongsTo(() => Cart, { onDelete: 'CASCADE' }) // If a cart is deleted, remove cart items
  cart: Cart;

  @BelongsTo(() => Item, { onDelete: 'RESTRICT' }) // Prevent item deletion if in cart
  item: Item;
}