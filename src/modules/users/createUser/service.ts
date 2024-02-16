import type { UsersRepository } from '../../../repositories/UsersRepository'
import type { User, CreateUserData } from '../User.entity'

export default class CreateUserService {
  constructor (
    private readonly usersRepository: UsersRepository
  ) {}

  public async execute (data: CreateUserData): Promise<User> {
    const userExists = await this.usersRepository.exists({ email: data.email })

    if (userExists) {
      throw new Error('User with provided email already exists')
    }

    const user = await this.usersRepository.create(data)

    return user
  }
}
