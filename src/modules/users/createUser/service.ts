import type { UsersRepository } from '../../../repositories/UsersRepository'
import type { User, CreateUserData } from '../User.entity'

export default class CreateUserService {
  constructor (
    private readonly usersRepository: UsersRepository
  ) {}

  public async execute (data: CreateUserData): Promise<User> {
    const userExists = await this.usersRepository.exists({ email: data.email })

    if (userExists) {
      throw new Error('User with email provided already exists')
    }

    const userData = {
      ...data,
      isActive: data.isActive ?? true
    }

    const user = await this.usersRepository.create(userData)

    return user
  }
}
