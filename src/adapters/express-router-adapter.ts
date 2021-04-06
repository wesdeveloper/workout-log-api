import { Request, Response } from 'express';
import { ControllerAction } from '../modules/base-controller';

export interface HttpRequest {
  body: Request['body']
}

export interface HttpResponse {
  status: number
  body?: object
}

export default class RouteAdapter {
  static adapt(controllerAction: ControllerAction) {
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        body: req.body,
      };

      const httpResponse: HttpResponse = await controllerAction(httpRequest);
      res.status(httpResponse.status).send(httpResponse.body);
    };
  }
}
