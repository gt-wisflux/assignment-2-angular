import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule} from '@nestjs/sequelize'
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.model';
/* if env not working then import dotenv */

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      uri: process.env.DB_URL,
      models: [User],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController], // handle incoming requests
  providers: [AppService], // handles logic
})
export class AppModule {}
