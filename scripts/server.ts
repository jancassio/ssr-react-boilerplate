import chalk from "chalk";
import polka from "polka";
import sirv from "sirv";
import http, { RequestListener } from "http";
import { AddressInfo } from "net";
import { Configuration, MultiCompiler } from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

import { info, ok } from "./lib/logger";

const publicPath = (configuration?: Configuration): string => {
  if (
    configuration &&
    configuration.output &&
    configuration.output.publicPath
  ) {
    return configuration.output.publicPath;
  }

  return "/";
};

export const server = (bundler: MultiCompiler, config?: Configuration) => {
  const app = polka();
  const serve = sirv("dist/public", { dev: true });

  app.use(
    webpackDevMiddleware(bundler, {
      logLevel: "warn",
      publicPath: publicPath(config),
    })
  );

  app.use(webpackHotMiddleware(bundler.compilers[0]));
  app.use(serve);

  info("ℹ Starting development server...");

  const serverPort = parseInt(`${process.env.PORT}`, 10) || 3000;
  const handler = app.handler as RequestListener;
  const httpServer = http.createServer(handler);
  httpServer.listen(serverPort, "0.0.0.0", 0, () => {
    const { address, port } = httpServer.address() as AddressInfo;

    ok(
      "✔ Server is up and running @",
      chalk.underline(`http://${address}:${port}`)
    );
  });
};
