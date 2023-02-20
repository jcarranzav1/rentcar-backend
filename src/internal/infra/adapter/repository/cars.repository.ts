import { Injectable } from '@nestjs/common'
import { Cars, Prisma } from '@prisma/client'
import { PageOptionsDto } from 'src/internal/domain/dto/pagination/pagination'
import { ICarsRepository } from 'src/internal/domain/ports/cars'
import { PrismaService } from '../../database/prisma.service'
import { CarsModel, UpdateCarsModel } from '../models/cars'

@Injectable()
export class CarsRepository implements ICarsRepository {
  constructor(private prisma: PrismaService) {}

  async createCar(createCar: CarsModel): Promise<Cars> {
    return await this.prisma.cars.create({
      data: createCar,
      include: {
        owner: true,
      },
    })
  }

  async getAllCars({ order, take, skip }: PageOptionsDto): Promise<Cars[]> {
    return await this.prisma.cars.findMany({
      orderBy: {
        createdAt: order,
      },
      take,
      skip,
      include: {
        owner: true,
      },
    })
  }

  async getAllCarsByOwnerID(ownerId: string): Promise<Cars[]> {
    return await this.prisma.cars.findMany({
      where: {
        ownerId,
      },
    })
  }

  async getAllCarsCount(ownerID?: string): Promise<number> {
    const where: Prisma.CarsWhereInput = {}
    if (ownerID !== null) {
      where.id = ownerID
    }

    return await this.prisma.cars.count({
      where,
    })
  }

  async updateCarByID(
    updateCar: UpdateCarsModel,
    carID: string,
  ): Promise<Cars> {
    return await this.prisma.cars.update({
      data: updateCar,
      where: {
        id: carID,
      },
    })
  }

  async deleteCarByID(carID: string): Promise<Cars> {
    return await this.prisma.cars.delete({
      where: {
        id: carID,
      },
    })
  }

  async getCarByID(carID: string): Promise<Cars> {
    return await this.prisma.cars.findUnique({
      where: {
        id: carID,
      },
    })
  }
}
