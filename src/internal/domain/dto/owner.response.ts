import { Owner } from '@prisma/client'

export type IOwnerResponse = Omit<Owner, 'password'>

export function omitPassword(owner: Owner): IOwnerResponse {
  const { password, ...rest } = owner
  return rest
}

export interface IOwnerTokenResponse {
  owner: IOwnerResponse
  token: string
}
