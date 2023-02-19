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
import { OwnerService } from './owner.service'
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
    { provide: 'IOwnerService', useClass: OwnerService },
    { provide: 'IUserAuthService', useClass: UserAuthService },
    { provide: 'IOwnerAuthService', useClass: OwnerAuthService },
    JwtStrategyUser,
    JwtStrategyOwner,
  ],
  exports: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IOwnerService', useClass: OwnerService },
    { provide: 'IUserAuthService', useClass: UserAuthService },
    { provide: 'IOwnerAuthService', useClass: OwnerAuthService },
  ],
})
export class ApplicationModule {}
