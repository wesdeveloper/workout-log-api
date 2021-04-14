import { createUserDataMockFixture } from '../../presentation/__tests__/user-fixtures';
import { UserRepositoryInMemory } from './user-repository-in-memory';

const makeSut = () => {
  const userRepository = new UserRepositoryInMemory();

  return { userRepository };
};

describe('User Repository in memory', () => {
  it('Should create an instance of UserRepositoryInMemory', () => {
    const sut = makeSut();
    expect(sut.userRepository).toBeInstanceOf(UserRepositoryInMemory);
  });

  it('Should create an user', async () => {
    const sut = makeSut();
    const userData = createUserDataMockFixture();
    const user = await sut.userRepository.createUser(userData);

    expect(user).toEqual(expect.objectContaining({ ...userData, id: expect.any(Number) }));
  });
});
