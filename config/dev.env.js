var merge = require('webpack-merge');

var prodEnv = require('try-require')('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"dev"'
});
