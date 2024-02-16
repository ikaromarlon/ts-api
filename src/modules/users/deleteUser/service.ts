import type { UsersRepository } from '../../../repositories/UsersRepository'

export default class DeleteUserService {
  constructor (private readonly usersRepository: UsersRepository) {}

  public async execute (id: string): Promise<boolean> {
    const result = await this.usersRepository.delete(id)

    if (!result) {
      throw new Error('User not found')
    }

    return !!result
  }
}
