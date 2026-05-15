// @ts-check

/** @param {unknown} plugin */
const isRedirectPlugin = (plugin) => {
  return (
    Array.isArray(plugin) &&
    typeof plugin[0] === 'string' &&
    plugin[0] === '@docusaurus/plugin-client-redirects'
  );
};

module.exports = async function createDevConfigAsync() {
  const loadConfig = require('./docusaurus.config');

  const config =
    typeof loadConfig === 'function'
      ? await loadConfig()
      : loadConfig;

  config.plugins = (config.plugins || []).filter(
    (plugin) => !isRedirectPlugin(plugin)
  );

  config.trailingSlash = true;

  return config;
};