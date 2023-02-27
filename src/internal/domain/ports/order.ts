import { Booking } from '@prisma/client'
import { BookingModel } from 'src/internal/infra/adapter/models/booking'

export interface IOrderRepository {
  createBooking: (booking: BookingModel) => Promise<Booking>
}
