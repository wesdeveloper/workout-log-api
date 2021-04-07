import UserService from './user-service';
import UserModel, { User } from './user-model';
import { logger } from '../../config';
import { HttpRequest } from '../../adapters/express-router-adapter';
import BaseController from '../base-controller';

export default class UserController extends BaseController {
  private userService = new UserService(UserModel);

  createUser = async (httpRequest: HttpRequest) => {
    try {
      const userCreated: User = await this.userService.createUser(httpRequest.body);

      return {
        status: 201,
        body: userCreated,
      };
    } catch (error) {
      logger.error(error.message);
      return this.handleInternalServerError();
    }
  };
}
