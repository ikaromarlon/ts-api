import Fastify, { type FastifyInstance } from 'fastify'
import { setupMiddlewares } from './middlewares'
import { setupRoutes } from './router'

let srvInstance: FastifyInstance | null = null

export async function Server () {
  if (srvInstance === null) {
    srvInstance = Fastify({ logger: true })
    await setupMiddlewares(srvInstance)
    await setupRoutes(srvInstance)
  }

  return {
    start: async () => {
      await srvInstance?.listen({ port: 3000 })
    },
    getAddress: () => {
      if (srvInstance === null) throw new Error('Server is not started')
      const [{ address, port }] = srvInstance.addresses()
      return `${address}:${port}/api`
    },
    shutDown: async () => {
      await srvInstance?.close()
      srvInstance = null
    }
  }
}
