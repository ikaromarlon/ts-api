import { type FastifyInstance } from 'fastify'
import errorHandler from './errorHandler'
import notFoundHandler from './notFoundHandler'

export function setupErrorHandlers (fastify: FastifyInstance): void {
  errorHandler(fastify)
  notFoundHandler(fastify)
}
