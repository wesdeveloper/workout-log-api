export default class RouteAdapter {
  static adapt(controllerAction: any) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body,
      };

      const httpResponse = await controllerAction(httpRequest);
      res.status(httpResponse.status).send(httpResponse.body);
    };
  }
}
