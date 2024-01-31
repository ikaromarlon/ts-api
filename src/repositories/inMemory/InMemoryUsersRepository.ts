import { randomUUID } from 'node:crypto'
import { type User } from 'src/entities/User'
import { type FilterUserData, type CreateUserData, type UsersRepository } from 'src/repositories/UsersRepository'

export class InMemoryUsersRepository implements UsersRepository {
  private readonly items: User[] = []

  async create (data: CreateUserData): Promise<any> {
    const user = { id: randomUUID(), ...data }
    this.items.push(user)
    return user
  }

  async exists (filter: FilterUserData): Promise<boolean> {
    return this.items.some(i => i.email === filter.email)
  }
}
