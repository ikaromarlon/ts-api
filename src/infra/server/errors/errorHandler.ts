import { type FastifyError, type FastifyInstance, type FastifyReply } from 'fastify'
import { HttpStatus } from '../../../utils/http'

export default (fastify: FastifyInstance): void => {
  fastify.setErrorHandler((error: FastifyError, _, res: FastifyReply) => {
    return res
      .status(error.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message })
  })
}
