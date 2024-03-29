import { getServer } from './infra/server'
import { getPrismaClient } from './infra/database/prisma'

async function main (): Promise<void> {
  try {
    const prisma = getPrismaClient()
    await prisma.connect()

    const server = await getServer()
    await server.start()

    console.log('App is running at', server.getAddress())
  } catch (e) {
    console.log('Something went wrong...', e)

    process.exit(1)
  }
}

void main()
