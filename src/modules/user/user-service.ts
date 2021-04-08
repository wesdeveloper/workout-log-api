import { User, UserModel } from './user-model';

export default class UserService {
  constructor(private userModel: UserModel) { }

  async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    return this.userModel.create(user);
  }
}
