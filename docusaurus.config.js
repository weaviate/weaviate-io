// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const remarkReplace = require('./src/remark/remark-replace');
const siteRedirects = require('./site.redirects');

// Math equation plugins
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {


    title: 'Weaviate - Vector Database',
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

        [
            '@docusaurus/plugin-google-gtag',
            {
                trackingID: process.env.GOOGLE_TRACKING_ID || 'None',
                anonymizeIP: true,
            },
        ],

        [
            '@docusaurus/plugin-google-tag-manager',
            {
                containerId: process.env.GOOGLE_CONTAINER_ID || 'None',
            },
        ],

        'docusaurus-plugin-sass',
        ['@docusaurus/plugin-client-redirects', siteRedirects],

        // Playbook configuration
        [
            '@docusaurus/plugin-content-blog',
            {
                blogTitle: 'Playbook',
                blogDescription: 'Learn How we run Weaviate as a Company',
                blogSidebarCount: 0,
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
            name: 'inject-tag',
            injectHtmlTags() {
                return {
                    headTags: [
                        // Add plausible
                        {
                            tagName: 'script',
                            attributes: {
                                defer: '',
                                'data-domain': 'weaviate.io',
                                src: 'https://plausible.io/js/plausible.js',
                            },
                        },
                          // Add Scarf
                          {
                            tagName: 'img',
                             attributes: {
                                src: "https://static.scarf.sh/a.png?x-pxid=a41b0758-a3a9-4874-a880-8b5d5a363d40",
                                referrerPolicy: "no-referrer-when-downgrade",
                                style: "display: none;",
                                 },
                        },
                      
                        // Add hotjar
                        {
                            tagName: 'script',
                            innerHTML: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:3237492,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
                        },
                        // Add emailpig
                        {
                            tagName: 'script',
                            innerHTML: `(function (n) { if (typeof n !== "undefined" && n.webdriver) return; var script = document.createElement("script"); script.type = "text/javascript"; script.async = 1; script.src = "https://www.emailpig.com/_functions/myF/823adf31-4fd9-4a44-8491-9de559b8c428?q=" + encodeURIComponent(window.location.href) + "&r=" + document.referrer; document.head.appendChild(script); })(navigator);`,
                        },
                    ],
                };
            },
        }),
    ],

 
    stylesheets: [
        // Add Font Awesome stylesheets
        '/fonts/font-awesome/fontawesome.css',
        '/fonts/font-awesome/solid.css',
        '/fonts/font-awesome/regular.css',
        '/fonts/font-awesome/brands.css',


        {
            // styles for math equations
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity:
                'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        },

    ],

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
  /*   i18n: {
   defaultLocale: 'en',
   locales: ['en','ja'],
    }, */

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
                    remarkPlugins: [remarkReplace, math],
                    rehypePlugins: [katex],
                },
                blog: {
                    blogTitle: 'Blog',
                    showReadingTime: true,
                    authorsMapPath: '../authors.yml',
                    editUrl:
                        'https://github.com/weaviate/weaviate-io/tree/main/',
                    blogSidebarCount: 0,
                    postsPerPage: 12,
                    blogSidebarTitle: 'Weaviate Blog',
                    remarkPlugins: [math],
                    rehypePlugins: [katex],
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
                id: 'announcement-bar-python-client',
                content:
                    `We've updated the Python Client - introduced typing, faster imports, intuitive code, and more. Read <a target="_blank" rel="noopener noreferrer" href="/developers/weaviate/client-libraries/python">Shape the Future - Try Our New Python Client API</a> to learn more.`,
                backgroundColor: '#1C1468',
                textColor: '#F5F5F5',
                isCloseable: true,
            },
            docs: {
                sidebar: {
                    hideable: true,
                    autoCollapseCategories: true
                },
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
                        // type: 'dropdown',
                        label: 'Product',
                        position: 'right',
                        to: '/platform',
                        
                    },
                    {  type: 'dropdown',
                    label: 'Services',
                    position: 'right',
                    items: [
                        {
                            label: 'Services Overview',
                            href: '/services',
                           
                        },
                        {
                            label: 'Serverless',
                            href: '/services/serverless',
                           
                        },
                        {
                            label: 'Enterprise Dedicated',
                            href: '/services/enterprise-dedicated',
                           
                        },
                        {
                            label: 'Bring Your Own Cloud',
                            href: '/services/byoc',
                           
                        },
                        {
                            label: 'Education & Support',
                            href: '/services/education-and-support',
                           
                        },
                        {
                            label: 'Pricing',
                            href: '/pricing',
                           
                        },
                    ]
                }
                    ,
                    {
                        type: 'dropdown',
                        label: 'Developers',
                        position: 'right',
                        items: [
                            {
                                label: 'Weaviate Docs',
                                docId: 'weaviate/index',
                                sidebarid: 'docsSidebar',
                                type: 'doc',
                            },
                            {
                                label: 'Weaviate Cloud Services Docs',
                                docId: 'wcs/index',
                                sidebarid: 'wcsSidebar',
                                type: 'doc',
                            },
                            {
                                label: 'Academy',
                                docId: 'academy/index',
                                sidebarid: 'academySidebar',
                                type: 'doc',
                            },
                            {
                                label: 'Blog',
                                to: '/blog',
                               
                            },
                            {
                                label: 'Newsletter',
                                to: 'https://newsletter.weaviate.io/',
                            },
                            {
                                label: 'Events & Webinars',
                                to: '/community/events',
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
                                href: 'https://weaviate.io/slack',
                            },
                            {
                                label: 'Forum',
                                href: 'https://forum.weaviate.io',
                            },
                        ],
                    },
{
                    type: 'dropdown',
                    label: 'Partners',
                    position: 'right',
                    items: [
                        {
                            label: 'AWS',
                            href: '/partners/aws',
                        },
                        {
                            label: 'Google Cloud',
                            href: '/partners/gcp',
                        },
                        {
                            label: 'Snowflake',
                            href: '/partners/snowflake',
                        },
                        {
                            label: 'Become a Partner',
                            href: '/partners',
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
                                to: '/company/careers',
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
                        label: 'Try Now',
                        className: 'tryNow',
                        to: 'https://console.weaviate.cloud',
                        position: 'right',

                    },
                   /*  {
                        to: '/developers/academy',
                        label: ' ',
                        position: 'right',
                        target: '_blank',
                        className: 'fas fa-lg fa-graduation-cap',
                    },
                    {
                        to: 'https://weaviate.io/slack',
                        label: ' ',
                        position: 'right',
                        target: '_blank',
                        className: 'fab fa-lg fa-slack',
                    },
                    {
                        to: 'https://forum.weaviate.io',
                        label: ' ',
                        position: 'right',
                        target: '_blank',
                        className: 'fab fa-lg fa-discourse',
                    },
                    {
                        to: 'https://github.com/weaviate/weaviate',
                        label: ' ',
                        position: 'right',
                        target: '_blank',
                        className: 'fab fa-lg fa-github',
                    },
                    {
                        to: 'https://twitter.com/weaviate_io',
                        label: ' ',
                        position: 'right',
                        target: '_blank',
                        className: 'fab fa-lg fa-twitter',
                    },
                    {
                        to: 'https://newsletter.weaviate.io',
                        label: ' ',
                        position: 'right',
                        target: '_blank',
                        className: 'fas fa-lg fa-envelope',
                    },
                    {
                        to: '/podcast',
                        // to: 'https://www.youtube.com/@Weaviate/playlists',
                        label: ' ',
                        position: 'right',
                        // target: '_blank',
                        className: 'fas fa-lg fa-microphone',
                    },*/
                    {
                        type: 'search',
                        position: 'right',
                        className: 'hiddenSearch'
                    },
                ],
            },

            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Weaviate Cloud Services',
                        items: [
                            {
                                label: 'Pricing',
                                to: '/pricing',
                            },
                            {
                                label: 'Console',
                                to: 'https://console.weaviate.cloud/',
                            },
                            {
                                label: 'Partners',
                                to: '/partners',
                            },
                            {
                                label: 'Security',
                                href: '/security',
                           },
                            {
                                label: 'Terms & Policies',
                                to: 'service',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [

                            {
                                label: 'Slack',
                                to: 'https://weaviate.io/slack',
                            },
                            {
                                label: 'Instagram',
                                to: 'https://instagram.com/weaviate.io',
                            },
                            {
                                label: 'Twitter',
                                to: 'https://twitter.com/weaviate_io',
                            },
                            {
                                label: 'GitHub',
                                to: 'https://github.com/weaviate/weaviate',
                            },
                            {
                                label: 'Forum',
                                to: 'https://forum.weaviate.io',
                            },
                        ],
                    },
                    {
                        title: 'Meetups',
                        items: [
                            {
                                label: 'Amsterdam',
                                to: 'https://www.meetup.com/weaviate-amsterdam',
                            },
                            {
                                label: 'Boston',
                                to: 'https://www.meetup.com/weaviate-boston',
                            },
                            {
                                label: 'New York',
                                to: 'https://www.meetup.com/weaviate-NYC',
                            },
                            {
                                label: 'San Francisco',
                                to: 'https://www.meetup.com/weaviate-san-francisco',
                            },
                            {
                                label: 'Toronto',
                                to: 'https://www.meetup.com/weaviate-toronto',
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
                                label: 'Newsletter',
                                to: 'https://newsletter.weaviate.io/',
                            },


                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Weaviate, B.V. Built with Docusaurus.`,
            },
            colorMode: {
                defaultMode: 'light',
                disableSwitch: false,
                respectPrefersColorScheme: false,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['java'],
            },

            customConfig: {
                colorMode: {
                  defaultMode: 'light',
                  disableSwitch: false,
                  respectPrefersColorScheme: false,
                },
              },


              
        }),


};

module.exports = config;
