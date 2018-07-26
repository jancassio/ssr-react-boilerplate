import express from 'express';
import { Server } from 'http';

const app = express();

const start = () => new Promise<Server>((resolve, reject) => {
  try {
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      resolve(server);
    });
  } catch (e) {
    reject(e);
  }
});

export {
  app,
  start,
};
