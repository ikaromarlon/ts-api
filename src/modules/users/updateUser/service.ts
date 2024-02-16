import type { UsersRepository } from '../../../repositories/UsersRepository'
import type { User, UpdateUserData } from '../User.entity'

export default class UpdateUserService {
  constructor (
    private readonly usersRepository: UsersRepository
  ) {}

  public async execute (id: string, data: UpdateUserData): Promise<User> {
    if (data.email) {
      const existingUser = await this.usersRepository.findOne({ email: data.email })

      if (existingUser && existingUser.id !== id) {
        throw new Error('There is another user using the email provided')
      }
    }

    const user = await this.usersRepository.update(id, data)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }
}
