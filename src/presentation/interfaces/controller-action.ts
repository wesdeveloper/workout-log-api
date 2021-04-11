import { HttpRequest, HttpResponse } from '../ports/http';

export interface ControllerAction {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
