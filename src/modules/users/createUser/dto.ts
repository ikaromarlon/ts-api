import { type User } from '../../../entities/User'

export type CreateUserDto = Omit<User, 'id'>
