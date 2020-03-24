export const error = (message, exit) => {
  console.error(message);
  exit && process.exit(1);
};
