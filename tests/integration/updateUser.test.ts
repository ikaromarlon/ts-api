import { getPrismaClient } from '../../src/infra/database/prisma'
import { getServer } from '../../src/infra/server'
import { Requester } from '../../src/utils/helpers/request'
import { faker } from '@faker-js/faker'

describe('Integration Test: Update User (PUT /users/:id)', () => {
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

  it('Should be able to update user', async () => {
    const { password, ...user } = await db.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    })

    const data = {
      name: faker.person.fullName(),
      isActive: false
    }

    const response = await requester.put(`${url}/users/${user.id}`, { data })

    expect(response.status).toBe(200)
    expect(response.data).toEqual(expect.objectContaining({ ...user, ...data }))
  })

  it('Should not be able to update user if another user is using the email provided ', async () => {
    const user1 = await db.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    })

    const user2 = await db.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    })

    const data = {
      name: faker.person.fullName(),
      email: user2.email
    }

    const response = await requester.put(`${url}/users/${user1.id}`, { data })

    expect(response.status).toBe(500)
    expect(response.data).toEqual({ message: 'There is another user using the email provided' })
  })

  it('Should not find user to be updated ', async () => {
    const user = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email()
    }

    const { id, ...data } = user

    const response = await requester.put(`${url}/users/${id}`, { data })

    expect(response.status).toBe(500)
    expect(response.data).toEqual({ message: 'User not found' })
  })
})
