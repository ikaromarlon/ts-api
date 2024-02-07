import fs from 'node:fs'
import { type FastifyInstance } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import swaggerOptions from '../../../../docs/swagger/swagger.json'

export default async (fastify: FastifyInstance) => {
  await fastify.register(fastifySwagger, swaggerOptions)

  await fastify.register(fastifySwaggerUi, {
    routePrefix: 'docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true
    },
    logo: {
      type: 'image/svg+xml',
      content: fs.readFileSync('./docs/assets/logo.svg')
    },
    theme: {
      favicon: [
        {
          filename: 'logo.svg',
          rel: 'icon',
          sizes: '16x16',
          type: 'image/svg+xml',
          content: fs.readFileSync('./docs/assets/logo.svg')
        }
      ]
    }
  })
}
