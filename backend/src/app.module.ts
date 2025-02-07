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
/* if env not working then import dotenv */

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      uri: process.env.DB_URL,
      models: [User, Order, Ingredient, Cart],
    }),
    AuthModule,
    OrderModule,
    IngredientModule,
    CartModule,
  ],
  controllers: [AppController], // handle incoming requests
  providers: [AppService], // handles logic
})
export class AppModule {}
