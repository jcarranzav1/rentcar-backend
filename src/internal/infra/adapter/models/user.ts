import { CreateUserDto, UpdateUserDto } from 'src/internal/domain/dto/user/user'

export interface UserModel {
  name: string
  lastname: string
  email: string
  password: string
  cellphone?: string
  country?: string
  state?: string
  about?: string
  photo?: string
}

export type UpdateUserModel = Partial<UserModel>

export function CreateUserToModel(createUser: CreateUserDto): UserModel {
  return {
    name: createUser.name,
    lastname: createUser.lastname,
    email: createUser.email,
    password: createUser.password,
  }
}

export function UpdateUserToModel(updateUser: UpdateUserDto): UpdateUserModel {
  return {
    name: updateUser.name,
    lastname: updateUser.lastname,
    cellphone: updateUser.cellphone,
    state: updateUser.state,
    country: updateUser.country,
    about: updateUser.about,
    photo: updateUser.photo,
  }
}
