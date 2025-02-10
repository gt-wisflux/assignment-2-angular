import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { IAddToCartRequest } from './cart.interface';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() body: IAddToCartRequest) {
    return this.cartService.upsert(body);
  }

  // Endpoint to get cart by userId
  @Get(':userId')
  async getCartByUserId(@Param('userId') userId: number) {
    return this.cartService.getCartByUserId(userId);
  }
  
  @Post('clear/:cartId')
  async clearCart(@Param('cartId') cartId: number) {
    return this.cartService.clearCartItems(cartId);
  }
}
