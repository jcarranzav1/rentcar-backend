import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { PageOptionsDto, paginationParams } from '../domain/dto/pagination'
import { PageDto } from '../domain/dto/paginationResponse'
import { UpdateUserDto } from '../domain/dto/user'
import { IUserResponse, omitPassword } from '../domain/dto/user.response'
import { IUserRepository } from '../domain/ports/user'

export interface IUserService {
  getAllUsers: (
    pageOptionsDto: PageOptionsDto,
  ) => Promise<PageDto<IUserResponse>>

  getUserByID: (id: string) => Promise<IUserResponse>

  updateUser: (
    email: string,
    updateUserDto: UpdateUserDto,
  ) => Promise<IUserResponse>
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async getAllUsers(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<IUserResponse>> {
    try {
      const [users, totalUsers] = await Promise.all([
        this.userRepository.getAllUsers(pageOptionsDto),
        this.userRepository.getAllUsersCount(),
      ])
      const usersWithoutPassowrd = users.map((user) => omitPassword(user))
      const pageMeta = paginationParams(pageOptionsDto, totalUsers)

      return {
        data: usersWithoutPassowrd,
        meta: pageMeta,
      }
    } catch (err) {
      throw err
    }
  }
  async getUserByID(id: string): Promise<IUserResponse> {
    try {
      const user = await this.userRepository.getUserByID(id)
      if (user === null) {
        throw new NotFoundException('The user not exist')
      }

      return omitPassword(user)
    } catch (err) {
      throw err
    }
  }

  async updateUser(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUserResponse> {
    try {
      const user = await this.userRepository.updateUser(email, updateUserDto)
      return omitPassword(user)
    } catch (err) {
      throw err
    }
  }
}
