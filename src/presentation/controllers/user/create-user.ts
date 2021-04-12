import { User } from '../../../domain/entities/user';
import { CreateUser } from '../../../domain/entities/use_cases/user/create-user';
import { BaseController } from '../../interfaces/base-controller';
import { HttpRequest } from '../../ports/http';

export class CreateUserController extends BaseController {
  constructor(private createUser: CreateUser) {
    super();
  }

  handle = async (httpRequest: HttpRequest) => {
    try {
      const { body: userData } = httpRequest;
      const validationCreateUserDataResult = User.validateCreateUserData(userData);

      if (validationCreateUserDataResult.isValid) {
        return this.handleBadRequest(validationCreateUserDataResult.errors);
      }

      const user = await this.createUser.create(userData);
      return {
        status: 201,
        data: user,
      };
    } catch {
      return this.handleInternalServerError();
    }
  };
}
