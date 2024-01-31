import { type AppRoute } from '../../utils/http'
import { createUserFactory, createUserRequestSchema } from './createUser'

export default [
  {
    method: 'POST',
    url: '/users',
    handler: createUserFactory(),
    schema: createUserRequestSchema
  }
] as AppRoute[]
