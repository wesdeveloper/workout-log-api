import { User, UserModelContext } from './user-model';

export default class UserService {
  private userModel: UserModelContext;

  constructor(userModel: UserModelContext) {
    this.userModel = userModel;
  }

  async createUser(user: User): Promise<User> {
    return this.userModel.create(user);
  }
}
