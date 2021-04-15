import faker from 'faker';
import { CreateUserUseCase } from '../../../application/interfaces/use_cases/create-user';
import { User } from '../../../domain/user';
import { HelperValidatorErrorItem } from '../../../utils/helper-validations';
import { HttpRequest, HttpResponse } from '../../interfaces/http';
import { createUserDataMockFixture } from '../../__tests__/user-fixtures';
import { CreateUserController } from './create-user';

class CreateUserSpy implements CreateUserUseCase {
  create = async (data: User): Promise<User> => ({ ...data, id: faker.datatype.number() });
}

const makeSut = () => {
  const createUser = new CreateUserSpy();
  const createUserController = new CreateUserController(createUser);

  return {
    createUserController,
  };
};

describe('Create user - Controller', () => {
  describe('Success cases', () => {
    it('Should create a user controller instance', () => {
      const { createUserController } = makeSut();
      expect(createUserController).toBeInstanceOf(CreateUserController);
    });

    it('Should create a user', async () => {
      const userDataMock = createUserDataMockFixture();

      const { createUserController } = makeSut();

      const httpRequest: HttpRequest = {
        body: userDataMock,
      };
      const httpResponse: HttpResponse = await createUserController.handle(httpRequest);
      expect(httpResponse.status).toBe(201);
      expect(httpResponse.data).toEqual(expect.objectContaining({ ...userDataMock, id: expect.any(Number) }));
    });
  });

  describe('Failure cases', () => {
    it('Should create a user and receive internal server error', async () => {
      const userDataMock = createUserDataMockFixture();

      const mockCreateUserSpy = {
        create: jest.fn().mockImplementation(() => {
          throw Error('internal server error');
        }),
      };

      const createUserController = new CreateUserController(mockCreateUserSpy);
      const httpRequest: HttpRequest = {
        body: userDataMock,
      };
      const httpResponse: HttpResponse = await createUserController.handle(httpRequest);

      expect(httpResponse.status).toBe(500);
    });
  });

  describe('validations', () => {
    const createUserDataMock = createUserDataMockFixture();

    const userKeysValidation = ['name', 'lastName', 'email', 'gender', 'age'];

    const { createUserController } = makeSut();
    userKeysValidation.forEach((userKey) => {
      const createUserWithoutKeyMock: any = { ...createUserDataMock };
      delete createUserWithoutKeyMock[userKey];

      it(`Should create a user without ${userKey} and receive bad request error`, async () => {
        const httpRequest: HttpRequest = {
          body: createUserWithoutKeyMock,
        };
        const httpResponse: HttpResponse = await createUserController.handle(httpRequest);

        expect(httpResponse.status).toBe(400);

        const errorItem: HelperValidatorErrorItem = httpResponse.data?.errors?.find((error: HelperValidatorErrorItem) => error.path === userKey);
        expect(errorItem).not.toBeNull();
      });
    });
  });
});
