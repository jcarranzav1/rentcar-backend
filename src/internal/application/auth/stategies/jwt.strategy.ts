import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { omitPassword as omitOwnerPassword } from 'src/internal/domain/dto/owner/owner.response'
import { JWTPayload } from 'src/internal/domain/dto/token/token'
import { omitPassword as omitUserPassword } from 'src/internal/domain/dto/user/user.response'
import { IOwnerAuthService } from '../auth.owner.service'
import { IUserAuthService } from '../auth.user.service'

@Injectable()
export class JwtStrategyUser extends PassportStrategy(Strategy, 'jwt-user') {
  constructor(
    @Inject('IUserAuthService') private readonly authService: IUserAuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secret'),
    })
  }

  async validate({ email }: JWTPayload) {
    try {
      const user = await this.authService.validateUser(email)
      return omitUserPassword(user)
    } catch (err) {
      throw err
    }
  }
}

@Injectable()
export class JwtStrategyOwner extends PassportStrategy(Strategy, 'jwt-owner') {
  constructor(
    @Inject('IOwnerAuthService')
    private readonly authService: IOwnerAuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secret'),
      userProperty: 'owner',
    })
  }

  async validate({ email }: JWTPayload) {
    try {
      const owner = await this.authService.validateOwner(email)
      return omitOwnerPassword(owner)
    } catch (err) {
      throw err
    }
  }
}
