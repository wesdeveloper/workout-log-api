import DataBase from '../../config/database';

export enum Gender {
  M = 'M',
  F = 'F',
}

export interface User {
  id: number
  age: number
  height: number
  lastName: string
  name: string
  nickname: string
  wheight: number
  gender: Gender
}

export interface UserModelContext {
  create(user: User): Promise<User>;
  getUserById(userId: number): Promise<User>;
}

class UserModel implements UserModelContext {
  private dbConnection = DataBase.getConnection();

  async create(user: User): Promise<User> {
    const [userId]: number[] = await this.dbConnection<User>('users')
      .returning('id')
      .insert(user);

    return this.getUserById(userId);
  }

  async getUserById(userId: number): Promise<User> {
    const [user]: User[] = await this.dbConnection<User>('users')
      .where('id', userId)
      .select('*');

    return user;
  }
}

export default new UserModel();
