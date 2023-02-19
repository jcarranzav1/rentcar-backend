import {
  Body,
  Controller,
  Get,
  Inject,
  Next,
  Param,
  Put,
  Query,
  Request,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { JwtUserAuthGuard } from 'src/internal/application/auth/guards/jwt-auth.guard'
import { IUserService } from 'src/internal/application/user.service'
import { PageOptionsDto } from 'src/internal/domain/dto/pagination/pagination'
import { UpdateUserDto } from 'src/internal/domain/dto/user/user'

@Controller('user')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
  ) {}

  @UseGuards(JwtUserAuthGuard)
  @Get()
  async getAllUsers(
    @Res() res,
    @Next() next,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<void> {
    try {
      const pageUsers = await this.userService.getAllUsers(pageOptionsDto)
      res.status(200).json(pageUsers)
    } catch (err) {
      next(err)
    }
  }

  @UseGuards(JwtUserAuthGuard)
  @Get('profile')
  async profile(@Request() req, @Res() res): Promise<void> {
    res.status(200).json({
      data: req.user,
      meta: {
        statusCode: 200,
      },
    })
  }

  @UseGuards(JwtUserAuthGuard)
  @Put('profile')
  async updateProfile(
    @Request() req,
    @Res() res,
    @Next() next,
    @Body(ValidationPipe)
    updateUser: UpdateUserDto,
  ): Promise<void> {
    try {
      console.log(req.user)
      const user = await this.userService.updateUser(req.user.email, updateUser)
      res.status(200).json({
        data: user,
        meta: {
          statusCode: 200,
        },
      })
    } catch (err) {
      next(err)
    }
  }

  @UseGuards(JwtUserAuthGuard)
  @Get(':id')
  async getUserByID(
    @Res() res,
    @Next() next,
    @Param('id') id: string,
  ): Promise<void> {
    try {
      console.log('wat')
      const user = await this.userService.getUserByID(id)
      res.status(200).json({
        data: user,
        meta: {
          statusCode: 200,
        },
      })
    } catch (err) {
      next(err)
    }
  }
}
