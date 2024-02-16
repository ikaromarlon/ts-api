import DeleteUserController from './controller'
import DeleteUserService from './service'
import PrismaUsersRepository from '../../../repositories/prisma/PrismaUsersRepository'

export { default as deleteUserRequestSchema } from './schema'

export function deleteUserFactory (): DeleteUserController {
  const prismaUsersRepository = new PrismaUsersRepository()
  const deleteUserService = new DeleteUserService(prismaUsersRepository)
  const deleteUserController = new DeleteUserController(deleteUserService)
  return deleteUserController
}
