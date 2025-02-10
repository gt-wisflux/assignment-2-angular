import { Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from '../auth/user.model';
import { OrderItem } from '../link_tables/orderItem.model';

@Table({ tableName: 'orders', timestamps: true })
export class Order extends Model<Order> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  totalPrice: number;

  @Column({
    type: DataType.ENUM('pending', 'processing', 'completed', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false,
  })
  status: string;
  
  @HasMany(() => OrderItem)
  orderItems: OrderItem[];
}
