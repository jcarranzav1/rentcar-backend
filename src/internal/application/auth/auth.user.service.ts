import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { compare, hash } from 'bcrypt'
import { CreateUserDto, LoginUserDto } from 'src/internal/domain/dto/user/user'
import {
  IUserTokenResponse,
  omitPassword,
} from 'src/internal/domain/dto/user/user.response'
import { IUserRepository } from 'src/internal/domain/ports/user'
import { CreateUserToModel } from 'src/internal/infra/adapter/models/user'

export interface IUserAuthService {
  signup: (createUser: CreateUserDto) => Promise<IUserTokenResponse>
  login: (loginDTO: LoginUserDto) => Promise<IUserTokenResponse>
  validateUser: (email: string) => Promise<User>
}

@Injectable()
export class UserAuthService implements IUserAuthService {
  constructor(
    @Inject('IUserRepository') private userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<IUserTokenResponse> {
    try {
      const userEmail = await this.userRepository.getUserByEmail(
        createUserDto.email,
      )

      if (userEmail !== null) {
        throw new BadRequestException(
          'There is already an account registered with this email',
        )
      }

      if (createUserDto.terms === false) {
        throw new BadRequestException('The terms were not accepted')
      }

      if (createUserDto.confirmPassword !== createUserDto.password) {
        throw new BadRequestException(
          'Password and confirm password do not match',
        )
      }
      createUserDto.password = await hash(createUserDto.password, 10)
      const userModel = CreateUserToModel(createUserDto)
      const user = await this.userRepository.createUser(userModel)
      const token = this.jwtService.sign({ email: user.email })
      return {
        user: omitPassword(user),
        token,
      }
    } catch (err) {
      throw err
    }
  }

  async login({ email, password }: LoginUserDto): Promise<IUserTokenResponse> {
    try {
      const user = await this.userRepository.getUserByEmail(email)

      if (user === null) {
        throw new UnauthorizedException('The email or password are incorrect')
      }

      const passwordCompare = await compare(password, user.password)
      if (passwordCompare === false) {
        throw new UnauthorizedException('The email or password are incorrect')
      }

      const token = this.jwtService.sign({ email: user.email })

      return {
        user: omitPassword(user),
        token,
      }
    } catch (err) {
      throw err
    }
  }

  async validateUser(email: string): Promise<User> {
    try {
      const user = await this.userRepository.getUserByEmail(email)
      if (user === null) {
        throw new UnauthorizedException('user not exist')
      }
      return user
    } catch (err) {
      throw err
    }
  }
}
