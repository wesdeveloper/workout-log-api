export default class Healthcheck {
  static isOk(httpRequest: object) {
    return {
      statusCode: 200,
      message: 'Everything is ok',
    };
  }
}
