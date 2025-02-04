import { Injectable } from '@nestjs/common';

@Injectable()
// In service we just define methods to inject
export class UsersService {
  getUsers(): string {
    return 'Hello Users!';
  }

  getGaurav(): string {
    return 'hello Gaurav';
  }
}
