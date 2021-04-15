import { User } from '../../../domain/user';

export interface CreateUserUseCase {
  create: (data: any) => Promise<User>
}
