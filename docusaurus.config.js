// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const remarkReplace = require('./src/remark/remark-replace');
const siteRedirects = require('./site.redirects');


/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Weaviate - Just add Data',
    tagline:
        'Weaviate empowers developers to deliver, Scalable search-powered apps painlessly',
    // url: 'https://weaviate-docusaurus.netlify.app',
    url: 'https://weaviate.io',
    baseUrl: '/',
    trailingSlash: false,
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'semi-technologies', // Usually your GitHub org/user name.
    projectName: 'weaviate-io', // Usually your repo name.
    plugins: [
        'docusaurus-plugin-sass',
        [
            '@docusaurus/plugin-client-redirects',
            siteRedirects
        ]
    ],

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    // i18n: {
    //   defaultLocale: 'en',
    //   locales: ['en'],
    // },

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    path: 'developers', // folder name – where the docs are
                    routeBasePath: 'developers', // route name – where to navigate for docs i.e. weaviate.io/<route-base-path>/...
                    
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/semi-technologies/weaviate-io/tree/docusaurus-migration/',
                    // TODO: Update to 'main' for release
                    // 'https://github.com/semi-technologies/weaviate-io/tree/main/'
                    remarkPlugins: [remarkReplace],
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/semi-technologies/weaviate-io/tree/docusaurus-migration/',
                    // TODO: Update to 'main' for release
                    // 'https://github.com/semi-technologies/weaviate-io/tree/main/'
                },
                theme: {
                    customCss: [require.resolve('./src/css/custom.scss')],
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: '',
                logo: {
                    alt: 'Weaviate',
                    src: 'img/site/weaviate-logo.png',
                },
                items: [
                    {
                        type: 'dropdown',
                        label: 'Content',
                        position: 'right',
                        items: [
                            {
                                label: 'Blog',
                                to: '/blog',
                            },
                            {
                                label: 'Podcast',
                                to: '/podcast',
                            },
                            {
                                label: 'Newsletter',
                                href: 'http://weaviate-newsletter.semi.technology/',
                            },
                        ],
                    },
                    {
                        type: 'dropdown',
                        label: 'Developers',
                        position: 'right',
                        items: [
                            {
                                label: 'Docs',
                                docId: 'weaviate/index',
                                sidebarid: 'docsSidebar',
                                type: 'doc',
                            },
                            {
                                label: 'Contributor Guide',
                                docId: 'contributor-guide/index',
                                sidebarid: 'contributorSidebar',
                                type: 'doc',
                            },
                            {
                                label: 'Weaviate Cloud Service',
                                href: 'https://console.semi.technology/',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/semi-technologies/weaviate-io',
                            },
                            {
                                label: 'Slack',
                                href: 'https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw',
                            },
                        ],
                    },
                    {
                        type: 'dropdown',
                        label: 'Weaviate Cloud Service',
                        position: 'right',
                        items: [
                            {
                                label: 'Pricing',
                                to: '/pricing',
                            },
                            {
                                label: 'Try Now',
                                href: 'https://console.semi.technology/',
                            },
                        ],
                    },
                ],
            },

            footer: {
                style: 'dark',
                links: [
                    // {
                    //   title: 'Docs',
                    //   items: [
                    //     {
                    //       label: 'Tutorial',
                    //       to: '/developers/weaviate/getting-started',
                    //     },
                    //   ],
                    // },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Stack Overflow',
                                href: 'https://stackoverflow.com/tags/weaviate/',
                            },
                            {
                                label: 'Slack',
                                href: 'https://weaviate.slack.com/',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/weaviate_io',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'Blog',
                                to: '/blog',
                            },
                            // {
                            //   label: 'Podcast',
                            //   to: '/podcast',
                            // },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/semi-technologies/weaviate-io',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Weaviate, Inc. Built with Docusaurus.`,
            },
            colorMode: {
                defaultMode: 'dark',
                disableSwitch: false,
                respectPrefersColorScheme: false,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['java'],
            },
        }),
};

module.exports = config;
