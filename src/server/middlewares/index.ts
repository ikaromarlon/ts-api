import { type FastifyInstance } from 'fastify'
import cors from './cors'
import errorHandler from './errorHandler'
import notFoundHandler from './notFoundHandler'

export async function setupMiddlewares (fastify: FastifyInstance): Promise<void> {
  await Promise.all([
    cors(fastify),
    errorHandler(fastify),
    notFoundHandler(fastify)
  ])
}
