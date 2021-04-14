import { ControllerAction } from './controller-action';
import { HttpRequest, HttpResponse } from './http';

export abstract class BaseController implements ControllerAction {
  abstract handle(httpRequest: HttpRequest): Promise<HttpResponse>;

  handleBadRequest = (errors: any): HttpResponse => ({ status: 400, data: { errors } });

  handleInternalServerError = (): HttpResponse => ({ status: 500 });
}
