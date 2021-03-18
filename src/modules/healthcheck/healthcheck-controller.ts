export default class HealthcheckController {
  // eslint-disable-next-line no-unused-vars
  async isHealthcheck(httpRequest: Request) {
    return {
      status: 200,
      body: { message: 'Ok' },
    };
  }
}
