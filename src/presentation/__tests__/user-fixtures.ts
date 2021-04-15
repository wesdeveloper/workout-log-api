import faker from 'faker';
import { Gender } from '../../domain/user';

export const createUserDataMockFixture = () => {
  const createUserDataMock = {
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    nickName: faker.internet.userName(),
    email: faker.internet.email(),
    age: faker.datatype.number(50),
    weight: faker.datatype.float({ min: 40, max: 200 }),
    height: faker.datatype.float({ min: 1, max: 2 }),
    gender: Gender.F,
  };

  return createUserDataMock;
};
