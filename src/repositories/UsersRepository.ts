import {
  type CreateUserData,
  type FilterUserData,
  type UpdateUserData,
  type User
} from '../modules/users/User.entity'

export interface UsersRepository {
  exists: (filter: FilterUserData) => Promise<boolean>
  create: (data: CreateUserData) => Promise<User>
  update: (id: string, data: UpdateUserData) => Promise<User>
  findOne: (filter: FilterUserData) => Promise<User | null>
}
