import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'orders', timestamps: true })
export class Order extends Model<Order> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  totalPrice: number;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
    defaultValue: [],
  })
  items: {
    size: string;
    ingredients: string[];
  }[];

  @Column({
    type: DataType.ENUM('pending', 'processing', 'completed', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  orderDate: Date;
}
