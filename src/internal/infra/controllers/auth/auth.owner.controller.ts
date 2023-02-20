import {
  Body,
  Controller,
  Inject,
  Next,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common'
import { IOwnerAuthService } from 'src/internal/application/auth/auth.owner.service'
import {
  CreateOwnerDto,
  LoginOwnerDto,
} from 'src/internal/domain/dto/owner/owner'

@Controller('auth/owner')
export class OwnerAuthController {
  constructor(
    @Inject('IOwnerAuthService')
    private readonly authService: IOwnerAuthService,
  ) {}

  @Post('signup')
  async signup(
    @Res() res,
    @Next() next,
    @Body()
    createOwnerDto: CreateOwnerDto,
  ): Promise<void> {
    try {
      const { owner, token } = await this.authService.signup(createOwnerDto)
      res.status(200).json({
        data: owner,
        meta: {
          statusCode: 200,
          token,
          message: `Account created successfully`,
        },
      })
    } catch (err) {
      next(err)
    }
  }

  @Post('login')
  async login(
    @Res() res,
    @Next() next,
    @Body(ValidationPipe)
    loginOwnerDto: LoginOwnerDto,
  ): Promise<void> {
    try {
      const { owner, token } = await this.authService.login(loginOwnerDto)
      res.status(200).json({
        data: owner,
        meta: {
          statusCode: 200,
          token,
          message: `Account login successfully`,
        },
      })
    } catch (err) {
      next(err)
    }
  }
}
