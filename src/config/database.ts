import knex from 'knex';
import assert from 'assert';
import knexfile from '../../knexfile';

const environment = process.env.NODE_ENV || 'development';
const clientConfig = (environment === 'development')
  ? knexfile.development
  : knexfile.test;

class Database {
  private connection: any;

  private connect() {
    this.connection = knex(clientConfig);
  }

  public async checkConnection(): Promise<void> {
    const connection = this.getConnection();

    try {
      const [[{ result }]] = await connection.raw('SELECT 1+1 AS result');
      assert.strictEqual(result, 2);
    } catch (err) {
      throw new Error('database connection problem...');
    }
  }

  public getConnection() {
    if (!this.connection) {
      this.connect();
    }

    return this.connection;
  }

  public async closeConnection() {
    await this.connection.destroy();
  }
}

export default new Database();
