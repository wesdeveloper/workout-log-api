import { User } from '../../../domain/user';
import { UserRepository } from '../../interfaces/repositories/user-repository';
import { CreateUserUseCase } from '../../interfaces/use_cases/create-user';

export class CreateUser implements CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  create = async (data: any): Promise<User> => this.userRepository.createUser(data);
}
