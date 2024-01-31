import { InMemoryUsersRepository } from 'src/repositories/inMemory/InMemoryUsersRepository'
import { CreateUserService } from './createUser/CreateUserService'
import { CreateUserController } from './createUser/CreateUserController'

export function createUserFactory (): CreateUserController {
  const usersRepository = new InMemoryUsersRepository()
  const createUserService = new CreateUserService(usersRepository)
  const createUserController = new CreateUserController(createUserService)
  return createUserController
}
