import CreateUserService from '../../../../src/modules/users/createUser/service'
import { type User } from '../../../../src/modules/users/User.entity'
import { faker } from '@faker-js/faker'
import { type UsersRepository } from '../../../../src/repositories/UsersRepository'

const setupSut = (): any => {
  const user = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isActive: true
  }

  const usersRepository = {
    exists: jest.fn(async (): Promise<boolean> => false),
    create: jest.fn(async (): Promise<User> => user)
  } as unknown as UsersRepository

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
    const { sut, mocks, user } = setupSut()

    const { id, ...userData } = user

    const result = await sut.execute(userData)

    expect(mocks.usersRepository.exists).toHaveBeenCalledWith({ email: userData.email })
    expect(mocks.usersRepository.create).toHaveBeenCalledWith(userData)
    expect(result).toEqual(user)
  })

  it('Should create a new inactive user', async () => {
    const { sut, mocks, user } = setupSut()

    const inactiveUser = {
      ...user,
      isActive: false
    }

    mocks.usersRepository.create.mockResolvedValueOnce(inactiveUser)

    const { id, ...userData } = inactiveUser

    const result = await sut.execute(userData)

    expect(mocks.usersRepository.exists).toHaveBeenCalledWith({ email: userData.email })
    expect(mocks.usersRepository.create).toHaveBeenCalledWith(userData)
    expect(result).toEqual(inactiveUser)
  })

  it('Should create a new user with default isActive status (true)', async () => {
    const { sut, mocks, user } = setupSut()

    const { id, isActive, ...userData } = user

    const result = await sut.execute(userData)

    expect(mocks.usersRepository.exists).toHaveBeenCalledWith({ email: userData.email })
    expect(mocks.usersRepository.create).toHaveBeenCalledWith({ ...userData, isActive: true })
    expect(result).toEqual(user)
  })

  it('Should throws an error if user already exists', async () => {
    const { sut, mocks, user } = setupSut()
    mocks.usersRepository.exists.mockResolvedValueOnce(true)

    const { id, ...userData } = user

    const result = sut.execute(userData)

    await expect(result).rejects.toThrow('User with email provided already exists')

    expect(mocks.usersRepository.exists).toHaveBeenCalledWith({ email: userData.email })
    expect(mocks.usersRepository.create).toHaveBeenCalledTimes(0)
  })
})
