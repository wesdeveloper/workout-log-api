export default class RouteAdapter {
  static adapt(controllerAction: any) {
    return async (req: any, res: any) => {
      const httpRequest = {
        body: req.body,
      };

      const httpResponse = await controllerAction(httpRequest);
      res.status(httpResponse.statusCode).send(httpResponse.body);
    };
  }
}
