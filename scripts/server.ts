/* eslint-disable no-console */

import chalk from 'chalk';
import express from 'express';
import http from 'http';
import { AddressInfo } from 'net';
import path from 'path';
import { Configuration, MultiCompiler } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { info, ok } from './lib/logger';

const publicPath = (configuration?: Configuration): string => {
  if (
    configuration
    && configuration.output
    && configuration.output.publicPath
  ) {
    return configuration.output.publicPath;
  }

  return '/';
};

export const server = (bundler: MultiCompiler, config?: Configuration) => {
  const app = express();

  app.use(webpackDevMiddleware(bundler, {
    logLevel: 'warn',
    publicPath: publicPath(config),
  }));

  app.use(webpackHotMiddleware(bundler.compilers[0]));
  app.use(express.static(path.resolve(`dist/public`)));
  app.use((req, res, next) => require('../src/server/router')(req, res, next));

  info('ℹ Starting development server...');

  const port: number = parseInt(`${process.env.PORT}`, 10) || 3000;
  const httpServer = http.createServer(app);
  httpServer.listen(port, '0.0.0.0', (err: Error) => {
    if (err) { throw err; }

    const addr = httpServer.address() as AddressInfo;

    ok('✔ Server is up and running @', chalk.underline(`http://${addr.address}:${addr.port}`));
  });
};
