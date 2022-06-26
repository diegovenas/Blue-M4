import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    // para adicionar emogis WINDOWNS + .
    return 'App rodando 🚀! Acesse: ✅http://localhost:3333/docs para acessar a documentação';
  }

  // getBlue(): string {
  //   return 'Ola bluemers';
  // }
}
