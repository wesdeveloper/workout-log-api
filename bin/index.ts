import App from '../src/infra/web/index';

(async () => {
  try {
    const app = await App.init();
    const port: number = 3000;

    // start the express server
    app.listen(port, () => {
      console.info(`server started at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Server not started!!!');
  }
})();
