import faker from 'faker';
import { HelperValidatorErrorItem } from '../../../utils/helper-validations';
import { HttpRequest, HttpResponse } from '../../ports/http';
import { CreateUserController } from './create-user';

const makeSut = () => {
  const createUserController = new CreateUserController();

  return {
    createUserController,
  };
};

describe('Create user controller', () => {
  it('Should create an create user controller instance', () => {
    const { createUserController } = makeSut();
    expect(createUserController).not.toBeNull();
  });

  describe('Create user controller - validations', () => {
    const createUserDataMock = {
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      nickName: faker.internet.userName(),
      email: faker.internet.email(),
      age: faker.datatype.number(50),
      weight: faker.datatype.float({ min: 40, max: 200 }),
      height: faker.datatype.float({ min: 1, max: 2 }),
      gender: faker.name.gender(),
    };

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
