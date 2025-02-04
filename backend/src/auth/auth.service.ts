import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async signup(
    username: string,
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | void> {
    try {
      if (!email) {
        throw new BadRequestException('Email is required');
        
      }
      const existingUser = await this.userModel.findOne({ where: { email } });
      if (existingUser) {
        throw new BadRequestException('User with this email already exists');
      }

      if (!password) {
        throw new BadRequestException('Password is required');
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await this.userModel.create({
        username,
        email,
        password: hashedPassword,
      } as User);
      const newUserWithoutPassword = newUser.toJSON() as Omit<User, 'password'>;
      delete (newUserWithoutPassword as any).password;
      return newUserWithoutPassword;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  //login(): string {
  //  return 'Login User';
  //}
}
