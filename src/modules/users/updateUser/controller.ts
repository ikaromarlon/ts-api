import { type AppRequest, type AppResponse, type AppController } from '../../../utils/http'
import { handleSuccess, handleError, HttpStatus } from '../../../utils/http'
import type { UpdateUserData } from '../User.entity'
import type UpdateUserService from './service'

export default class UpdateUserController implements AppController {
  constructor (
    private readonly updateUserService: UpdateUserService
  ) {}

  public async handle (request: AppRequest): Promise<AppResponse> {
    try {
      const id: string = request.params.id

      const userData: UpdateUserData = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
      }

      const { password, ...user } = await this.updateUserService.execute(id, userData)

      return handleSuccess(user, HttpStatus.OK)
    } catch (e) {
      return handleError(e as Error)
    }
  }
}