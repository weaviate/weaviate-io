const siteRedirects = {
    redirects: [
        {
            to: '/docs/weaviate/roadmap',
            from: [
                // '/developers/weaviate/current/roadmap', // handled by createRedirects
                '/developers/weaviate/current/roadmap/architectural-roadmap.html',
                '/developers/weaviate/current/roadmap/feature-roadmap.html',
            ]
        },              
        {
            to: '/docs/weaviate/concepts/data',
            from: '/developers/weaviate/current/core-knowledge/basics.html'
        },
        {
            to: '/docs/weaviate/client-libraries',
            from: '/developers/weaviate/current/core-knowledge/clients.html'
        },
        {
            to: '/docs/weaviate/quickstart/console',
            from: '/developers/weaviate/current/core-knowledge/console.html'
        },
        {
            to: '/docs/weaviate/configuration/schema-configuration',
            from: '/developers/weaviate/current/schema'
        },
        {
            to: '/docs/weaviate/configuration/datatypes',
            from: '/developers/weaviate/current/schema/datatypes.html'
        },
        {
            to: '/docs/weaviate/configuration/schema-configuration',
            from: '/developers/weaviate/current/schema/schema-configuration.html'
        },
        // {
        //     to: '/docs/weaviate/tutorials/',
        //     from: '/developers/weaviate/current/tutorials'
        // },
        {
            to: '/docs/weaviate/more-resources/example-datasets',
            from: '/developers/weaviate/current/tutorials/example-datasets.html'
        },
        {
            to: '/docs/weaviate/tutorials/how-to-create-a-schema',
            from: '/developers/weaviate/current/tutorials/how-to-create-a-schema.html'
        },
        {
            to: '/docs/weaviate/tutorials',
            from: '/developers/weaviate/current/tutorials/how-to-do-classification.html'
        },
        {
            to: '/docs/weaviate/tutorials',
            from: '/developers/weaviate/current/tutorials/how-to-perform-a-semantic-search.html'
        },
        {
            to: '/docs/weaviate/tutorials',
            from: '/developers/weaviate/current/tutorials/how-to-query-data.html'
        },
        {
            to: '/docs/weaviate/tutorials',
            from: '/developers/weaviate/current/tutorials/how-to-use-weaviate-without-modules.html'
        },
        {
            to: '/docs/weaviate/tutorials',
            from: '/developers/weaviate/current/tutorials/other-examples.html'
        },
        {
            to: '/docs/weaviate/tutorials',
            from: '/developers/weaviate/current/tutorials/quick-start-with-the-text2vec-contextionary-module.html'
        },
        {
            to: '/docs/weaviate/tutorials',
            from: '/developers/weaviate/current/tutorials/semantic-search-through-wikipedia.html'
        },
        {
            to: '/docs/weaviate/more-resources/write-great-bug-reports',
            from: '/developers/weaviate/current/tutorials/write-great-bug-reports.html'
        },
        {
            to: '/docs/weaviate/concepts/vector-index-plugins',
            from: '/developers/weaviate/current/vector-index-plugins'
        },
        {
            to: '/docs/weaviate/configuration/distances',
            from: '/developers/weaviate/current/vector-index-plugins/distances.html'
        },
        {
            to: '/docs/weaviate/concepts/vector-index-plugins',
            from: '/developers/weaviate/current/vector-index-plugins/hnsw.html'
        },
        {
            to: '/docs/weaviate/',
            from: '/developers/weaviate/current/more-resources/deprecation-messages.html'
        },
    ],
    createRedirects(existingPath) {
        if (existingPath.includes('/blog')) {
            // Redirect from /blog/2022/06/{X} (etc) to /blog/{X}
            return [
                existingPath.replace('/blog', '/blog/2021/01'),
                existingPath.replace('/blog', '/blog/2021/02'),
                existingPath.replace('/blog', '/blog/2021/03'),
                existingPath.replace('/blog', '/blog/2021/05'),
                existingPath.replace('/blog', '/blog/2021/11'),
                existingPath.replace('/blog', '/blog/2022/06'),
                existingPath.replace('/blog', '/blog/2022/07'),
                existingPath.replace('/blog', '/blog/2022/08'),
                existingPath.replace('/blog', '/blog/2022/09'),
                existingPath.replace('/blog', '/blog/2022/10'),
                existingPath.replace('/blog', '/blog/2022/11'),
                existingPath.replace('/blog', '/blog/2022/12'),
            ];
        }
        if (existingPath.includes('/api/graphql')) {
            return [
                existingPath.replace('/docs/weaviate/api/graphql', '/developers/weaviate/current/graphql-references'),
            ]
        }
        if (existingPath.includes('/modules/retriever-vectorizer-modules')) {
            return [
                existingPath.replace('/docs/weaviate/modules/retriever-vectorizer-modules', '/developers/weaviate/current/retriever-vectorizer-modules'),
            ]
        }
        if (existingPath.includes('/modules/reader-generator-modules')) {
            return [
                existingPath.replace('/docs/weaviate/modules/reader-generator-modules', '/developers/weaviate/current/reader-generator-modules'),
            ]
        }
        if (existingPath.includes('/modules/other-modules')) {
            return [
                existingPath.replace('/docs/weaviate/modules/other-modules', '/developers/weaviate/current/other-modules'),
            ]
        }
        if (existingPath.includes('/api/rest')) {
            return [
                existingPath.replace('/docs/weaviate/api/rest', '/developers/weaviate/current/restful-api-references'),
            ]
        }
        
        if (existingPath.includes('/core-knowledge')) {
            return [
                existingPath.replace('/docs/weaviate/concepts', '/developers/weaviate/current/core-knowledge'),
            ]
        }        
        if (existingPath.includes('/concepts')) {
            return [
                existingPath.replace('/docs/weaviate/concepts', '/developers/weaviate/current/architecture'),
            ]
        }
        if (existingPath.includes('/quickstart')) {
            return [
                existingPath.replace('/docs/weaviate/quickstart', '/developers/weaviate/current/getting-started'),
            ]
        }

        if (existingPath.includes('/docs/weaviate')) {
            return [
                existingPath.replace('/docs/weaviate', '/developers/weaviate/current'),
            ]
        }

        if (existingPath.includes('/contributor-guide/weaviate-modules')) {
            return [
                existingPath.replace('/docs/contributor-guide/weaviate-modules', '/developers/contributor-guide/current/weaviate-module-system'),
            ]
        }
        if (existingPath.includes('/contributor-guide')) {
            return [
                existingPath.replace('/docs/contributor-guide', '/developers/contributor-guide/current'),
            ]
        }


        // if (existingPath.includes('/tutorials')) {
        //     return [
        //         existingPath.replace('/docs/weaviate/tutorials', '/developers/weaviate/current/tutorials'),
        //     ]
        // }            

        return undefined; // Return a falsy value: no redirect created
    },
}

module.exports = siteRedirects;