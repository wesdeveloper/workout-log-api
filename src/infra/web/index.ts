import express, { Express } from 'express';
import userLoadRoutes from '../../presentation/routes/user-routes';

class App {
  private app: Express = express();

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded());

    userLoadRoutes.loadRoutes(this.app);
  }

  async init(): Promise<Express> {
    this.setupExpress();

    return this.app;
  }
}

export default new App();
