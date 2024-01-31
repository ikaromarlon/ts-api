import CreateUserController from './controller'
import CreateUserService from './service'
import { InMemoryUsersRepository } from '../../../repositories/inMemory/InMemoryUsersRepository'

export function createUserFactory (): CreateUserController {
  const usersRepository = new InMemoryUsersRepository()
  const createUserService = new CreateUserService(usersRepository)
  const createUserController = new CreateUserController(createUserService)
  return createUserController
}
