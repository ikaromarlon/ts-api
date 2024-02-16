import { type AppRoute } from '../../utils/http'
import { createUserFactory, createUserRequestSchema } from './createUser'
import { updateUserFactory, updateUserRequestSchema } from './updateUser'
import { deleteUserFactory, deleteUserRequestSchema } from './deleteUser'

export default [
  {
    method: 'POST',
    url: '/users',
    handler: createUserFactory(),
    schema: createUserRequestSchema
  },
  {
    method: 'PUT',
    url: '/users/:id',
    handler: updateUserFactory(),
    schema: updateUserRequestSchema
  },
  {
    method: 'DELETE',
    url: '/users/:id',
    handler: deleteUserFactory(),
    schema: deleteUserRequestSchema
  }
] as AppRoute[]
