import { CreateBookingDto } from 'src/internal/domain/dto/booking'

export class BookingModel {
  carId: string
  userId: string
  startDate: Date
  amount: number
  endDate: Date
}

export function CreateBookingToModel(
  createBooking: CreateBookingDto,
): BookingModel {
  return {
    carId: createBooking.carId,
    userId: createBooking.userId,
    startDate: createBooking.startDate,
    endDate: createBooking.endDate,
    amount: createBooking.amount,
  }
}
