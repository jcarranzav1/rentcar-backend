import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Owner } from '@prisma/client'
import { compare, hash } from 'bcrypt'
import {
  CreateOwnerDto,
  LoginOwnerDto,
} from 'src/internal/domain/dto/owner/owner'
import {
  IOwnerTokenResponse,
  omitPassword,
} from 'src/internal/domain/dto/owner/owner.response'
import { IOwnerRepository } from 'src/internal/domain/ports/owner'
import { CreateOwnerToModel } from 'src/internal/infra/adapter/models/owner'

export interface IOwnerAuthService {
  signup: (createOwner: CreateOwnerDto) => Promise<IOwnerTokenResponse>
  login: (loginDTO: LoginOwnerDto) => Promise<IOwnerTokenResponse>
  validateOwner: (email: string) => Promise<Owner>
}

@Injectable()
export class OwnerAuthService implements IOwnerAuthService {
  constructor(
    @Inject('IOwnerRepository') private ownerRepository: IOwnerRepository,
    private jwtService: JwtService,
  ) {}

  async signup(createOwnerDto: CreateOwnerDto): Promise<IOwnerTokenResponse> {
    try {
      const ownerEmail = await this.ownerRepository.getOwnerByEmail(
        createOwnerDto.email,
      )

      if (ownerEmail !== null) {
        throw new BadRequestException(
          'There is already an account registered with this email',
        )
      }

      if (createOwnerDto.terms === false) {
        throw new BadRequestException('The terms were not accepted')
      }

      if (createOwnerDto.confirmPassword !== createOwnerDto.password) {
        throw new BadRequestException(
          'Password and confirm password do not match',
        )
      }
      createOwnerDto.password = await hash(createOwnerDto.password, 10)
      const ownerModel = CreateOwnerToModel(createOwnerDto)
      const owner = await this.ownerRepository.createOwner(ownerModel)
      const token = this.jwtService.sign({ email: owner.email })
      return {
        owner: omitPassword(owner),
        token,
      }
    } catch (err) {
      throw err
    }
  }

  async login({
    email,
    password,
  }: LoginOwnerDto): Promise<IOwnerTokenResponse> {
    try {
      const owner = await this.ownerRepository.getOwnerByEmail(email)

      if (owner === null) {
        throw new UnauthorizedException('The email or password are incorrect')
      }

      const passwordCompare = await compare(password, owner.password)
      if (passwordCompare === false) {
        throw new UnauthorizedException('The email or password are incorrect')
      }

      const token = this.jwtService.sign({ email: owner.email })

      return {
        owner: omitPassword(owner),
        token,
      }
    } catch (err) {
      throw err
    }
  }

  async validateOwner(email: string): Promise<Owner> {
    try {
      const owner = await this.ownerRepository.getOwnerByEmail(email)
      if (owner === null) {
        throw new UnauthorizedException('This account not exist')
      }
      return owner
    } catch (err) {
      throw err
    }
  }
}
