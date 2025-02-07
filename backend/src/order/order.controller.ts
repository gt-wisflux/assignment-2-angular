import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { OrderService } from './order.service';
import { ICreateOrderRequest } from './order.interface';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post('create')
    async createOrder(@Body() body: ICreateOrderRequest) {
        return this.orderService.createOrder(body);
    }
    
    @Get('latestOrder/:userId')
    async fetchLatestOrderByUserId(@Param('userId') userId: number) {
        return this.orderService.fetchLatestOrderByUserId(userId);
    }
    
    @Post('checkout/:userId')
    async checkout(@Param('userId') userId: number) {
        return this.orderService.checkout(userId);
    }
    
    @Get(':userId')
    async getOrders(@Param('userId') userId: number) {
        return this.orderService.getOrders(userId);
    }
}
