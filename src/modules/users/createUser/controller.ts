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

  public async handle ({ body }: AppRequest): Promise<AppResponse> {
    try {
      const userData = {
        name: body.name,
        email: body.email,
        password: body.password
      }

      const { password, ...user } = await this.createUserService.execute(userData)

      return handleSucess(user, HttpStatus.CREATED)
    } catch (e) {
      return handleError(e as Error)
    }
  }
}
