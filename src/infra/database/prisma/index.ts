import { PrismaClient } from '@prisma/client'

let dbInstance: PrismaClient | null = null

export function getPrismaClient () {
  if (dbInstance === null) {
    dbInstance = new PrismaClient()
  }

  const connect = async () => {
    await dbInstance?.$connect()
  }

  const getInstance = (): PrismaClient => {
    return dbInstance!
  }

  const disconnect = async () => {
    await dbInstance?.$disconnect()
  }

  return {
    connect,
    getInstance,
    disconnect
  }
}
