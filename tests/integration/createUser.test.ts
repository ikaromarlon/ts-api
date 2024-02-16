import { getServer } from '../../src/infra/server'
import { Requester } from '../../src/utils/helpers/request'
import { faker } from '@faker-js/faker'

describe('Integration Test: Create User (POST /users)', () => {
  let requester
  let server
  let url

  beforeAll(async () => {
    requester = Requester()
    server = await getServer()
    await server.start()
    url = `${server.getAddress()}/api`
  })

  afterAll(async () => {
    await server.shutDown()
  })

  it('Should be able to create a new user', async () => {
    const data = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const response = await requester.post(`${url}/users`, { data })

    const { password, ...otherData } = data

    expect(response.status).toBe(201)
    expect(response.data).toEqual(expect.objectContaining(otherData))
    expect(response.data).toHaveProperty('id')
  })

  it('Should not be able to create the same user twice', async () => {
    const data = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    await requester.post(`${url}/users`, { data })

    const response = await requester.post(`${url}/users`, { data })

    expect(response.status).toBe(500)
    expect(response.data).toEqual({ message: 'User with email provided already exists' })
  })
})
