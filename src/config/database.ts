import knex from 'knex';
import knexfile from '../../knexfile';

class Database {
  private connection: any;

  private connect() {
    this.connection = knex(knexfile.development);
  }

  public getConnection() {
    if (!this.connection) {
      this.connect();
    }

    return this.connection;
  }
}

export default new Database();
