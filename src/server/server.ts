import Fastify, { type FastifyInstance } from 'fastify'
import { setupMiddlewares } from './middlewares'
import { setupRoutes } from './router'

interface ServerInstance {
  instance: FastifyInstance | null
  start: () => Promise<void>
}

const server: ServerInstance = {
  instance: null,
  start: async () => {}
}

export async function Server (): Promise<ServerInstance> {
  if (server.instance !== null) return server

  server.instance = Fastify({ logger: true })

  await setupMiddlewares(server.instance)
  await setupRoutes(server.instance)

  server.start = async () => {
    const address = await server.instance?.listen({ port: 3000 })
    console.log(`App is running at ${address}/api`)
  }

  return server
}
