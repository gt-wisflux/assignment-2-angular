import {
  Column,
  Model,
  Table,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/auth/user.model';
import { Item } from 'src/item/item.model';
import { CartItem } from '../link_tables/cartItem.model';

@Table({ tableName: 'carts' })
export class Cart extends Model<Cart> {
  // Foreign key linking to user
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column
  totalPrice: number;

  @BelongsTo(() => User)
  user: User;
  
  @HasMany(() => Item)
  items: Item[];

  @HasMany(() => CartItem)
  cartItems: CartItem[];
}
