import supertest from 'supertest';
import { Application } from 'express';
import app from '../src';

let server: Application;
beforeAll(async () => {
  server = await app.init();
  global.testRequest = supertest(server);
});
