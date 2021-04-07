import express, { Application, Express } from 'express';
import morgan from 'morgan';
import healthcheckRoutes from './modules/healthcheck/healthcheck-routes';
import { database, logger } from './config';
import userRoutes from './modules/user/user-routes';

class App {
  private app: Express = express();

  private setupExpress(): void {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded());

    healthcheckRoutes.loadRoutes(this.app);
    userRoutes.loadRoutes(this.app);
  }

  async init(): Promise<Application> {
    logger.info('init application started!');
    this.setupExpress();

    try {
      await database.checkConnection();

      logger.info('init application finished!');
      return this.app;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

export default new App();
