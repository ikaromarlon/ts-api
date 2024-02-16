import DeleteUserController from '../../../../src/modules/users/deleteUser/controller'
import type DeleteUserService from '../../../../src/modules/users/deleteUser/service'
import { faker } from '@faker-js/faker'

const setupSut = (): any => {
  const mocks = {
    deleteUserService: {
      execute: jest.fn(async (): Promise<boolean> => true)
    } as unknown as DeleteUserService
  }

  const sut = new DeleteUserController(mocks.deleteUserService)

  return {
    sut,
    mocks
  }
}

describe(`Unit Test: ${DeleteUserController.name}`, () => {
  it('Should execute deleteUser service and return success', async () => {
    const { sut, mocks } = setupSut()

    const id = faker.string.uuid()

    const request = {
      params: { id }
    }

    const result = await sut.handle(request)

    expect(mocks.deleteUserService.execute).toHaveBeenCalledWith(id)
    expect(result.status).toBe(200)
    expect(result.data).toEqual({ success: true })
  })

  it('Should return error if service throws an error', async () => {
    const { sut, mocks } = setupSut()
    mocks.deleteUserService.execute.mockRejectedValue(new Error('generic error'))

    const id = faker.string.uuid()

    const request = {
      params: { id }
    }

    const result = await sut.handle(request)

    expect(mocks.deleteUserService.execute).toHaveBeenCalledWith(id)
    expect(result.status).toBe(500)
    expect(result.data.message).toBe('generic error')
  })
})
