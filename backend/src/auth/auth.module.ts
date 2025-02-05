import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({ secret: 'secret' }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
