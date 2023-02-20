import { User } from '@prisma/client'
import {
  UpdateUserModel,
  UserModel,
} from 'src/internal/infra/adapter/models/user'
import { PageOptionsDto } from '../dto/pagination/pagination'

export interface IUserRepository {
  createUser: (user: UserModel) => Promise<User>
  getAllUsers: (pageOptionsDto: PageOptionsDto) => Promise<User[]>
  getAllUsersCount: () => Promise<number>
  getUserByEmail: (email: string) => Promise<User> | null
  getUserByID: (id: string) => Promise<User> | null
  updateUser: (email: string, user: UpdateUserModel) => Promise<User>
}
