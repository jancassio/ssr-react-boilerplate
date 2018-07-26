// tslint:disable:no-console

import chalk from 'chalk';

export const log = (...text: string[]) => console.log(...text);
export const ok = (...text: string[]) => console.log(chalk.hex('#35F271')(...text));
export const info = (...text: string[]) => console.info(chalk.hex('#56C9FF')(...text));
export const warn = (...text: string[]) => console.warn(chalk.hex('#FFD166')(...text));
export const error = (...text: string[]) => console.error(chalk.hex('#DB3069')(...text));
