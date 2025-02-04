import { Injectable } from '@nestjs/common';

// makes the service injectable
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
