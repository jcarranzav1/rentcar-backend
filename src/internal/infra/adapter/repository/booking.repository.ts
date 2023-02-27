import { Injectable } from '@nestjs/common'
import { Booking } from '@prisma/client'
import { IBookingRepository } from 'src/internal/domain/ports/booking'
import { PrismaService } from '../../database/prisma.service'
import { BookingModel } from '../models/booking'

@Injectable()
export class BookingRepository implements IBookingRepository {
  constructor(private prisma: PrismaService) {}

  async createBooking(createBooking: BookingModel): Promise<Booking> {
    return await this.prisma.booking.create({
      data: createBooking,
      include: {
        user: true,
      },
    })
  }
}
