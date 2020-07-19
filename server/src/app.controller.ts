import { Controller, Get } from '@nestjs/common';

@Controller('')
export class RootController {
  @Get()
  async getRoot() {
    return 'Hello World';
  }
}
