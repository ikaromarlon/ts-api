import DeleteUserService from '../../../../src/modules/users/deleteUser/service'
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
    delete: jest.fn(async (): Promise<User> => user)
  } as unknown as UsersRepository

  const mocks = {
    usersRepository
  }

  const sut = new DeleteUserService(mocks.usersRepository)

  return {
    sut,
    mocks,
    user
  }
}

describe(`Unit Test: ${DeleteUserService.name}`, () => {
  it('Should delete user', async () => {
    const { sut, mocks, user } = setupSut()

    const { id } = user

    const result = await sut.execute(id)

    expect(mocks.usersRepository.delete).toHaveBeenCalledWith(id)
    expect(result).toBe(true)
  })

  it('Should throw an error if not find user', async () => {
    const { sut, mocks, user } = setupSut()

    mocks.usersRepository.delete.mockResolvedValueOnce(null)

    const { id } = user

    const result = sut.execute(id)

    await expect(result).rejects.toThrow('User not found')

    expect(mocks.usersRepository.delete).toHaveBeenCalledWith(id)
  })
})
