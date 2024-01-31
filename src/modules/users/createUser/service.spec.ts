import CreateUserService from './service'
import { InMemoryUsersRepository } from '../../../repositories/inMemory/InMemoryUsersRepository'

const makeSut = (): any => {
  const inMemoryUsersRepository = new InMemoryUsersRepository()
  const sut = new CreateUserService(inMemoryUsersRepository)

  return {
    sut,
    inMemoryUsersRepository
  }
}

describe(`Unit Test: ${CreateUserService.name}`, () => {
  it('should create a new user and return it', async () => {
    const { sut, inMemoryUsersRepository } = makeSut()
    const spyRepositoryExists = jest.spyOn(inMemoryUsersRepository, 'exists')
    const spyRepositoryCreate = jest.spyOn(inMemoryUsersRepository, 'create')

    const userData = {
      name: 'Any Person',
      email: 'any.person@nicedomain.com',
      password: '123456'
    }

    const result = await sut.execute(userData)

    expect(spyRepositoryExists).toHaveBeenCalledWith({ email: userData.email })
    expect(spyRepositoryCreate).toHaveBeenCalledWith(userData)
    expect(result).toHaveProperty('id')
    expect(result).toEqual(expect.objectContaining(userData))
  })

  it('should not create a new user if it already exists', async () => {
    const { sut, inMemoryUsersRepository } = makeSut()
    const spyRepositoryExists = jest.spyOn(inMemoryUsersRepository, 'exists').mockResolvedValueOnce(true)
    const spyRepositoryCreate = jest.spyOn(inMemoryUsersRepository, 'create')

    const userData = {
      name: 'Any Person',
      email: 'any.person@nicedomain.com',
      password: '123456'
    }

    const result = sut.execute(userData)

    await expect(result).rejects.toThrow('User with provided email already exists')

    expect(spyRepositoryExists).toHaveBeenCalledWith({ email: userData.email })
    expect(spyRepositoryCreate).toHaveBeenCalledTimes(0)
  })
})
