import chalk from 'chalk';

export const log = (...args) => {
  const sbaem = chalk.rgb(255, 71, 133).bold('[sba]');
  /* eslint-disable no-console */
  console.log(`${sbaem}`, ...args);
};
