import { type CreateUserService } from './CreateUserService'
import { type CreateUserDto } from './CreateUserDto'

interface Controller {
  handle: (request: any) => Promise<any>
}

interface CreateUserRequest {
  body: CreateUserDto
}

interface ControllerResponse {
  status: number
  data: any
  headers?: any
}

export class CreateUserController implements Controller {
  constructor (
    private readonly createUserService: CreateUserService
  ) {}

  public async handle (request: CreateUserRequest): Promise<ControllerResponse> {
    try {
      const { name, email, password } = request.body

      const userData = { name, email, password }

      const user = await this.createUserService.execute(userData)

      return {
        status: 200,
        data: user
      }
    } catch (e: any) {
      return {
        status: 500,
        data: {
          message: e.message
        }
      }
    }
  }
}
