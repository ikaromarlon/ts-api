import {
  type AppRequest,
  type AppResponse,
  type AppController,
  handleSucess, handleError,
  HttpStatus
} from '../../../utils/http'
import type CreateUserService from './service'

export default class CreateUserController implements AppController {
  constructor (
    private readonly createUserService: CreateUserService
  ) {}

  public async handle (request: AppRequest): Promise<AppResponse> {
    try {
      const { name, email, password } = request.body

      const userData = { name, email, password }

      const user = await this.createUserService.execute(userData)

      return handleSucess(user, HttpStatus.CREATED)
    } catch (e) {
      return handleError(e as Error)
    }
  }
}
