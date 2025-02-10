import { Column, Model, Table, BelongsToMany } from "sequelize-typescript";
import { Item } from '../item/item.model';
import { ItemIngredient } from '../link_tables/itemIngredient.model';

@Table({ tableName: 'ingredients' })
export class Ingredient extends Model<Ingredient> {
  @Column
  name: string

  @Column
  price: number
  
  @BelongsToMany(() => Item, () => ItemIngredient)
  items: Item[];
}