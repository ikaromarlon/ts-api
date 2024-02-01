import CreateUserService from '../../../../src/modules/users/createUser/service'
import { type InMemoryUsersRepository } from '../../../../src/repositories/inMemory/InMemoryUsersRepository'
import { type User } from 'src/modules/users/user.entity'
import { faker } from '@faker-js/faker'

const makeSut = (): any => {
  const user = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  const mocks = {
    inMemoryUsersRepository: {
      create: jest.fn(async (data): Promise<User> => user),
      exists: jest.fn(async (): Promise<boolean> => false)
    } as unknown as InMemoryUsersRepository
  }

  const sut = new CreateUserService(mocks.inMemoryUsersRepository)

  return {
    sut,
    mocks,
    user
  }
}

describe(`Unit Test: ${CreateUserService.name}`, () => {
  it('Should create a new user', async () => {
    const { sut, mocks, user } = makeSut()

    const { id, ...userData } = user

    const result = await sut.execute(userData)

    expect(mocks.inMemoryUsersRepository.exists).toHaveBeenCalledWith({ email: userData.email })
    expect(mocks.inMemoryUsersRepository.create).toHaveBeenCalledWith(userData)
    expect(result).toEqual(user)
  })

  it('Should throws an error if user already exists', async () => {
    const { sut, mocks, user } = makeSut()
    mocks.inMemoryUsersRepository.exists.mockResolvedValueOnce(true)

    const { id, ...userData } = user

    const result = sut.execute(userData)

    await expect(result).rejects.toThrow('User with provided email already exists')

    expect(mocks.inMemoryUsersRepository.exists).toHaveBeenCalledWith({ email: userData.email })
    expect(mocks.inMemoryUsersRepository.create).toHaveBeenCalledTimes(0)
  })
})
