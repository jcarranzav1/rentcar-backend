import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Cars } from '@prisma/client'
import { CreateCarDto, UpdateCarDto } from '../domain/dto/cars/cars'
import {
  PageOptionsDto,
  paginationParams,
} from '../domain/dto/pagination/pagination'
import { PageDto } from '../domain/dto/pagination/paginationResponse'
import { ICarsRepository } from '../domain/ports/cars'
import { CreateCarsToModel } from '../infra/adapter/models/cars'

export interface ICarsService {
  createCar: (createCarDto: CreateCarDto, ownerId: string) => Promise<Cars>
  updateCar: (
    updateCar: UpdateCarDto,
    ownerId: string,
    carID: string,
  ) => Promise<Cars>

  getCarByID: (carID: string) => Promise<Cars>

  getAllCars: (pageOptionsDto: PageOptionsDto) => Promise<PageDto<Cars>>
  getAllCarsByOwnerID: (ownerID: string) => Promise<Cars[]>
  deleteCarByID: (ownerId: string, carID: string) => Promise<Cars>
}

@Injectable()
export class CarsService implements ICarsService {
  constructor(
    @Inject('ICarsRepository')
    private readonly carsRepository: ICarsRepository,
  ) {}

  async createCar(createCarDto: CreateCarDto, ownerId: string): Promise<Cars> {
    try {
      const carModel = CreateCarsToModel(createCarDto, ownerId)
      return this.carsRepository.createCar(carModel)
    } catch (err) {
      throw err
    }
  }

  async updateCar(
    updateCar: UpdateCarDto,
    ownerID: string,
    carID: string,
  ): Promise<Cars> {
    try {
      const car = await this.carsRepository.getCarByID(carID)
      if (car === null) {
        throw new NotFoundException('Car not found')
      }

      if (car.ownerId !== ownerID) {
        throw new ForbiddenException('You are not allowed to update this car')
      }

      return await this.carsRepository.updateCarByID(updateCar, carID)
    } catch (err) {
      throw err
    }
  }

  async getAllCars(pageOptionsDto: PageOptionsDto): Promise<PageDto<Cars>> {
    try {
      const [cars, totalCars] = await Promise.all([
        this.carsRepository.getAllCars(pageOptionsDto),
        this.carsRepository.getAllCarsCount(),
      ])

      const pageMeta = paginationParams(pageOptionsDto, totalCars)

      return {
        data: cars,
        meta: pageMeta,
      }
    } catch (err) {
      throw err
    }
  }

  async getAllCarsByOwnerID(ownerID: string): Promise<Cars[]> {
    try {
      return await this.carsRepository.getAllCarsByOwnerID(ownerID)
    } catch (err) {
      throw err
    }
  }

  async getCarByID(carID: string): Promise<Cars> {
    try {
      const car = await this.carsRepository.getCarByID(carID)
      if (car === null) {
        throw new NotFoundException('Car not found')
      }
      return car
    } catch (err) {
      throw err
    }
  }

  async deleteCarByID(ownerID: string, carID: string): Promise<Cars> {
    try {
      const car = await this.carsRepository.getCarByID(carID)
      if (car === null) {
        throw new NotFoundException('Car not found')
      }

      if (car.ownerId !== ownerID) {
        throw new ForbiddenException('You are not allowed to delete this car')
      }

      return await this.carsRepository.deleteCarByID(carID)
    } catch (err) {
      throw err
    }
  }
}
