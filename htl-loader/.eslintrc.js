module.exports = {
  'env': {
    'node': true,
    'es6': true
  },
  // this is the root project for all sub modules. stop searching for any
  // eslintrc files in parent directories.
  'root': true,
  'parserOptions': {
    'sourceType': 'script',
    // async/await support
    'ecmaVersion': 8
  },
  'plugins': [
    'header',
  ],
  'extends': 'airbnb-base',
  'rules': {
    'strict': 0,

    // allow dangling underscores for 'fields'
    'no-underscore-dangle': ['error', {'allowAfterThis': true}],
  }
};
