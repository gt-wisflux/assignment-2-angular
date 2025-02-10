import { Column, Model, Table, DataType, HasOne, HasMany } from "sequelize-typescript";
import { Cart } from '../cart/cart.model';
import { Order } from '../order/order.model';

@Table({tableName: 'users'}) 
export class User extends Model<User> { 
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string
  
  // One to one
  @HasOne(() => Cart)
  cart: Cart
  
  // One to Many
  @HasMany(() => Order)
  orders: Order[]
}