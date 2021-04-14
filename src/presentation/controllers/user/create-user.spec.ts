import { User } from '../../../domain/entities/user';
import { CreateUserUseCase } from '../../../domain/use_cases/create-user';
import { HelperValidatorErrorItem } from '../../../utils/helper-validations';
import { HttpRequest, HttpResponse } from '../../interfaces/http';
import { createUserDataMockFixture } from '../../__tests__/user-fixtures';
import { CreateUserController } from './create-user';

class CreateUserSpy implements CreateUserUseCase {
  create = async (data: User): Promise<User> => (data);
}

const makeSut = () => {
  const createUser = new CreateUserSpy();
  const createUserController = new CreateUserController(createUser);

  return {
    createUserController,
  };
};

describe('Create user controller', () => {
  it('Should create a user controller instance', () => {
    const { createUserController } = makeSut();
    expect(createUserController).not.toBeNull();
  });

  it('Should create a user with success', async () => {
    const userDataMock = createUserDataMockFixture();

    const { createUserController } = makeSut();

    const httpRequest: HttpRequest = {
      body: userDataMock,
    };
    const httpResponse: HttpResponse = await createUserController.handle(httpRequest);
    expect(httpResponse.status).toBe(201);
  });

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

  describe('Create user controller - validations', () => {
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
