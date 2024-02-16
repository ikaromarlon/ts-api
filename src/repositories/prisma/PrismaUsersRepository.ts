import { getPrismaClient } from '../../infra/database/prisma'
import { type PrismaClient } from '@prisma/client'
import { type User } from '../../modules/users/User.entity'
import { type FilterUserData, type CreateUserData, type UsersRepository } from '../UsersRepository'

export default class PrismaUsersRepository implements UsersRepository {
  private readonly db: PrismaClient

  constructor () {
    this.db = getPrismaClient().getInstance()
  }

  async create (data: CreateUserData): Promise<User> {
    const user = await this.db.user.create({ data })
    return user
  }

  async exists (filter: FilterUserData): Promise<boolean> {
    const count = await this.db.user.count({
      where: { email: filter.email }
    })
    return count > 0
  }
}
