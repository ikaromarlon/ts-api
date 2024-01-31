import { type FastifyInstance } from 'fastify'
import fastifyCors from '@fastify/cors'

export default async (fastify: FastifyInstance): Promise<void> => {
  await fastify.register(fastifyCors, { origin: '*' })
}
