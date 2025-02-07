import { Column, Model, Table, DataType,AutoIncrement} from 'sequelize-typescript';

@Table({ tableName: 'items' })
export class Item extends Model<Item> {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  id: number;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  cartId: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  size: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ingredientId: string;
}
