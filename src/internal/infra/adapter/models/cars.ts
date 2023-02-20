import { CreateCarDto, UpdateCarDto } from 'src/internal/domain/dto/cars/cars'

export interface CarsModel {
  model: string
  price: number
  type: string
  make: string
  seats: string
  doors?: string
  description?: string
  isRented?: boolean
  photos?: string[]
  ownerId: string
}
export type UpdateCarsModel = Partial<Omit<CarsModel, 'ownerId'>>

export function CreateCarsToModel(
  createCars: CreateCarDto,
  ownerId: string,
): CarsModel {
  return {
    model: createCars.model,
    price: createCars.price,
    type: createCars.type,
    make: createCars.make,
    seats: createCars.seats,
    doors: createCars.doors,
    description: createCars.description,
    photos: createCars.photos,
    ownerId,
  }
}

export function UpdateOwnerToModel(updateCar: UpdateCarDto): UpdateCarsModel {
  return {
    model: updateCar.model,
    price: updateCar.price,
    type: updateCar.type,
    make: updateCar.make,
    seats: updateCar.seats,
    doors: updateCar.doors,
    description: updateCar.description,
    photos: updateCar.photos,
    isRented: updateCar.isRented,
  }
}
