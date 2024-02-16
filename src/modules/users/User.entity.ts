export interface User {
  id: string
  name: string
  email: string
  password: string
}

export type CreateUserData = Omit<User, 'id'>

export type UpdateUserData = Partial<CreateUserData>

export type FilterUserData = Partial<User>
