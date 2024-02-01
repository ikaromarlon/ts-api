import { type FastifyInstance, type FastifyRequest, type FastifyReply } from 'fastify'
import { HttpStatus } from '../../../utils/http'

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.setNotFoundHandler((req: FastifyRequest, res: FastifyReply) => {
    return res
      .status(HttpStatus.NOT_FOUND)
      .send({ message: `${req.method} ${req.url} not found` })
  })
}
