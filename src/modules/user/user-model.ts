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
  created_at: number
  updated_at: number
}

export interface UserModel {
  create(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User>;
  getUserById(userId: number): Promise<User>;
}

export class UserModel implements UserModel {
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
