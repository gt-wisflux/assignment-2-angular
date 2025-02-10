import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Ingredient } from '../ingredient/ingredient.model';
import { ItemIngredient } from 'src/link_tables/itemIngredient.model';
import { Cart } from 'src/cart/cart.model';

@Table({ tableName: 'items' })
export class Item extends Model<Item> {
  // pizza size
  @Column
  size: string;

  @Column
  price: number;
  
  @Column
  sizePrice: number;

  @ForeignKey(() => Cart)
  @Column
  cartId: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @BelongsToMany(() => Ingredient, () => ItemIngredient)
  ingredients: Ingredient[];
}
