import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ILoginRequest,
  ILoginResponse,
  ISignupRequest,
} from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async signup(req: ISignupRequest): Promise<Omit<User, 'password'> | void> {
    const { username, email, password } = req;
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

  async login(req: ILoginRequest): Promise<ILoginResponse> {
    const { email, password } = req;
    try {
      if (!email) {
        throw new BadRequestException('Email is required');
      }
      if (!password) {
        throw new BadRequestException('Password is required');
      }
      const user = await this.userModel.findOne({ where: { email } });
      if (!user) {
        throw new BadRequestException('User with this email does not exist');
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new BadRequestException('Password is incorrect');
      }

      const payload = { email: user.email, id: user.id };
      const token = this.jwtService.sign(payload);

      return {
        message: 'Login successful',
        access_token: token,
      };
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
