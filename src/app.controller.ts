import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
@ApiTags('Status')
@Controller('/api') //declaração das rotas no parametros
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/world') //declaracao restante da rota
  getAppStatus(): string {
    return this.appService.getAppStatus();
  }

  // @Get('/blue')
  // getBlue(): string {
  //   return this.appService.getBlue();
  // }
}
