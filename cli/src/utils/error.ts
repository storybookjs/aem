export const error = (message, exit) => {
  /* eslint-disable no-console */
  console.error(message);
  /* eslint-disable no-unused-expressions */
  exit && process.exit(1);
};
