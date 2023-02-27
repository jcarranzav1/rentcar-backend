import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export enum PaymentStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  carId: string

  @IsOptional()
  userId?: string

  @IsNumber()
  @IsOptional()
  amount?: number

  @IsDateString()
  @IsNotEmpty()
  startDate: Date

  @IsDateString()
  @IsNotEmpty()
  endDate: Date
}
