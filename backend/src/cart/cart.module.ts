import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './cart.model';
import { Item} from '../item/item.model'
import { Ingredient } from 'src/ingredient/ingredient.model';
import { ItemIngredient } from 'src/link_tables/itemIngredient.model';
import { CartItem } from 'src/link_tables/cartItem.model';

@Module({
  imports: [SequelizeModule.forFeature([Cart, Item, Ingredient, ItemIngredient, CartItem])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
