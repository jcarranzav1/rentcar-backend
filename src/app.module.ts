import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Request, Response } from 'express'
import { LoggerModule } from 'nestjs-pino'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config/config'
import {
  CORRELATION_ID_HEADER,
  RequestCorrelationID,
} from './internal/infra/middleware/request-id'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            timestampKey: 'time',
            singleLine: true,
          },
        },
        customProps(req: Request) {
          return {
            correlationId: req[CORRELATION_ID_HEADER],
          }
        },
        serializers: {
          req: (req: Request) => ({
            method: req.method,
            url: req.url,
            headers: {
              host: req.headers.host,
              'content-type': req.headers['content-type'],
            },
          }),
          res: (res: Response) => ({
            statusCode: res.statusCode,
          }),
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestCorrelationID)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
