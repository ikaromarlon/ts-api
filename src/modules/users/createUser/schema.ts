import { HttpStatus } from '../../../utils/http'

export default {
  summary: 'Create a new user',
  description: 'Create a new user',
  operationId: 'createUser',
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
      },
      isActive: {
        type: 'boolean'
      }
    }
  },
  response: {
    [HttpStatus.CREATED]: {
      description: 'Success',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              id: {
                type: 'string'
              },
              name: {
                type: 'string'
              },
              email: {
                type: 'string',
                format: 'email'
              },
              isActive: {
                type: 'boolean'
              }
            }
          }
        }
      }
    }
  }
}
