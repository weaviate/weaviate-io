const visit = require('unist-util-visit');
const fs = require('fs');

// Read file config, which contains weaviate_version, etc.
const readSiteConfig = () => {
  const data = fs.readFileSync('versions-config.json');
  return JSON.parse(data);
}

// pattern to match: ||site.some_name||
const pattern = /[|]{2}[ ]*site\.([a-z_]*)[ ]*[|]{2}/

const valueNodes = ['text', 'jsx', 'code', 'inlineCode'];
const valueNodeFilter = (node) => 
  valueNodes.includes(node.type) && // contains one of the types in valueNodes
  !!node.value && node.value.includes('||') // it contains text '||'

// THE MAIN BODY OF THE PLUGIN
const plugin = (options) => {
  const siteConfig = readSiteConfig();
  console.log(siteConfig);

  const transformer = async (ast, vfile) => {
    // First update all text, jsx, code and inlineCode elements
    visit(ast, valueNodeFilter, (node) => {
      node.value = node.value.replace(pattern, (_, name) => siteConfig[name]);
    });

    // Then update links
    visit(ast, 'link', (node) => {
      if(node.url.includes('||')) {
        node.url = node.url.replace(pattern, (_, name) => siteConfig[name]);
      }
    });
  };
  return transformer;
};

module.exports = plugin;
