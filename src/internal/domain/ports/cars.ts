import { Cars } from '@prisma/client'
import {
  CarsModel,
  UpdateCarsModel,
} from 'src/internal/infra/adapter/models/cars'
import { PageOptionsDto } from '../dto/pagination'

export interface ICarsRepository {
  createCar: (cars: CarsModel) => Promise<Cars>
  updateCarByID: (updateCar: UpdateCarsModel, carID: string) => Promise<Cars>
  getCarByID: (carID: string) => Promise<Cars> | null
  getAllCars: (pageOptionsDto: PageOptionsDto) => Promise<Cars[]>
  getAllCarsByOwnerID: (ownerID: string) => Promise<Cars[]>
  getAllCarsCount: (ownerID?: string) => Promise<number>
  deleteCarByID: (carID: string) => Promise<Cars>
}
