import { type Optional } from '../../utils/types'

export interface User {
  id: string
  name: string
  email: string
  password: string
  isActive: boolean
}

export type CreateUserData = Optional<Omit<User, 'id'>, 'isActive'>

export type UpdateUserData = Partial<CreateUserData>

export type FilterUserData = Partial<Pick<User, 'id' | 'email' | 'isActive'>>
