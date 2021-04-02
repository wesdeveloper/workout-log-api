import assert from 'assert';
import express, { Application } from 'express';
import morgan from 'morgan';
import healthcheckRoutes from './modules/healthcheck/healthcheck-routes';
import { database, logger } from './config';

class App {
  private app = express();

  private async checkDatabaseConnection(): Promise<void> {
    const connection = database.getConnection();

    try {
      const [[{ result }]] = await connection.raw('SELECT 1+1 AS result');
      assert.strictEqual(result, 2);
    } catch (err) {
      throw new Error('database connection problem...');
    }
  }

  private setupExpress(): void {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded());

    healthcheckRoutes.loadRoutes(this.app);
  }

  async init(): Promise<Application> {
    logger.info('init application started!');
    this.setupExpress();

    try {
      await this.checkDatabaseConnection();

      logger.info('init application finished!');
      return this.app;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

export default new App();
