import type { UsersRepository } from 'src/repositories/UsersRepository'
import type { CreateUserDto } from './CreateUserDto'
import type { User } from 'src/entities/User'

export class CreateUserService {
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
