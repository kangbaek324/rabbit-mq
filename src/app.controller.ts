import { Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @EventPattern("rabbitMQ")
  async rabbitMQ(@Payload() data: any, @Ctx() context: RmqContext) {
    try {
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();

      await this.appService.addQueue(data);
      channel.ack(originalMsg);
    } catch(err) {
      console.log(err);
    }
  }
  
  @Post("/")
  async sendRequestToMQ() {
    try {
      this.appService.sendRequestToMQ();
    } catch(err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  @Post("/queue")
  async getQueue() {
    return this.appService.getQueue();
  }
}
