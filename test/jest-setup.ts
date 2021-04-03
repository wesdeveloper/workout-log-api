import supertest from 'supertest';
import { Application } from 'express';
import app from '../src';
import { database } from '../src/config';

let server: Application;
beforeAll(async () => {
  server = await app.init();
  global.testRequest = supertest(server);
});

afterAll(async () => {
  await database.closeConnection();
});
