import CreateUserController from '../../../../src/modules/users/createUser/controller'
import type CreateUserService from '../../../../src/modules/users/createUser/service'
import { type User } from '../../../../src/modules/users/User.entity'
import { faker } from '@faker-js/faker'

const setupSut = (): any => {
  const user = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isActive: true
  }

  const mocks = {
    createUserService: {
      execute: jest.fn(async (): Promise<User> => user)
    } as unknown as CreateUserService
  }

  const sut = new CreateUserController(mocks.createUserService)

  return {
    sut,
    mocks,
    user
  }
}

describe(`Unit Test: ${CreateUserController.name}`, () => {
  it('Should execute createUser service and return success', async () => {
    const { sut, mocks, user } = setupSut()

    const { id, ...requestData } = user

    const result = await sut.handle({
      body: requestData
    })

    const { password, ...otherData } = user

    const responseData = { id, ...otherData }

    expect(mocks.createUserService.execute).toHaveBeenCalledWith(requestData)
    expect(result.status).toBe(201)
    expect(result.data).toEqual(expect.objectContaining(responseData))
  })

  it('Should return error if service throws an error', async () => {
    const { sut, mocks, user } = setupSut()
    mocks.createUserService.execute.mockRejectedValue(new Error('generic error'))

    const { id, ...requestData } = user

    const result = await sut.handle({
      body: requestData
    })

    expect(mocks.createUserService.execute).toHaveBeenCalledWith(requestData)
    expect(result.status).toBe(500)
    expect(result.data.message).toBe('generic error')
  })
})
