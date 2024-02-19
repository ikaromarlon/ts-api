import UpdateUserService from '../../../../src/modules/users/updateUser/service'
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
    findOne: jest.fn(async (): Promise<User> => user),
    update: jest.fn(async (): Promise<User> => user)
  } as unknown as UsersRepository

  const mocks = {
    usersRepository
  }

  const sut = new UpdateUserService(mocks.usersRepository)

  return {
    sut,
    mocks,
    user
  }
}

describe(`Unit Test: ${UpdateUserService.name}`, () => {
  it('Should update user data', async () => {
    const { sut, mocks, user } = setupSut()

    const { id, ...userData } = user

    const result = await sut.execute(id, userData)

    expect(mocks.usersRepository.findOne).toHaveBeenCalledWith({ email: userData.email })
    expect(mocks.usersRepository.update).toHaveBeenCalledWith(id, userData)
    expect(result).toEqual(user)
  })

  it('Should throw an error if another user already uses the email provided', async () => {
    const { sut, mocks, user } = setupSut()

    const existingUser = {
      id: faker.string.uuid(),
      email: user.email
    }

    mocks.usersRepository.findOne.mockResolvedValueOnce(existingUser)

    const { id, ...userData } = user

    const result = sut.execute(id, userData)

    await expect(result).rejects.toThrow('There is another user using the email provided')

    expect(mocks.usersRepository.findOne).toHaveBeenCalledWith({ email: userData.email })
    expect(mocks.usersRepository.update).toHaveBeenCalledTimes(0)
  })

  it('Should throw an error if not find user', async () => {
    const { sut, mocks, user } = setupSut()

    mocks.usersRepository.update.mockResolvedValueOnce(null)

    const { id, ...userData } = user

    const result = sut.execute(id, userData)

    await expect(result).rejects.toThrow('User not found')

    expect(mocks.usersRepository.findOne).toHaveBeenCalledWith({ email: userData.email })
    expect(mocks.usersRepository.update).toHaveBeenCalledWith(id, userData)
  })
})
