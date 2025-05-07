import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject("TEST_SERVICE") private client: ClientProxy) {}

  async test(data: { to: string; subject: string; body: string}) {
    return await this.client.emit("what", data);
  }

  @MessagePattern("what")
  getNotifications(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(`Pattern: ${context.getPattern()}`);
    console.log(data);
  }
}
