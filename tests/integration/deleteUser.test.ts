import { getPrismaClient } from '../../src/infra/database/prisma'
import { getServer } from '../../src/infra/server'
import { Requester } from '../../src/utils/helpers/request'
import { faker } from '@faker-js/faker'

describe('Integration Test: Delete User (DELETE /users/:id)', () => {
  let requester
  let server
  let url
  let db

  beforeAll(async () => {
    requester = Requester()
    server = await getServer()
    await server.start()
    url = `${server.getAddress()}/api`

    db = getPrismaClient().getInstance()
  })

  afterAll(async () => {
    await server.shutDown()
  })

  it('Should be able to delete user', async () => {
    const user = await db.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    })

    const response = await requester.delete(`${url}/users/${user.id}`)

    expect(response.status).toBe(200)
    expect(response.data).toEqual({ success: true })
  })

  it('Should not find user to be deleted ', async () => {
    const id = faker.string.uuid()

    const response = await requester.delete(`${url}/users/${id}`)

    expect(response.status).toBe(500)
    expect(response.data).toEqual({ message: 'User not found' })
  })
})
