import { type User } from '../modules/users/user.entity'

export type CreateUserData = Omit<User, 'id'>

export type FilterUserData = Partial<User>

export interface UsersRepository {
  create: (data: CreateUserData) => Promise<User>
  exists: (filter: FilterUserData) => Promise<boolean>
}
