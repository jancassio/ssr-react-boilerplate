import webpack, { Compiler } from 'webpack';

import config from '../webpack.config';
import { hookEvents } from './lib/hooks';
import { server } from './server';

const bundler = webpack(config);

hookEvents(bundler.compilers as Compiler[]);
server(bundler);
