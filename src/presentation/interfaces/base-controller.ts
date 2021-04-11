import { HttpRequest, HttpResponse } from '../ports/http';
import { ControllerAction } from './controller-action';

export abstract class BaseController implements ControllerAction {
  abstract handle(httpRequest: HttpRequest): Promise<HttpResponse>;

  handleBadRequest = (errors: any): HttpResponse => ({ status: 400, data: { errors } });
}
