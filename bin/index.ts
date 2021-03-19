import App from '../src';

(async () => {
  const app = await App.init();
  const port: number = 3000;

  // start the express server
  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.info(`server started at http://localhost:${port}`);
  });
})();
