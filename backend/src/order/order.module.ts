import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import {Cart} from '../cart/cart.model';

@Module({
  imports: [SequelizeModule.forFeature([Order, Cart])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
