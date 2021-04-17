import { HttpRequest, HttpResponse } from './http';

export interface ControllerAction {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
