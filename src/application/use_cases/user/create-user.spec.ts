import faker from 'faker';
import { User } from '../../../domain/user';
import { createUserDataMockFixture } from '../../../presentation/__tests__/user-fixtures';
import { UserRepository } from '../../interfaces/repositories/user-repository';
import { CreateUser } from './create-user';

class UserRepositorySpy implements UserRepository {
  createUser = async (data: Omit<User, 'id'>): Promise<User> => ({ ...data, id: faker.datatype.number() });
}

const makeSut = () => {
  const userRepository = new UserRepositorySpy();
  const createUser = new CreateUser(userRepository);

  return {
    createUser,
  };
};

describe('Create user - Use case', () => {
  describe('Success cases', () => {
    it('Should create an createUser use case instance', () => {
      const sut = makeSut();
      expect(sut.createUser).toBeInstanceOf(CreateUser);
    });

    it('Should receive user data and delegate create user to userRepository', async () => {
      const sut = makeSut();
      const dataToCreateUser = createUserDataMockFixture();

      const user = await sut.createUser.create(dataToCreateUser);
      expect(user).toEqual(expect.objectContaining({
        ...dataToCreateUser,
        id: expect.any(Number),
      }));
    });
  });

  describe('Failure cases', () => {
    it('Should receive user data and delegate create user to userRepository but receive error', async () => {
      const mockCreateUserRepository = {
        createUser: jest.fn().mockImplementation(() => {
          throw Error('internal server error');
        }),
      };
      const dataToCreateUser = createUserDataMockFixture();

      const createUser = new CreateUser(mockCreateUserRepository);
      await expect(createUser.create(dataToCreateUser)).rejects.toThrow();
    });
  });
});
