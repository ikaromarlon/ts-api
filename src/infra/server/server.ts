import Fastify, { type FastifyInstance } from 'fastify'
import { setupErrorHandlers } from './errors'
import { setupMiddlewares } from './middlewares'
import { setupPlugins } from './plugins'
import { setupRoutes } from './router'

let srvInstance: FastifyInstance | null = null

export async function getServer () {
  if (srvInstance === null) {
    srvInstance = Fastify()
    setupErrorHandlers(srvInstance)
    await setupMiddlewares(srvInstance)
    await setupPlugins(srvInstance)
    await setupRoutes(srvInstance)
  }

  const start = async () => {
    await srvInstance?.listen({ port: 3000 })
  }

  const getAddress = () => {
    const [{ address, port }] = srvInstance?.addresses() ?? [{}]
    return `http://${address}:${port}`
  }

  const shutDown = async () => {
    await srvInstance?.close()
  }

  return {
    start,
    getAddress,
    shutDown
  }
}
