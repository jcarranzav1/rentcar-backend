import {
  CreateOwnerDto,
  UpdateOwnerDto,
} from 'src/internal/domain/dto/owner/owner'

export interface CreateOwnerModel {
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

export type UpdateOwnerModel = Partial<CreateOwnerModel>

export function CreateOwnerToModel(
  createOwner: CreateOwnerDto,
): CreateOwnerModel {
  return {
    name: createOwner.name,
    lastname: createOwner.lastname,
    email: createOwner.email,
    password: createOwner.password,
  }
}

export function UpdateOwnerToModel(
  updateOwner: UpdateOwnerDto,
): UpdateOwnerModel {
  return {
    name: updateOwner.name,
    lastname: updateOwner.lastname,
    cellphone: updateOwner.cellphone,
    state: updateOwner.state,
    country: updateOwner.country,
    about: updateOwner.about,
    photo: updateOwner.photo,
  }
}
