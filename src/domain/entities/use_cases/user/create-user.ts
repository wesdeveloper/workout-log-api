import { User } from '../../user';

export interface CreateUser {
  create: (data: any) => Promise<User>
}
