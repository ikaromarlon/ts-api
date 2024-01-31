import { type User } from 'src/entities/User'

export type CreateUserData = Omit<User, 'id'>

export type FilterUserData = Partial<User>

export interface UsersRepository {
  create: (data: CreateUserData) => Promise<User>
  exists: (filter: FilterUserData) => Promise<boolean>
}
