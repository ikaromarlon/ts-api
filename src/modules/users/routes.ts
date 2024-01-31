import { type AppRoute } from '../../utils/http'
import { createUserFactory } from './createUser'

export const userRoutes: AppRoute[] = [{
  method: 'POST',
  url: '/users',
  handler: createUserFactory()
}]
