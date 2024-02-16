import CreateUserService from '../../../../src/modules/users/createUser/service'
import { type User } from '../../../../src/modules/users/User.entity'
import { faker } from '@faker-js/faker'
import { type UsersRepository } from '../../../../src/repositories/UsersRepository'

const makeSut = (): any => {
  const user = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  const usersRepository: UsersRepository = {
    create: jest.fn(async (data): Promise<User> => user),
    exists: jest.fn(async (): Promise<boolean> => false)
  }

  const mocks = {
    usersRepository
  }

  const sut = new CreateUserService(mocks.usersRepository)

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

    expect(mocks.usersRepository.exists).toHaveBeenCalledWith({ email: userData.email })
    expect(mocks.usersRepository.create).toHaveBeenCalledWith(userData)
    expect(result).toEqual(user)
  })

  it('Should throws an error if user already exists', async () => {
    const { sut, mocks, user } = makeSut()
    mocks.usersRepository.exists.mockResolvedValueOnce(true)

    const { id, ...userData } = user

    const result = sut.execute(userData)

    await expect(result).rejects.toThrow('User with provided email already exists')

    expect(mocks.usersRepository.exists).toHaveBeenCalledWith({ email: userData.email })
    expect(mocks.usersRepository.create).toHaveBeenCalledTimes(0)
  })
})
