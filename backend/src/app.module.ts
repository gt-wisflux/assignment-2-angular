import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule} from '@nestjs/sequelize'
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.model';
import { OrderModule } from './order/order.module';
import { Order } from './order/order.model';
import { IngredientModule } from './ingredient/ingredient.module';
import { Ingredient } from './ingredient/ingredient.model';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/cart.model';
import { Item} from './item/item.model'
import { ItemModule } from './item/item.module';
import { ItemIngredient } from './link_tables/itemIngredient.model';
import { OrderItem } from './link_tables/orderItem.model';
import { CartItem } from './link_tables/cartItem.model';
/* if env not working then import dotenv */

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      uri: process.env.DB_URL,
      models: [User, Order, Ingredient, Cart, Item, ItemIngredient, OrderItem, CartItem],
    }),
    AuthModule,
    OrderModule,
    IngredientModule,
    CartModule,
    ItemModule,
  ],
  controllers: [AppController], // handle incoming requests
  providers: [AppService], // handles logic
})
export class AppModule {}
