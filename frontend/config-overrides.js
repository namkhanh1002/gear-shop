const { override, disableEsLint } = require('customize-cra');

module.exports = override(disableEsLint());

module.exports.devServer = function(devServerConfig) {
  devServerConfig.allowedHosts = 'all';
  return devServerConfig;
};