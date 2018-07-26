import webpack from 'webpack';
import config from '../webpack.config';
import { error, warn } from './lib/logger';

webpack(config, (err: any, stats: any) => {
  if (err) {
    error(err.stack || err);
    if (err.details) {
      error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    error(info.errors);
  }

  if (stats.hasWarnings()) {
    warn(info.warnings);
  }
});
