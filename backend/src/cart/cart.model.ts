import {
  Column,
  Model,
  Table,
  DataType,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ tableName: 'carts' })
export class Cart extends Model<Cart> {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    unique: true,
  })
  userId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  totalPrice: number;

  @Column({
    type: DataType.JSONB, // Or DataType.ARRAY for PostgreSQL
    allowNull: false,
    defaultValue: [],
  })
  items: {
    size: string;
    ingredients: string[];
  }[]; // You can type this more specifically, e.g., Item[] if you have a defined interface
}
