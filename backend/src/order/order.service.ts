import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order) private readonly orderModel: typeof Order,
    ) { }
    async createOrder(): Promise<void> {
    }
}