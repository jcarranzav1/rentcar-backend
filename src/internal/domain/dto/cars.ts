import { PartialType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  readonly model: string

  @IsNumber()
  @IsNotEmpty()
  readonly price: number

  @IsString()
  @IsNotEmpty()
  readonly type: string

  @IsString()
  @IsNotEmpty()
  readonly make: string

  @IsString()
  @IsNotEmpty()
  readonly seats: string

  @IsOptional()
  @IsString()
  readonly doors: string

  @IsOptional()
  @IsString()
  readonly description: string

  @IsOptional()
  @IsString({ each: true })
  @Type(() => String)
  @IsArray()
  readonly photos: string[]
}

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @IsOptional()
  @IsBoolean()
  isRented: boolean
}
