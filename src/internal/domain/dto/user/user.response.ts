import { User } from '@prisma/client'

export type IUserResponse = Omit<User, 'password'>

export function omitPassword(user: User): IUserResponse {
  const { password, ...rest } = user
  return rest
}

export interface IUserTokenResponse {
  user: IUserResponse
  token: string
}
