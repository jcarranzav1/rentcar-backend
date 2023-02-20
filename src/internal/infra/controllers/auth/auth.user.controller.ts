import {
  Body,
  Controller,
  Inject,
  Next,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common'
import { IUserAuthService } from 'src/internal/application/auth/auth.user.service'
import { CreateUserDto, LoginUserDto } from 'src/internal/domain/dto/user/user'

@Controller('auth/user')
export class UserAuthController {
  constructor(
    @Inject('IUserAuthService') private readonly authService: IUserAuthService,
  ) {}

  @Post('signup')
  async signup(
    @Res() res,
    @Next() next,
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<void> {
    try {
      const { user, token } = await this.authService.signup(createUserDto)
      res.status(200).json({
        data: user,
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
    loginUserDto: LoginUserDto,
  ): Promise<void> {
    try {
      const { user, token } = await this.authService.login(loginUserDto)
      res.status(200).json({
        data: user,
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
