const siteRedirects = {
    redirects: [
        {
            to: '/developers/docs/roadmap',
            from: [
                // '/developers/weaviate/current/roadmap', // handled by createRedirects
                '/developers/weaviate/current/roadmap/architectural-roadmap.html',
                '/developers/weaviate/current/roadmap/feature-roadmap.html',
            ]
        },              
        {
            to: '/developers/docs/concepts/data',
            from: '/developers/weaviate/current/core-knowledge/basics.html'
        },
        {
            to: '/developers/docs/client-libraries',
            from: '/developers/weaviate/current/core-knowledge/clients.html'
        },
        {
            to: '/developers/docs/quickstart/console',
            from: '/developers/weaviate/current/core-knowledge/console.html'
        },
        {
            to: '/developers/docs/configuration/schema-configuration',
            from: '/developers/weaviate/current/schema'
        },
        {
            to: '/developers/docs/configuration/datatypes',
            from: '/developers/weaviate/current/schema/datatypes.html'
        },
        {
            to: '/developers/docs/configuration/schema-configuration',
            from: '/developers/weaviate/current/schema/schema-configuration.html'
        },
        // {
        //     to: '/developers/docs/tutorials/',
        //     from: '/developers/weaviate/current/tutorials'
        // },
        {
            to: '/developers/docs/more-resources/example-datasets',
            from: '/developers/weaviate/current/tutorials/example-datasets.html'
        },
        {
            to: '/developers/docs/tutorials/how-to-create-a-schema',
            from: '/developers/weaviate/current/tutorials/how-to-create-a-schema.html'
        },
        {
            to: '/developers/docs/tutorials',
            from: '/developers/weaviate/current/tutorials/how-to-do-classification.html'
        },
        {
            to: '/developers/docs/tutorials',
            from: '/developers/weaviate/current/tutorials/how-to-perform-a-semantic-search.html'
        },
        {
            to: '/developers/docs/tutorials',
            from: '/developers/weaviate/current/tutorials/how-to-query-data.html'
        },
        {
            to: '/developers/docs/tutorials',
            from: '/developers/weaviate/current/tutorials/how-to-use-weaviate-without-modules.html'
        },
        {
            to: '/developers/docs/tutorials',
            from: '/developers/weaviate/current/tutorials/other-examples.html'
        },
        {
            to: '/developers/docs/tutorials',
            from: '/developers/weaviate/current/tutorials/quick-start-with-the-text2vec-contextionary-module.html'
        },
        {
            to: '/developers/docs/tutorials',
            from: '/developers/weaviate/current/tutorials/semantic-search-through-wikipedia.html'
        },
        {
            to: '/developers/docs/more-resources/write-great-bug-reports',
            from: '/developers/weaviate/current/tutorials/write-great-bug-reports.html'
        },
        {
            to: '/developers/docs/concepts/vector-index-plugins',
            from: '/developers/weaviate/current/vector-index-plugins'
        },
        {
            to: '/developers/docs/configuration/distances',
            from: '/developers/weaviate/current/vector-index-plugins/distances.html'
        },
        {
            to: '/developers/docs/concepts/vector-index-plugins',
            from: '/developers/weaviate/current/vector-index-plugins/hnsw.html'
        },
        {
            to: '/developers/docs/',
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
                existingPath.replace('/docs/api/graphql', '/weaviate/current/graphql-references'),
            ]
        }
        if (existingPath.includes('/modules/retriever-vectorizer-modules')) {
            return [
                existingPath.replace('/docs/modules/retriever-vectorizer-modules', '/weaviate/current/retriever-vectorizer-modules'),
            ]
        }
        if (existingPath.includes('/modules/reader-generator-modules')) {
            return [
                existingPath.replace('/docs/modules/reader-generator-modules', '/weaviate/current/reader-generator-modules'),
            ]
        }
        if (existingPath.includes('/modules/other-modules')) {
            return [
                existingPath.replace('/docs/modules/other-modules', '/weaviate/current/other-modules'),
            ]
        }
        if (existingPath.includes('/api/rest')) {
            return [
                existingPath.replace('/docs/api/rest', '/weaviate/current/restful-api-references'),
            ]
        }
        
        if (existingPath.includes('/core-knowledge')) {
            return [
                existingPath.replace('/docs/concepts', '/weaviate/current/core-knowledge'),
            ]
        }        
        if (existingPath.includes('/concepts')) {
            return [
                existingPath.replace('/docs/concepts', '/weaviate/current/architecture'),
            ]
        }
        if (existingPath.includes('/quickstart')) {
            return [
                existingPath.replace('/docs/quickstart', '/weaviate/current/getting-started'),
            ]
        }

        if (existingPath.includes('/docs')) {
            return [
                existingPath.replace('/docs', '/weaviate/current'),
            ]
        }

        if (existingPath.includes('/contributor-guide/weaviate-modules')) {
            return [
                existingPath.replace('/contributor-guide/weaviate-modules', '/contributor-guide/current/weaviate-module-system'),
            ]
        }
        if (existingPath.includes('/contributor-guide')) {
            return [
                existingPath.replace('/developers/contributor-guide', '/developers/contributor-guide/current'),
            ]
        }


        // if (existingPath.includes('/tutorials')) {
        //     return [
        //         existingPath.replace('/developers/tutorials-essential', '/developers/tutorials/current'),
        //     ]
        // }            

        return undefined; // Return a falsy value: no redirect created
    },
}

module.exports = siteRedirects;