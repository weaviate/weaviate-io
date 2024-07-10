let config = require('./docusaurus.config')

const isRedirectPlugin = (plugin) => {
    // the redirect plugin is an array
    // with '@docusaurus/plugin-client-redirects' as the first item
    return Array.isArray(plugin) && plugin[0] == '@docusaurus/plugin-client-redirects';
}

// remove the redirect plugin, to esure that
// we don't use redirects for links within our docs
config.plugins = config.plugins.filter(plugin => !isRedirectPlugin(plugin));

// use trailing slash, to be able to use link checker on a local build folder
config.trailingSlash = true;

module.exports = config;