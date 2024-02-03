import { getServer } from './infra/server'

async function main (): Promise<void> {
  try {
    const server = await getServer()
    await server.start()
    console.log(`App is running at ${server.getAddress()}`)
  } catch (e: any) {
    console.log('App failed to start: ', e)
  }
}

void main()
