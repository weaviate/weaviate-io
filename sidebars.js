/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'autogenerated',
      dirName: 'weaviate'
    },
    {
      type: 'html',
      value: '<div class="separator"></div>',
    },
    {
      type: 'link',
      label: 'Weaviate Cloud docs',
      href: 'https://docs.weaviate.io/cloud',
    },
    {
      type: 'link',
      label: 'Contributor guide',
      href: 'https://docs.weaviate.io/contributor-guide',
    },
  ],
  academySidebar: [
    {
      type: 'autogenerated',
      dirName: 'academy'
    },
  ],
  contributorSidebar: [
    {
      type: 'autogenerated',
      dirName: 'contributor-guide'
    },
  ],
  agentsSidebar: [
    {
      type: 'autogenerated',
      dirName: 'agents'
    },
  ],
  wcsSidebar: [
    {
      type: 'autogenerated',
      dirName: 'wcs'
    },
    {
      type: 'html',
      value: '<div class="separator"></div>',
    },
    {
      type: 'link',
      label: 'Weaviate docs',
      href: 'https://docs.weaviate.io/weaviate',
    },
    {
      type: 'link',
      label: 'Contributor guide',
      href: 'https://docs.weaviate.io/contributor-guide',
    },
  ],
  integrationsSidebar: [
    {
      type: 'autogenerated',
      dirName: 'integrations'
    },
  ],
};

module.exports = sidebars;
