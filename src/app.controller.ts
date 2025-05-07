import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/")
  async test(@Body() data: { to: string; subject: string; body:string }) {
    await this.appService.test(data);
    return { message: "성공적으로 요청이 큐에 추가되었습니다" };
  }
}
