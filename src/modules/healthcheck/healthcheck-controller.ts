export default class HealthcheckController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async isHealthcheck(httpRequest: Request) {
    return {
      statusCode: 200,
      body: { message: 'Ok' },
    };
  }
}
