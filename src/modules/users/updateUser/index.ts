import UpdateUserController from './controller'
import UpdateUserService from './service'
import PrismaUsersRepository from '../../../repositories/prisma/PrismaUsersRepository'

export { default as updateUserRequestSchema } from './schema'

export function updateUserFactory (): UpdateUserController {
  const prismaUsersRepository = new PrismaUsersRepository()
  const updateUserService = new UpdateUserService(prismaUsersRepository)
  const updateUserController = new UpdateUserController(updateUserService)
  return updateUserController
}
