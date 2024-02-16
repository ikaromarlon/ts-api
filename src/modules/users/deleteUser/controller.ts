import { type AppRequest, type AppResponse, type AppController } from '../../../utils/http'
import { handleSuccess, handleError } from '../../../utils/http'
import type DeleteUserService from './service'

export default class DeleteUserController implements AppController {
  constructor (private readonly deleteUserService: DeleteUserService) {}

  public async handle (request: AppRequest): Promise<AppResponse> {
    try {
      const id: string = request.params.id

      const result = await this.deleteUserService.execute(id)

      return handleSuccess({ success: result })
    } catch (e) {
      return handleError(e as Error)
    }
  }
}
