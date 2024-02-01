import type { UsersRepository } from '../../../repositories/UsersRepository'
import type { CreateUserDto } from './dto'
import type { User } from '../../../entities/User'

export default class CreateUserService {
  constructor (
    private readonly usersRepository: UsersRepository
  ) {}

  public async execute ({ name, email, password }: CreateUserDto): Promise<User> {
    const userExists = await this.usersRepository.exists({ email })

    if (userExists) {
      throw new Error('User with provided email already exists')
    }

    const user = await this.usersRepository.create({ name, email, password })

    return user
  }
}
