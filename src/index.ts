import express, { Application } from 'express';
import morgan from 'morgan';
import healthcheckRoutes from './modules/healthcheck/healthcheck-routes';

class App {
  private app;

  constructor() {
    this.app = express();
  }

  private setupExpress(): void {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded());

    healthcheckRoutes.loadRoutes(this.app);
  }

  async init(): Promise<Application> {
    console.info('Starging appliction...');
    this.setupExpress();

    return this.app;
  }
}

export default new App();
