import { type FastifyInstance, type FastifyRequest, type FastifyReply } from 'fastify'
import { HttpStatus } from '../../../utils/http'

export default (fastify: FastifyInstance): void => {
  fastify.setNotFoundHandler((req: FastifyRequest, res: FastifyReply) => {
    return res
      .status(HttpStatus.NOT_FOUND)
      .send({ message: `${req.method} ${req.url} not found` })
  })
}
