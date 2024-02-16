import { type User } from '../User.entity'

export type CreateUserDto = Omit<User, 'id'>
