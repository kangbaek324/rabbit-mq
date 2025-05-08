import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @EventPattern("rabbitMQ")
  async rabbitMQ(@Payload() data: any) {
    console.log(`처리 시작: ${data.Id}`);
    await new Promise((resolve) => setTimeout(resolve, 100)); 
    console.log(`처리 끝: ${data.Id}`);
  }
  
  @Post("/")
  async test() {
    this.appService.test();
    return { message: "성공적으로 요청이 큐에 추가되었습니다" };
  }
}
