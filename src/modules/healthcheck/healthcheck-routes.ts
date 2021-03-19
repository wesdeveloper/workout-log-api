import { Router } from 'express';
import ExpressRouterAdapter from '../../adapters/express-router-adapter';
import HealthcheckController from './healthcheck-controller';
import BaseRoutes from '../base-routes';

class HealthcheckRoutes extends BaseRoutes {
  loadRoutes(router: Router) {
    const healthcheckController = new HealthcheckController();
    router.get('/healthcheck', ExpressRouterAdapter.adapt(healthcheckController.isHealthcheck));
  }
}

export default new HealthcheckRoutes();
