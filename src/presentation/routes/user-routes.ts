import { Router, Request, Response } from 'express';
import BaseRoutes from '../interfaces/base-routes';

class UserRoutes extends BaseRoutes {
  loadRoutes(router: Router) {
    router.get('/user', (request: Request, response: Response) => {
      response.status(200).send({
        data: 'Ok',
      });
    });
  }
}

export default new UserRoutes();
