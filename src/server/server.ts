import { createServer, Server, RequestListener } from "http";
import polka from "polka";

import react from './middlewares/react'

const app = polka();
app.get("*", react())

const start = () =>
  new Promise<Server>((resolve, reject) => {
    try {
      const port: number = parseInt(`${process.env.PORT}`, 10) || 3000;
      const handler = app.handler as RequestListener;
      const server = createServer(handler);
      server.listen(port, "0.0.0.0", 0, () => {
        resolve(server);
      });
    } catch (e) {
      reject(e);
    }
  });

export { app, start };
