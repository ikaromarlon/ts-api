import { HttpStatus } from '../../../utils/http'

export default {
  summary: 'Create a new user',
  description: 'Create a new user',
  operationId: 'createUser',
  security: [{
    jwt: []
  }],
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['name', 'email', 'password'],
    properties: {
      name: {
        type: 'string'
      },
      email: {
        type: 'string',
        format: 'email'
      },
      password: {
        type: 'string',
        format: 'password'
      }
    }
  },
  response: {
    [HttpStatus.CREATED]: {
      description: 'Created successfully',
      content: {
        'application/json': {
          schema: {}
        }
      }
    }
  }
}
