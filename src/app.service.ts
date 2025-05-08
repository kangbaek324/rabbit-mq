import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject("TEST_SERVICE") private client: ClientProxy) {}

  async test() {
    for (let i = 0; i < 100; i++) {
      this.client.emit("rabbitMQ", { Id: i });
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
}
