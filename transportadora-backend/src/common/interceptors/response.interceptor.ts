import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { map, Observable } from 'rxjs';
  
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
      return next.handle().pipe(
        map((data) => ({
          success: true,
          data,
        })),
      );
    }
  }
  