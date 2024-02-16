import { type AppRequest, type AppResponse, type AppController } from '../../../utils/http'
import { handleSuccess, handleError, HttpStatus } from '../../../utils/http'
import { type CreateUserData } from '../User.entity'
import type CreateUserService from './service'

export default class CreateUserController implements AppController {
  constructor (
    private readonly createUserService: CreateUserService
  ) {}

  public async handle (request: AppRequest): Promise<AppResponse> {
    try {
      const userData: CreateUserData = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
      }

      const user = await this.createUserService.execute(userData)

      return handleSuccess(user, HttpStatus.CREATED)
    } catch (e) {
      return handleError(e as Error)
    }
  }
}
