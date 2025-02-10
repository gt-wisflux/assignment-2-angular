import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  DataType
} from 'sequelize-typescript';
import { Order } from '../order/order.model';
import { Item } from '../item/item.model';

@Table({ tableName: 'order_items' })
export class OrderItem extends Model<OrderItem> {
  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @ForeignKey(() => Item)
  @Column
  itemId: number;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => Item)
  item: Item;

  @Column({ type: DataType.STRING, allowNull: false })
  itemSize: string;
  
  @Column({ type: DataType.STRING, allowNull: false })
  itemSizePrice: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  itemPrice: number;
}
