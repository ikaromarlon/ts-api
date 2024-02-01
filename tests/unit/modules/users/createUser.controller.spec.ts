import CreateUserController from '../../../../src/modules/users/createUser/controller'
import type CreateUserService from '../../../../src/modules/users/createUser/service'
import { type User } from '../../../../src/modules/users/user.entity'

const makeSut = (): any => {
  const createUserService = {
    execute: async (): Promise<User> => ({
      id: '',
      name: '',
      email: '',
      password: ''
    })
  } as unknown as CreateUserService

  const sut = new CreateUserController(createUserService)

  return {
    sut,
    createUserService
  }
}

describe(`Unit Test: ${CreateUserController.name}`, () => {
  it('Should return status 500', async () => {
    const { sut, createUserService } = makeSut()
    const spy = jest.spyOn(createUserService, 'execute').mockRejectedValue(new Error('generic error'))

    const userData = {
      name: '',
      email: '',
      password: ''
    }

    const result = await sut.handle({
      body: userData
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(userData)
    expect(result.status).toBe(500)
    expect(result.data.message).toBe('generic error')
  })

  it('Should return status 201 and the user created', async () => {
    const { sut, createUserService } = makeSut()
    const spy = jest.spyOn(createUserService, 'execute')

    const userData = {
      name: '',
      email: '',
      password: ''
    }

    const result = await sut.handle({
      body: userData
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(userData)
    expect(result.status).toBe(201)
    expect(result.data).toHaveProperty('id')
    expect(result.data).toEqual(expect.objectContaining(userData))
  })
})
