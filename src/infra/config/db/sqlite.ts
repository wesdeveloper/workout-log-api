import assert from 'assert';
import knex, { Knex } from 'knex';
import knexfile from '../../../../knexfile';

const sqliteConfig = knexfile.test;

class Database {
  private connection!: Knex<any, unknown[]>;

  constructor(private config: any) {}

  private connect(): void {
    this.connection = knex(this.config);
  }

  public async checkConnection(): Promise<void> {
    const connection = this.getConnection();

    try {
      const [[{ result }]] = await connection.raw('SELECT 1+1 AS result');
      assert.strictEqual(result, 2);
    } catch {
      throw new Error('database connection problem...');
    }
  }

  public getConnection(): Knex<any, unknown[]> {
    if (!this.connection) {
      this.connect();
    }

    return this.connection;
  }

  public async closeConnection(): Promise<void> {
    await this.connection.destroy();
  }
}

export const sqliteDatabase = new Database(sqliteConfig);
