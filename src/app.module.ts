import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import config from './config/config'
import logger from './config/logger'
import { ApplicationModule } from './internal/application/application.module'
import { OwnerAuthController } from './internal/infra/controllers/auth/auth.owner.controller'
import { UserAuthController } from './internal/infra/controllers/auth/auth.user.controller'
import { BookingController } from './internal/infra/controllers/booking.controller'
import { CarController } from './internal/infra/controllers/cars.controller'
import { OwnerController } from './internal/infra/controllers/owner.controller'
import { UserController } from './internal/infra/controllers/user.controller'
import { RequestCorrelationID } from './internal/infra/middleware/request-id'

@Module({
  imports: [
    logger,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ApplicationModule,
  ],
  controllers: [
    BookingController,
    UserAuthController,
    UserController,
    OwnerAuthController,
    OwnerController,
    CarController,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestCorrelationID)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
