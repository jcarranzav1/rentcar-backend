import {
  Body,
  Controller,
  Get,
  Inject,
  Next,
  Param,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common'
import { JwtOwnerAuthGuard } from 'src/internal/application/auth/guards/jwt-auth.guard'
import { ICarsService } from 'src/internal/application/cars.service'
import { CreateCarDto, UpdateCarDto } from 'src/internal/domain/dto/cars'
import { PageOptionsDto } from 'src/internal/domain/dto/pagination'

@Controller('cars')
export class CarController {
  constructor(
    @Inject('ICarsService') private readonly carsService: ICarsService,
  ) {}

  @UseGuards(JwtOwnerAuthGuard)
  @Post()
  async createCar(
    @Request() req,
    @Res() res,
    @Next() next,
    @Body()
    createCarDto: CreateCarDto,
  ): Promise<void> {
    try {
      const car = await this.carsService.createCar(createCarDto, req.user.id)
      res.status(201).json({
        data: car,
        meta: {
          statusCode: 201,
        },
      })
    } catch (err) {
      next(err)
    }
  }

  @Get()
  async getAllCars(
    @Res() res,
    @Next() next,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<void> {
    try {
      const pageCars = await this.carsService.getAllCars(pageOptionsDto)
      res.status(200).json(pageCars)
    } catch (err) {
      next(err)
    }
  }

  @UseGuards(JwtOwnerAuthGuard)
  @Get('user/mine')
  async getMyAllCars(@Request() req, @Res() res, @Next() next): Promise<void> {
    try {
      const car = await this.carsService.getAllCarsByOwnerID(req.user.id)
      res.status(200).json({
        data: car,
        meta: {
          statusCode: 200,
        },
      })
    } catch (err) {
      next(err)
    }
  }

  @Get('user')
  async getAllCarsByOwnerID(
    @Res() res,
    @Next() next,
    @Param('id') id: string,
  ): Promise<void> {
    try {
      const car = await this.carsService.getAllCarsByOwnerID(id)
      res.status(200).json({
        data: car,
        meta: {
          statusCode: 200,
        },
      })
    } catch (err) {
      next(err)
    }
  }

  @Get()
  async getCarByID(
    @Res() res,
    @Next() next,
    @Param('id') id: string,
  ): Promise<void> {
    try {
      const car = await this.carsService.getCarByID(id)
      res.status(200).json({
        data: car,
        meta: {
          statusCode: 200,
        },
      })
    } catch (err) {
      next(err)
    }
  }

  @UseGuards(JwtOwnerAuthGuard)
  async updateCar(
    @Request() req,
    @Res() res,
    @Next() next,
    @Param('id') id: string,
    @Body()
    updateCar: UpdateCarDto,
  ): Promise<void> {
    try {
      const car = await this.carsService.updateCar(updateCar, req.user.id, id)
      res.status(200).json({
        data: car,
        meta: {
          statusCode: 200,
        },
      })
    } catch (err) {
      next(err)
    }
  }

  @UseGuards(JwtOwnerAuthGuard)
  async deleteCar(
    @Request() req,
    @Res() res,
    @Next() next,
    @Param('id') id: string,
  ): Promise<void> {
    try {
      const car = await this.carsService.deleteCarByID(req.user.id, id)
      res.status(200).json({
        data: car,
        meta: {
          statusCode: 200,
        },
      })
    } catch (err) {
      next(err)
    }
  }
}
