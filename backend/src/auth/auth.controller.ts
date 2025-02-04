import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: { username: string; email: string; password:string}) {
    const { username, email, password} = body;
    return this.authService.signup(username, email, password);
  }

  //@Get('login')
  //login(): string {
  //  return this.authService.login();
  //}
}
