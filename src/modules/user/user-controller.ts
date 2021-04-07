import UserService from './user-service';
import UserModel from './user-model';
import { logger } from '../../config';

export default class UserController {
  private userService = new UserService(UserModel);

  createUser = async (httpRequest: Request) => {
    try {
      const userCreated = await this.userService.createUser(httpRequest.body);

      return {
        statusCode: 201,
        body: userCreated,
      };
    } catch (error) {
      logger.error(error.message);

      return { statusCode: 500 };
    }
  };
}
