import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PageOptionsDto } from 'src/internal/domain/dto/pagination/pagination'
import { IUserRepository } from 'src/internal/domain/ports/user'
import { PrismaService } from '../../database/prisma.service'
import { UpdateUserModel, UserModel } from '../models/user'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(createUser: UserModel): Promise<User> {
    return await this.prisma.user.create({ data: createUser })
  }

  async updateUser(email: string, updateUser: UpdateUserModel): Promise<User> {
    return await this.prisma.user.update({
      where: {
        email,
      },
      data: updateUser,
    })
  }

  async getAllUsers({ order, take, skip }: PageOptionsDto): Promise<User[]> {
    return await this.prisma.user.findMany({
      orderBy: {
        createdAt: order,
      },
      take,
      skip,
    })
  }

  async getAllUsersCount(): Promise<number> {
    return await this.prisma.user.count()
  }

  async getUserByEmail(email: string): Promise<User> | null {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user === null) {
      return null
    }
    return user
  }

  async getUserByID(id: string): Promise<User> | null {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
    if (user === null) {
      return null
    }
    return user
  }
}
