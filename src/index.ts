import chalk from 'chalk';
import express from 'express';
import { AddressInfo } from 'net';
import { error, info, ok } from '../scripts/lib/logger';
import { app, start } from './server/server';

app.use(express.static(`dist/public`));
app.use((req, res, next) => require('./server/router')(req, res, next));

const run = async () => {
  try {
    info('ℹ Starting server...');
    const server = await start();
    const { address, port } = server.address() as AddressInfo;
    ok('✔ Server is up and running @', chalk.underline(`http://${address}:${port}`));
  } catch (err) {
    error(err);
  }
};

run();
