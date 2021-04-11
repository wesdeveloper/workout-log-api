import { User } from '../../../domain/entities/user';
import { BaseController } from '../../interfaces/base-controller';
import { HttpRequest } from '../../ports/http';

export class CreateUserController extends BaseController {
  handle = async (httpRequest: HttpRequest) => {
    const { body: userData } = httpRequest;
    const validationCreateUserDataResult = User.validateCreateUserData(userData);
    // const validationBodyResult = validateObject(userData, createUserData);

    if (validationCreateUserDataResult.isValid) {
      return this.handleBadRequest(validationCreateUserDataResult.errors);
    }
    return {
      status: 200,
      data: httpRequest.body,
    };
  };
}
