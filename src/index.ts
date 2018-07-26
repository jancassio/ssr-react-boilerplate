import express from 'express';
import {  } from './server/router';

import { app, start } from './server/server';

app.use(express.static(`dist/public`));
app.use((req, res, next) => require('./server/router')(req, res, next));

start();
