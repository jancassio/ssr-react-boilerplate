import { Compiler } from 'webpack';

import chalk from 'chalk';
import { info, ok } from './logger';

export const hookEvents = (compiler: Compiler[]) => {
  compiler.forEach((comp) => {
    comp.hooks.done.tap('AsyncSeriesHook',
    () => {
      info(`ℹ Bundle ${comp.name}: Done`);
      Object.keys(require.cache).forEach((id) =>
          (/[\/\\](client|shared|server)[\/\\]/.test(id)) ? delete require.cache[id] : null,
        );
      ok('✔ Flush cached', chalk.bgHex('#23A04B').black(comp.name), 'bundle: Done');
      },
    );
  });
};
