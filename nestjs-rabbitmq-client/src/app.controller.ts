import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('MESSAGE_SERVICE') private readonly client: ClientProxy,
    private readonly appService: AppService
    ) {}

  @Get()
  getHello(): string {
    const result = this.appService.getHello();
    this.publishPost(result);
    return result;
  }

  async publishPost(hello: string) {
    this.client.emit<string>('message_emit', hello);
    return 'Post Created!';
}
}
