import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Ingredient } from 'src/ingredient/ingredient.model';
import { Item } from 'src/item/item.model';

@Table({tableName: 'item_ingredients'})
export class ItemIngredient extends Model<ItemIngredient>{
  @ForeignKey(()=>Item)
  @Column
  itemId: number;
  
  @ForeignKey(()=>Ingredient)
  @Column
  ingredientId: number
}
