import { User } from '../../../domain/user';

export interface UserRepository {
  createUser(user: Omit<User, 'id'>): Promise<User>
}
