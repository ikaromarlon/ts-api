import { Server } from './server'

async function main (): Promise<void> {
  try {
    const server = await Server()
    await server.start()
  } catch (e: any) {
    console.log('App failed to start: ', e)
  }
}

void main()
