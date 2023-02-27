import { PartialType } from '@nestjs/mapped-types'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'

export class CreateOwnerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly lastname: string

  @IsEmail()
  readonly email: string

  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9!@#\$%\^&\*]+$/)
  @MinLength(6)
  password: string

  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9!@#\$%\^&\*]+$/)
  @MinLength(6)
  readonly confirmPassword: string

  @IsBoolean()
  @IsNotEmpty()
  readonly terms: boolean

  @IsOptional()
  @IsString()
  @Matches(/^\+(?:[0-9]●?){6,14}[0-9]$/)
  cellphone: string

  @IsOptional()
  @IsString()
  country: string

  @IsOptional()
  @IsString()
  state: string

  @IsOptional()
  @IsString()
  about: string

  @IsOptional()
  @IsString()
  photo: string
}

export class LoginOwnerDto {
  @IsEmail()
  readonly email: string

  @IsString()
  password: string
}

export class UpdateOwnerDto extends PartialType(CreateOwnerDto) {}
