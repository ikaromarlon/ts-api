import { type FastifyInstance } from 'fastify'
import cors from './cors'

export async function setupMiddlewares (fastify: FastifyInstance): Promise<void> {
  await Promise.all([
    cors(fastify)
  ])
}
