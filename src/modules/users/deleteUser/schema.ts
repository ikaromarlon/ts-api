import { HttpStatus } from '../../../utils/http'

export default {
  summary: 'Delete an existing user',
  description: 'Delete an existing user',
  operationId: 'deleteUser',
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
  response: {
    [HttpStatus.OK]: {
      description: 'Success',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              success: {
                type: 'boolean'
              }
            }
          }
        }
      }
    }
  }
}
