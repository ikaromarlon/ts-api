import { HttpStatus } from '../../../utils/http'

export default {
  summary: 'Update an existing user',
  description: 'Update an existing user',
  operationId: 'updateUser',
  params: {
    type: 'object',
    additionalProperties: false,
    required: ['id'],
    properties: {
      id: {
        type: 'string'
      }
    }
  },
  body: {
    type: 'object',
    additionalProperties: false,
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
    [HttpStatus.OK]: {
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
