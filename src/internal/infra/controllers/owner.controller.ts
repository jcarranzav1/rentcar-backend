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
import { JwtOwnerAuthGuard } from 'src/internal/application/auth/guards/jwt-auth.guard'
import { IOwnerService } from 'src/internal/application/owner.service'
import { UpdateOwnerDto } from 'src/internal/domain/dto/owner/owner'
import { PageOptionsDto } from 'src/internal/domain/dto/pagination/pagination'

@Controller('owner')
export class OwnerController {
  constructor(
    @Inject('IOwnerService') private readonly ownerService: IOwnerService,
  ) {}

  @UseGuards(JwtOwnerAuthGuard)
  @Get()
  async getAllOwners(
    @Res() res,
    @Next() next,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<void> {
    try {
      const pageOwners = await this.ownerService.getAllOwners(pageOptionsDto)
      res.status(200).json(pageOwners)
    } catch (err) {
      next(err)
    }
  }

  @UseGuards(JwtOwnerAuthGuard)
  @Get('profile')
  async profile(@Request() req, @Res() res): Promise<void> {
    res.status(200).json({
      data: req.user,
      meta: {
        statusCode: 200,
      },
    })
  }

  @UseGuards(JwtOwnerAuthGuard)
  @Put('profile')
  async updateProfile(
    @Request() req,
    @Res() res,
    @Next() next,
    @Body(ValidationPipe)
    updateOwner: UpdateOwnerDto,
  ): Promise<void> {
    try {
      const owner = await this.ownerService.updateOwner(
        req.user.email,
        updateOwner,
      )
      res.status(200).json({
        data: owner,
        meta: {
          statusCode: 200,
        },
      })
    } catch (err) {
      next(err)
    }
  }

  @UseGuards(JwtOwnerAuthGuard)
  @Get(':id')
  async getOwnerByID(
    @Res() res,
    @Next() next,
    @Param('id') id: string,
  ): Promise<void> {
    try {
      const owner = await this.ownerService.getOwnerByID(id)
      res.status(200).json({
        data: owner,
        meta: {
          statusCode: 200,
        },
      })
    } catch (err) {
      next(err)
    }
  }
}
