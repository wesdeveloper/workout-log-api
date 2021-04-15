import { UserRepository } from '../../application/interfaces/repositories/user-repository';
import { User } from '../../domain/user';

export class UserRepositoryInMemory implements UserRepository {
  private users: Array<User> = [];

  createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);
    return newUser;
  };
}
