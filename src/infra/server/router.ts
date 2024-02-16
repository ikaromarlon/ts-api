import { type FastifyReply, type FastifyRequest, type FastifyInstance } from 'fastify'
import { type HttpHeader } from 'fastify/types/utils'
import { type AppRoute, type AppController, type AppRequest } from '../../utils/http'
import routes from '../../routes'

function adaptRequest (controller: AppController) {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const request = {
      headers: req.headers,
      query: req.query,
      params: req.params,
      body: req.body
    }

    const { status, headers, data } = await controller.handle(request as AppRequest)

    return await res
      .status(status)
      .headers(headers as Partial<Record<HttpHeader, any>>)
      .send(data)
  }
}

export async function setupRoutes (fastify: FastifyInstance): Promise<void> {
  await fastify.register(async (fastify) => {
    routes.forEach((route: AppRoute) => fastify.route({
      ...route,
      handler: adaptRequest(route.handler)
    }))
  }, { prefix: '/api' })
}
