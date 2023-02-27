import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import InfraModule from '../infra/infra.module'
import { OwnerAuthService } from './auth/auth.owner.service'
import { UserAuthService } from './auth/auth.user.service'
import {
  JwtStrategyOwner,
  JwtStrategyUser,
} from './auth/stategies/jwt.strategy'
import { BookingService } from './booking.service'
import { CarsService } from './cars.service'
import { OwnerService } from './owner.service'
import { MercadoPagoService } from './payment/mercado-pago.service'
import { UserService } from './user.service'

@Module({
  imports: [
    InfraModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: configService.get('jwt.expires') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserAuthService', useClass: UserAuthService },
    { provide: 'IOwnerService', useClass: OwnerService },
    { provide: 'IOwnerAuthService', useClass: OwnerAuthService },
    { provide: 'ICarsService', useClass: CarsService },
    { provide: 'IBookingService', useClass: BookingService },
    JwtStrategyUser,
    JwtStrategyOwner,
    MercadoPagoService,
  ],
  exports: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserAuthService', useClass: UserAuthService },
    { provide: 'IOwnerService', useClass: OwnerService },
    { provide: 'IOwnerAuthService', useClass: OwnerAuthService },
    { provide: 'ICarsService', useClass: CarsService },
    { provide: 'IBookingService', useClass: BookingService },
  ],
})
export class ApplicationModule {}
