import { User } from '../../../domain/entities/user';
import { CreateUserUseCase } from '../../../domain/use_cases/create-user';
import { BaseController } from '../../interfaces/base-controller';
import { HttpRequest, HttpResponse } from '../../interfaces/http';

export class CreateUserController extends BaseController {
  constructor(private createUser: CreateUserUseCase) {
    super();
  }

  handle = async (httpRequest: HttpRequest): Promise<HttpResponse> => {
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
