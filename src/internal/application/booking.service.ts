import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Booking } from '@prisma/client'
import { CreateBookingDto } from '../domain/dto/booking'
import { IBookingRepository } from '../domain/ports/booking'
import { ICarsRepository } from '../domain/ports/cars'
import { IUserRepository } from '../domain/ports/user'
import { CreateBookingToModel } from '../infra/adapter/models/booking'
import { MercadoPagoService } from './payment/mercado-pago.service'

export interface IBookingService {
  createBooking: (createBookingDto: CreateBookingDto) => Promise<Booking>
}

@Injectable()
export class BookingService implements IBookingService {
  constructor(
    private mercadoPagoService: MercadoPagoService,
    @Inject('IBookingRepository')
    private readonly bookingRepository: IBookingRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ICarsRepository')
    private readonly carsRepository: ICarsRepository,
  ) {}

  async createBooking(createBooking: CreateBookingDto): Promise<Booking> {
    try {
      const car = await this.carsRepository.getCarByID(createBooking.carId)
      const user = await this.userRepository.getUserByID(createBooking.userId)
      if (!car) {
        throw new NotFoundException('Car not found')
      }

      const startDate = new Date(createBooking.startDate)
      const endDate = new Date(createBooking.endDate)
      const days = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
      )

      createBooking.amount = days * car.price

      const paymentSuccess = await this.mercadoPagoService.processPayment({
        amount: createBooking.amount,
        carModel: car.model,
        user: {
          email: user.email,
          name: user.name,
        },
        reservation: {
          startDate: createBooking.startDate,
          endDate: createBooking.endDate,
        },
      })

      if (!paymentSuccess) {
        throw new Error('The payment failed. Please try again!')
      }
      const bookingModel = CreateBookingToModel(createBooking)
      return await this.bookingRepository.createBooking(bookingModel)
    } catch (err) {
      throw err
    }
  }
}
