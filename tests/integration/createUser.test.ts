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

  describe('Success', () => {
    it('Should be able to create a new active user', async () => {
      const data = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        isActive: true
      }

      const response = await requester.post(`${url}/users`, { data })

      const { password, ...otherData } = data

      expect(response.status).toBe(201)
      expect(response.data).toEqual(expect.objectContaining(otherData))
      expect(response.data).toHaveProperty('id')
    })

    it('Should be able to create a new inactive user', async () => {
      const data = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        isActive: false
      }

      const response = await requester.post(`${url}/users`, { data })

      const { password, ...otherData } = data

      expect(response.status).toBe(201)
      expect(response.data).toEqual(expect.objectContaining(otherData))
      expect(response.data).toHaveProperty('id')
    })

    it('Should be able to create a new user with default isActive status (true)', async () => {
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
  })

  describe('Failure', () => {
    it('Should not be able to create user twice (same email)', async () => {
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
})
