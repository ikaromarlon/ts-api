import { type AppRoute } from '../../utils/http'
import { createUserFactory } from './createUser'

export default [
  {
    method: 'POST',
    url: '/users',
    handler: createUserFactory()
  }
] as AppRoute[]
