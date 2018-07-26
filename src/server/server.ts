import express from 'express';
import { Server } from 'http';

const app = express();

const start = () => new Promise<Server>((resolve, reject) => {
  try {
    const port: number = parseInt(`${process.env.PORT}`, 10) || 3000;
    const server = app.listen(port, '0.0.0.0', (err: Error) => {
      if (err) {
        reject(err);
        return;
      }
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
