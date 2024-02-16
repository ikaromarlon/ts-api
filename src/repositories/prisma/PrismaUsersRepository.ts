import { getPrismaClient } from '../../infra/database/prisma'
import { type PrismaClient } from '@prisma/client'
import { type User, type FilterUserData, type CreateUserData, type UpdateUserData } from '../../modules/users/User.entity'
import { type UsersRepository } from '../UsersRepository'

export default class PrismaUsersRepository implements UsersRepository {
  private readonly db: PrismaClient

  constructor () {
    this.db = getPrismaClient().getInstance()
  }

  async exists (filter: FilterUserData): Promise<boolean> {
    const count = await this.db.user.count({ where: filter })
    return count > 0
  }

  async create (data: CreateUserData): Promise<User> {
    const user = await this.db.user.create({ data })
    return user
  }

  async update (id: string, data: UpdateUserData): Promise<User> {
    const user = await this.db.user.update({ where: { id }, data })
    return user
  }

  async findOne (filter: FilterUserData): Promise<User | null> {
    const user = await this.db.user.findFirst({ where: filter })
    return user
  }

  async delete (id: string): Promise<User | null> {
    try {
      const user = await this.db.user.delete({ where: { id } })
      return user
    } catch (e: any) {
      if (e.code === 'P2025') return null
      throw e
    }
  }
}
