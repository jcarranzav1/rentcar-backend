import {
  Body,
  Controller,
  Inject,
  Next,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common'
import { JwtUserAuthGuard } from 'src/internal/application/auth/guards/jwt-auth.guard'
import { IBookingService } from 'src/internal/application/booking.service'
import { CreateBookingDto } from 'src/internal/domain/dto/booking'

@Controller('booking')
export class BookingController {
  constructor(
    @Inject('IBookingService') private readonly bookingService: IBookingService,
  ) {}

  @UseGuards(JwtUserAuthGuard)
  @Post()
  async createBooking(
    @Request() req,
    @Res() res,
    @Next() next,
    @Body()
    createBooking: CreateBookingDto,
  ): Promise<void> {
    try {
      createBooking.userId = req.user.id
      const booking = await this.bookingService.createBooking(createBooking)
      res.status(201).json({
        data: booking,
        meta: {
          statusCode: 201,
        },
      })
    } catch (err) {
      next(err)
    }
  }
}
