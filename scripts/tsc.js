const { tscfy } = require('./compile-tsc');

tscfy({
  watch: false,
  silent: false,
  // eslint-disable-next-line no-console
  errorCallback: () => console.error('Failed to compile ts'),
});
