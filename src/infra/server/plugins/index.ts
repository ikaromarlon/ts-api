import { type FastifyInstance } from 'fastify'
import swagger from './swagger'

export async function setupPlugins (fastify: FastifyInstance): Promise<void> {
  await Promise.all([
    swagger(fastify)
  ])
}
