const path = require('path');

module.exports = {
  models: require('./models'),
  components: require('./components'),
  roots: [ path.resolve(__dirname, 'jcr_root') ],
};
