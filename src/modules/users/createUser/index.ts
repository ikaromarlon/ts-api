import CreateUserController from './controller'
import CreateUserService from './service'
import PrismaUsersRepository from '../../../repositories/prisma/PrismaUsersRepository'

export { default as createUserRequestSchema } from './schema'

export function createUserFactory (): CreateUserController {
  const prismaUsersRepository = new PrismaUsersRepository()
  const createUserService = new CreateUserService(prismaUsersRepository)
  const createUserController = new CreateUserController(createUserService)
  return createUserController
}
