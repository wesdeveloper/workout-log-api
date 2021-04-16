import { Knex } from 'knex';
import { UserRepository } from '../../application/interfaces/repositories/user-repository';
import { User } from '../../domain/user';
import { Database } from '../config/db/relational-databases';

export class UserRepositoryInMemory implements UserRepository {
  private databaseConnection!: Knex<any, unknown>;

  constructor(database: Database) {
    this.databaseConnection = database.getConnection();
  }

  createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    const [userId] = await this.databaseConnection('users').insert(user);

    const [newUser] = await this.databaseConnection('users').where('id', userId).select();
    return newUser;
  };
}
