import { Server } from './server'

async function main (): Promise<void> {
  try {
    const server = await Server()
    await server.start()
    console.log(`App is running at ${server.getAddress()}`)
  } catch (e: any) {
    console.log('App failed to start: ', e)
  }
}

void main()
