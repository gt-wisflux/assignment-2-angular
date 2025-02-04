import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController { 
  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  getUsers(): string { 
    return this.usersService.getUsers()
  }
  
  @Get('gaurav')
  getGaurav(): string { 
    return this.usersService.getGaurav()
  }
    
}
