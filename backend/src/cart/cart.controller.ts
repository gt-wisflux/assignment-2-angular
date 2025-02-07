import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { IAddToCartRequest } from './cart.interface';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() body: IAddToCartRequest) {
    return this.cartService.createCart(body);
  }

  // Endpoint to get cart by userId
  @Get(':userId')
  async getCartByUserId(@Param('userId') userId: number) {
    return this.cartService.getCartByUserId(userId);
  }
}
