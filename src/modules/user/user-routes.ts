import { Router } from 'express';
import ExpressRouterAdapter from '../../adapters/express-router-adapter';
import UserController from './user-controller';
import BaseRoutes from '../base-routes';

class UserRoutes extends BaseRoutes {
  loadRoutes(router: Router) {
    const userController = new UserController();
    router.post('/user', ExpressRouterAdapter.adapt(userController.createUser));
  }
}

export default new UserRoutes();
