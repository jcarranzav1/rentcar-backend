import { Booking } from '@prisma/client'
import { BookingModel } from 'src/internal/infra/adapter/models/booking'

export interface IBookingRepository {
  createBooking: (booking: BookingModel) => Promise<Booking>
}
