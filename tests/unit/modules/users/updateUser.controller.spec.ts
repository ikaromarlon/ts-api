import UpdateUserController from '../../../../src/modules/users/updateUser/controller'
import type UpdateUserService from '../../../../src/modules/users/updateUser/service'
import { type User } from '../../../../src/modules/users/User.entity'
import { faker } from '@faker-js/faker'

const setupSut = (): any => {
  const user = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  const mocks = {
    updateUserService: {
      execute: jest.fn(async (): Promise<User> => user)
    } as unknown as UpdateUserService
  }

  const sut = new UpdateUserController(mocks.updateUserService)

  return {
    sut,
    mocks,
    user
  }
}

describe(`Unit Test: ${UpdateUserController.name}`, () => {
  it('Should execute updateUser service and return success', async () => {
    const { sut, mocks, user } = setupSut()

    const { id, ...requestData } = user

    const result = await sut.handle({
      params: { id },
      body: requestData
    })

    const { password, ...responseData } = user

    expect(mocks.updateUserService.execute).toHaveBeenCalledWith(id, requestData)
    expect(result.status).toBe(200)
    expect(result.data).toEqual(expect.objectContaining(responseData))
  })

  it('Should return error if service throws an error', async () => {
    const { sut, mocks, user } = setupSut()
    mocks.updateUserService.execute.mockRejectedValue(new Error('generic error'))

    const { id, ...requestData } = user

    const result = await sut.handle({
      params: { id },
      body: requestData
    })

    expect(mocks.updateUserService.execute).toHaveBeenCalledWith(id, requestData)
    expect(result.status).toBe(500)
    expect(result.data.message).toBe('generic error')
  })
})
