const siteRedirects = {
    // fromExtensions: ['html', 'htm'],
    redirects: [
        // Safeguard, weaviate.io/company
        {
            to: '/company/about-us',
            from: '/company'
        },
        {
            to: '/developers/weaviate/roadmap',
            from: [
                '/developers/weaviate/current/roadmap/index',
                '/developers/weaviate/current/roadmap/architectural-roadmap',
                '/developers/weaviate/current/roadmap/feature-roadmap',
            ]
        },
        {
            to: '/developers/weaviate/concepts/data',
            from: '/developers/weaviate/current/core-knowledge/basics'
        },
        {
            to: '/developers/weaviate/concepts/vector-index',
            from: [
                '/developers/weaviate/current/vector-index-plugins',
                '/developers/weaviate/current/vector-index-plugins/hnsw'
            ]
        },
        {
            to: '/developers/weaviate/client-libraries',
            from: '/developers/weaviate/current/core-knowledge/clients'
        },
        {
            to: '/developers/weaviate/tutorials/console',
            from: '/developers/weaviate/current/core-knowledge/console'
        },

        // Configuration redirects
        {
            to: '/developers/weaviate/configuration/datatypes',
            from: '/developers/weaviate/current/schema/datatypes'
        },
        {
            to: '/developers/weaviate/configuration/distances',
            from: '/developers/weaviate/current/vector-index-plugins/distances'
        },
        {
            to: '/developers/weaviate/configuration/indexes',
            from: '/developers/weaviate/current/configuration/vector-index-type'
        },
        {
            to: '/developers/weaviate/configuration/schema-configuration',
            from: [
                '/developers/weaviate/current/schema',
                '/developers/weaviate/current/schema/schema-configuration'
            ]
        },

        // More-resources redirects
        {
            to: '/developers/weaviate/more-resources/example-datasets',
            from: '/developers/weaviate/current/tutorials/example-datasets'
        },
        {
            to: '/developers/weaviate/more-resources/write-great-bug-reports',
            from: '/developers/weaviate/current/tutorials/write-great-bug-reports'
        },
        {
            to: '/developers/weaviate/',
            from: '/developers/weaviate/current/more-resources/deprecation-messages'
        },

        // Quickstart redirects
        {
            to: '/developers/weaviate/tutorials/schema',
            from: '/developers/weaviate/quickstart/schema',
        },
        {
            to: '/developers/weaviate/tutorials/import',
            from: '/developers/weaviate/quickstart/import',
        },
        {
            to: '/developers/weaviate/tutorials/query',
            from: '/developers/weaviate/quickstart/query',
        },
        {
            to: '/developers/weaviate/tutorials/modules',
            from: '/developers/weaviate/quickstart/modules',
        },
        {
            to: '/developers/weaviate/tutorials/console',
            from: '/developers/weaviate/quickstart/console',
        },        

        // Quickstart redirects
        {
            to: '/developers/weaviate/tutorials/schema',
            from: '/developers/weaviate/current/quickstart/schema'
        },
        {
            to: '/developers/weaviate/tutorials/import',
            from: '/developers/weaviate/current/quickstart/import'
        },
        {
            to: '/developers/weaviate/tutorials/query',
            from: '/developers/weaviate/current/quickstart/query'
        },
        {
            to: '/developers/weaviate/tutorials/modules',
            from: '/developers/weaviate/current/quickstart/modules'
        },
        {
            to: '/developers/weaviate/tutorials/console',
            from: '/developers/weaviate/current/quickstart/console'
        }, 

        // Tutorial redirects
        {
            to: '/developers/weaviate/tutorials/schema',
            from: '/developers/weaviate/current/tutorials/how-to-create-a-schema'
        },
        {
            to: '/developers/weaviate/tutorials/query',
            from: '/developers/weaviate/current/tutorials/how-to-query-data'
        },
        {
            to: '/developers/weaviate/tutorials/query',
            from: '/developers/weaviate/current/tutorials/how-to-perform-a-semantic-search'
        },
        {
            to: '/developers/weaviate/tutorials/query',
            from: '/developers/weaviate/current/tutorials/semantic-search-through-wikipedia'
        },

        {
            to: '/developers/weaviate/tutorials',
            from: [
                '/developers/weaviate/current/tutorials/how-to-do-classification',
                '/developers/weaviate/current/tutorials/how-to-use-weaviate-without-modules',
                '/developers/weaviate/current/tutorials/other-examples',
                '/developers/weaviate/current/tutorials/quick-start-with-the-text2vec-contextionary-module',
            ]
        },

        // Blog redirects
        {
            to: '/blog/understand-your-unstructured-data',
            from: '/blog/2021/01/understand-your-unstructured-data'
        },
        {
            to: '/blog/history-of-weaviate',
            from: '/blog/2021/01/The-history-of-Weaviate'
        },
        {
            to: '/blog/GraphQL-API-design',
            from: '/blog/2021/01/GraphQL-API-design'
        },
        {
            to: '/blog/CRUD-support-in-Weaviate',
            from: '/blog/2021/02/CRUD-support-in-Weaviate'
        },
        {
            to: '/blog/weaviate-1-2-transformer-models',
            from: '/blog/2021/03/Weaviate-1-2-transformer-models'
        },
        {
            to: '/blog/Docker-and-Containers-with-Weaviate',
            from: '/blog/2021/05/Docker-and-Containers-with-Weaviate'
        },
        {
            to: '/blog/Semantic-Search-with-Wikipedia-and-Weaviate',
            from: '/blog/2021/11/Semantic-Search-with-Wikipedia-and-Weaviate'
        },
        {
            to: '/blog/The-AI-First-Database-Ecosystem',
            from: '/blog/2022/06/The-AI-First-Database-Ecosystem'
        },
        {
            to: '/blog/weaviate-1-14-release',
            from: '/blog/2022/07/Weaviate-release-1-14'
        },
        {
            to: '/blog/Using-Cross-Encoders-as-reranker-in-multistage-vector-search',
            from: '/blog/2022/08/Using-Cross-Encoders-as-reranker-in-multistage-vector-search'
        },
        {
            to: '/blog/GOMEMLIMIT-a-Game-Changer-for-High-Memory-Applications',
            from: '/blog/2022/08/GOMEMLIMIT-a-Game-Changer-for-High-Memory-Applications'
        },
        {
            to: '/blog/Research-Insights-Spider',
            from: '/blog/2022/08/Research-Insights-Spider'
        },
        {
            to: '/blog/Weaviate-Cloud-Service',
            from: '/blog/2022/09/Weaviate-Cloud-Service'
        },
        {
            to: '/blog/weaviate-1-15-release',
            from: '/blog/2022/09/Weaviate-release-1-15'
        },
        {
            to: '/blog/Why-is-Vector-Search-so-fast',
            from: '/blog/2022/09/Why-is-Vector-Search-so-fast'
        },
        {
            to: '/blog/Distance-Metrics-in-Vector-Search',
            from: '/blog/2022/09/Distance-Metrics-in-Vector-Search'
        },
        {
            to: '/blog/weaviate-1-15-1-release',
            from: '/blog/2022/09/Weaviate-release-1-15-1'
        },
        {
            to: '/blog/Hugging-Face-Inference-API-in-Weaviate',
            from: '/blog/2022/09/Hugging-Face-Inference-API-in-Weaviate'
        },
        {
            to: '/blog/How-to-Choose-a-Sentence-Transformer-from-Hugging-Face',
            from: '/blog/2022/10/How-to-Choose-a-Sentence-Transformer-from-Hugging-Face'
        },
        {
            to: '/blog/ANN-algorithms-Vamana-vs-HNSW',
            from: '/blog/2022/10/ANN-algorithms-Vamana-vs-HNSW'
        },
        {
            to: '/blog/how-to-build-an-image-search-application-with-weaviate',
            from: '/blog/2022/10/how-to-build-an-image-search-application-with-weaviate'
        },
        {
            to: '/blog/Lock-striping-pattern',
            from: '/blog/2022/10/Lock-striping-pattern'
        },
        {
            to: '/blog/weaviate-1-16-release',
            from: '/blog/2022/11/Weaviate-release-1-16'
        },
        {
            to: '/blog/tutorial-backup-and-restore-in-weaviate',
            from: '/blog/2022/11/tutorial-backup-and-restore-in-weaviate'
        },
        {
            to: '/blog/ref2vec-centroid',
            from: '/blog/2022/11/ref2vec-centroid'
        },
        {
            to: '/blog/vector-library-vs-vector-database',
            from: '/blog/2022/12/vector-library-vs-vector-database'
        },
        {
            to: '/blog/sphere-dataset-in-weaviate',
            from: '/blog/2022/12/sphere-dataset-in-weaviate'
        },
        {
            to: '/blog/Cohere-multilingual-with-weaviate',
            from: '/blog/2022/12/Cohere-multilingual-with-weaviate'
        },
        {
            to: '/blog/weaviate-1-17-release',
            from: '/blog/2022/12/Weaviate-release-1-17'
        },
        {
            to: '/blog/details-behind-the-sphere-dataset-in-weaviate',
            from: '/blog/2022/12/details-behind-the-sphere-dataset-in-weaviate'
        },
        {
            to: '/blog/hybrid-search-explained',
            from: '/blog/2023/01/Hybrid-Search-Explained'
        },
        {
            to: '/blog/pulling-back-the-curtains-on-text2vec',
            from: '/blog/2023/01/pulling-back-the-curtains-on-text2vec'
        },
        {
            to: '/blog/vector-embeddings-explained',
            from: '/blog/2023/01/Vector-Embeddings-Explained'
        },
    ],
    createRedirects(existingPath) {
        if (existingPath.includes('/weaviate/api/graphql')) {
            return [
                existingPath.replace(
                    '/weaviate/api/graphql',
                    '/weaviate/current/graphql-references'),
            ]
        }
        if (existingPath.includes('/weaviate/modules/retriever-vectorizer-modules')) {
            return [
                existingPath.replace(
                    '/weaviate/modules/retriever-vectorizer-modules',
                    '/weaviate/current/retriever-vectorizer-modules'),
            ]
        }
        if (existingPath.includes('/weaviate/modules/reader-generator-modules')) {
            return [
                existingPath.replace(
                    '/weaviate/modules/reader-generator-modules',
                    '/weaviate/current/reader-generator-modules'),
            ]
        }
        if (existingPath.includes('/weaviate/modules/other-modules')) {
            return [
                existingPath.replace(
                    '/weaviate/modules/other-modules',
                    '/weaviate/current/other-modules'),
            ]
        }
        if (existingPath.includes('/weaviate/api/rest')) {
            return [
                existingPath.replace(
                    '/weaviate/api/rest',
                    '/weaviate/current/restful-api-references'),
            ]
        }

        if (existingPath.includes('/weaviate/concepts/replication-architecture')) {
            return [
                existingPath.replace(
                    '/weaviate/concepts/replication-architecture',
                    '/weaviate/current/replication-architecture'),
            ]
        }
        if (existingPath.includes('/weaviate/concepts')) {
            return [
                existingPath.replace(
                    '/weaviate/concepts',
                    '/weaviate/current/core-knowledge'),
                existingPath.replace(
                    '/weaviate/concepts',
                    '/weaviate/current/architecture'),
            ]
        }
        if (existingPath.includes('/weaviate/quickstart')) {
            return [
                existingPath.replace(
                    '/weaviate/quickstart',
                    '/weaviate/current/getting-started'),
            ]
        }

        // Any remaining weaviate docs redirects
        if (existingPath.includes('/developers/weaviate')) {
            return [
                existingPath.replace(
                    '/developers/weaviate',
                    '/developers/weaviate/current'),
            ]
        }
        
        // Contributor Guide redirects
        if (existingPath.includes('/contributor-guide/weaviate-modules')) {
            return [
                existingPath.replace(
                    '/developers/contributor-guide/weaviate-modules',
                    '/developers/contributor-guide/current/weaviate-module-system'),
            ]
        }
        if (existingPath.includes('/contributor-guide')) {
            return [
                existingPath.replace(
                    '/developers/contributor-guide',
                    '/developers/contributor-guide/current'),
            ]
        }       

        return undefined; // Return a falsy value: no redirect created
    },
}

module.exports = siteRedirects;