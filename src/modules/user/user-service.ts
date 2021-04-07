export default class UserService {
  private userModel;

  constructor(userModel: any) {
    this.userModel = userModel;
  }

  async createUser(user: any) {
    return this.userModel.create(user);
  }
}
