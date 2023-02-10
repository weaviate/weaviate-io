// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const remarkReplace = require('./src/remark/remark-replace');
const siteRedirects = require('./site.redirects');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Weaviate - vector search engine',
    tagline:
        'Weaviate empowers developers to deliver, scalable vector search-powered apps painlessly',
    url: 'https://weaviate.io',
    baseUrl: '/',
    trailingSlash: false,
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'weaviate', // Usually your GitHub org/user name.
    projectName: 'weaviate-io', // Usually your repo name.
    plugins: [
        'docusaurus-plugin-sass',
        ['@docusaurus/plugin-client-redirects', siteRedirects],

        // Playbook configuration
        [
            '@docusaurus/plugin-content-blog',
            {
                blogTitle: 'Weaviate Playbook',
                blogDescription: 'Learn How we run Weaviate as a Company',
                blogSidebarCount: 12,
                postsPerPage: 6,
                blogSidebarTitle: 'Weaviate Playbook',

                id: 'playbook-blog',
                routeBasePath: '/company/playbook',
                // path to data on filesystem relative to site dir.
                path: 'playbook',
                authorsMapPath: '../authors.yml',
                showReadingTime: true,
            },
        ],
        // Add HTML Header tags
        () => ({
            name: "inject-tag",
            injectHtmlTags() {
                return {
                    headTags: [
                    // Add plausible
                    {
                        tagName: 'script',
                        attributes: {
                            defer: '',
                            'data-domain': 'weaviate.io',
                            src:'https://plausible.io/js/plausible.js',
                        },
                    },
                    // Add hotjar
                    {
                        tagName: 'script',
                        innerHTML: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:3237492,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
                    }],
                };
            },
        })
    ],

    stylesheets: [
        //Add Font Awesome stylesheets
        '/fonts/font-awesome/fontawesome.css',
        '/fonts/font-awesome/solid.css',
        '/fonts/font-awesome/regular.css',
        '/fonts/font-awesome/brands.css'
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
                    
                    // TODO: Update to 'main' for release
                    editUrl:
                        'https://github.com/weaviate/weaviate-io/tree/main/',
                    remarkPlugins: [remarkReplace],
                },
                blog: {
                    showReadingTime: true,
                    authorsMapPath: '../authors.yml',
                    editUrl:
                        'https://github.com/weaviate/weaviate-io/tree/main/',
                    blogSidebarCount: 12,
                    postsPerPage: 6,
                },
                theme: {
                    customCss: [
                        require.resolve('./src/css/custom.scss'),
                        require.resolve('./src/css/blog-and-docs.scss'),
                    ],
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            image: 'og/default.jpg',

            announcementBar: {
                id: 'announcement-bar',
                content:
                    // 'We are excited to announce our new generative search module! <a target="_blank" rel="noopener noreferrer" href="https://www.prnewswire.com/news-releases/weaviate-releases-a-generative-search-module-301740697.html">press release</a> - <a target="_blank" rel="noopener noreferrer" href="/developers/weaviate/modules/reader-generator-modules/qna-openai">documentation</a>',
                    'We are excited to announce the first generative search module for Weaviate! <a target="_blank" rel="noopener noreferrer" href="https://www.prnewswire.com/news-releases/weaviate-releases-a-generative-search-module-301740697.html">press release</a> - <a target="_blank" rel="noopener noreferrer" href="/developers/weaviate/modules/reader-generator-modules/generative-openai">documentation</a>',
                // backgroundColor: '#00b800',
                backgroundColor: '#2d3197',
                textColor: '#fff',
                isCloseable: true,
            },
            navbar: {
                title: '',
                // hideOnScroll: true,
                logo: {
                    alt: 'Weaviate',
                    src: '/img/site/weaviate-nav-logo-light.svg',
                },
                items: [
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
                                href: 'https://console.weaviate.io/',
                            },
                        ],
                    },
                    {
                        type: 'dropdown',
                        label: 'Company',
                        position: 'right',
                        items: [
                            {
                                label: 'About us',
                                to: '/company/about-us',
                            },
                            {
                                label: 'Playbook',
                                to: '/company/playbook',
                            },
                            {
                                label: 'Careers',
                                href: 'https://careers.weaviate.io/',
                            },
                            {
                                label: 'Investors',
                                to: '/company/investors',
                            },
                            {
                                label: 'Contact us',
                                href: 'mailto:hello@weaviate.io',
                            },
                        ],
                    },
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
                                href: 'https://newsletter.weaviate.io',
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
                                label: 'GitHub',
                                href: 'https://github.com/weaviate/weaviate',
                            },
                            {
                                label: 'Slack',
                                href: 'https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw',
                            },
                        ],
                    },
                    
                    {
                        to: 'https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw/',
                        label: ' ',
                        position: 'right',
                        target: '_blank',
                        className: 'fa-brands fa-lg fa-slack',
                    },
                    {
                        to: 'https://github.com/weaviate/weaviate',
                        label: ' ',
                        position: 'right',
                        target: '_blank',
                        className: 'fa-brands fa-lg fa-github',
                    },
                    {
                        to: 'https://twitter.com/weaviate_io',
                        label: ' ',
                        position: 'right',
                        target: '_blank',
                        className: 'fa-brands fa-lg fa-twitter',
                    },
                    {
                        to: 'https://www.youtube.com/@Weaviate/playlists',
                        label: ' ',
                        position: 'right',
                        target: '_blank',
                        className: 'fa-brands fa-lg fa-youtube',
                    },
                    {
                        to: 'https://open.spotify.com/show/4TlG6dnrWYdgN2YHpoSnM7',
                        label: ' ',
                        position: 'right',
                        target: '_blank',
                        className: 'fa-brands fa-lg fa-spotify',
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
                    //       label: 'Getting Started',
                    //       to: '/developers/weaviate/quickstart',
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
                                href: 'https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw/',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/weaviate_io',
                            },
                        ],
                    },
                    {
                        title: 'Meetups',
                        items: [
                            {
                                label: 'Amsterdam',
                                href: 'https://www.meetup.com/weaviate-amsterdam',
                            },
                            {
                                label: 'Boston',
                                href: 'https://www.meetup.com/weaviate-boston',
                            },
                            {
                                label: 'New York',
                                href: 'https://www.meetup.com/weaviate-NYC',
                            },
                            {
                                label: 'San Francisco',
                                href: 'https://www.meetup.com/weaviate-san-francisco',
                            },
                            {
                                label: 'Toronto',
                                href: 'https://www.meetup.com/weaviate-toronto',
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
                            {
                              label: 'Podcast',
                              to: '/podcast',
                            },
                            {
                              label: 'Playbook',
                              to: 'company/playbook',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/weaviate/weaviate',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Weaviate, B.V. Built with Docusaurus.`,
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
