import { User } from '../entities/user';

export interface CreateUserUseCase {
  create: (data: any) => Promise<User>
}
