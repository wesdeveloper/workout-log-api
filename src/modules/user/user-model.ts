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

class UserModel {
  private dbConnection = DataBase.getConnection();

  async create(user: User): Promise<User> {
    const [userId] = await this.dbConnection<User>('users')
      .returning('id')
      .insert(user);

    return this.getUserById(userId);
  }

  async getUserById(userId: number): Promise<User> {
    const [user] = await this.dbConnection<User>('users')
      .where('id', userId)
      .select('*');

    return user;
  }
}

export default new UserModel();
