import { UserRepository } from '../../../domain/repositories/user-repository';
import { CreateUserUseCase } from '../../../domain/use_cases/create-user';

export class CreateUser implements CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  create = async (data: any) => this.userRepository.createUser(data);
}
