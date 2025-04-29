import { Injectable } from '@nestjs/common';
import { GetServerListeningResponse } from './app.controller';

baseURL: 'http://localhost:3000/api/v1'

@Injectable()
export class AppService {
  getIsWorking(): GetServerListeningResponse {
    return {ok: true, message: "API is working"};
  }
}
