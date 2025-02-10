import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import {Cart} from '../cart/cart.model';
import { OrderItem } from 'src/link_tables/orderItem.model';
import { Item } from 'src/item/item.model';
import { CartItem } from 'src/link_tables/cartItem.model';
import { Ingredient } from 'src/ingredient/ingredient.model';

@Module({
  imports: [SequelizeModule.forFeature([Order, OrderItem, Cart, Item, CartItem, Ingredient])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
