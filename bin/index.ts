import App from '../src';
import { logger } from '../src/config';

(async () => {
  try {
    const app = await App.init();
    const port: number = 3000;

    // start the express server
    app.listen(port, () => {
      // tslint:disable-next-line:no-console
      logger.info(`server started at http://localhost:${port}`);
    });
  } catch (err) {
    logger.error('Server not started!!!');
  }
})();
