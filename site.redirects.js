const siteRedirects = {
    redirects: [
        // Safeguard, weaviate.io/company
        {
            to: '/company/about-us',
            from: '/company'
        },
        {
            to: '/developers/weaviate/roadmap',
            from: [
                '/developers/weaviate/current/roadmap/index.html',
                '/developers/weaviate/current/roadmap/architectural-roadmap.html',
                '/developers/weaviate/current/roadmap/feature-roadmap.html',
            ]
        },              
        {
            to: '/developers/weaviate/concepts/data',
            from: '/developers/weaviate/current/core-knowledge/basics.html'
        },
        {
            to: '/developers/weaviate/concepts/vector-index',
            from: [
                '/developers/weaviate/current/vector-index-plugins',
                '/developers/weaviate/current/vector-index-plugins/hnsw.html'
            ]
        },
        {
            to: '/developers/weaviate/client-libraries',
            from: '/developers/weaviate/current/core-knowledge/clients.html'
        },
        {
            to: '/developers/weaviate/quickstart/console',
            from: '/developers/weaviate/current/core-knowledge/console.html'
        },

        // Configuration redirects
        {
            to: '/developers/weaviate/configuration/datatypes',
            from: '/developers/weaviate/current/schema/datatypes.html'
        },
        {
            to: '/developers/weaviate/configuration/distances',
            from: '/developers/weaviate/current/vector-index-plugins/distances.html'
        },
        {
            to: '/developers/weaviate/configuration/indexes',
            from: '/developers/weaviate/current/configuration/vector-index-type.html'
        },
        {
            to: '/developers/weaviate/configuration/schema-configuration',
            from: [
                '/developers/weaviate/current/schema',
                '/developers/weaviate/current/schema/schema-configuration.html'
            ]
        },

        // More-resources redirects
        {
            to: '/developers/weaviate/more-resources/example-datasets',
            from: '/developers/weaviate/current/tutorials/example-datasets.html'
        },
        {
            to: '/developers/weaviate/more-resources/write-great-bug-reports',
            from: '/developers/weaviate/current/tutorials/write-great-bug-reports.html'
        },
        {
            to: '/developers/weaviate/',
            from: '/developers/weaviate/current/more-resources/deprecation-messages.html'
        },

        // Tutorial redirects
        {
            to: '/developers/weaviate/tutorials/how-to-create-a-schema',
            from: '/developers/weaviate/current/tutorials/how-to-create-a-schema.html'
        },
        {
            to: '/developers/weaviate/tutorials',
            from: [
                '/developers/weaviate/current/tutorials/how-to-do-classification.html',
                '/developers/weaviate/current/tutorials/how-to-perform-a-semantic-search.html',
                '/developers/weaviate/current/tutorials/how-to-query-data.html',
                '/developers/weaviate/current/tutorials/how-to-use-weaviate-without-modules.html',
                '/developers/weaviate/current/tutorials/other-examples.html',
                '/developers/weaviate/current/tutorials/quick-start-with-the-text2vec-contextionary-module.html',
                '/developers/weaviate/current/tutorials/semantic-search-through-wikipedia.html'
            ]
        },

        // Blog redirects
        {
            to: '/blog/understand-your-unstructured-data',
            from: '/blog/2021/01/understand-your-unstructured-data.html'
        },
        {
            to: '/blog/history-of-weaviate',
            from: '/blog/2021/01/The-history-of-Weaviate.html'
        },
        {
            to: '/blog/GraphQL-API-design',
            from: '/blog/2021/01/GraphQL-API-design.html'
        },
        {
            to: '/blog/CRUD-support-in-Weaviate',
            from: '/blog/2021/02/CRUD-support-in-Weaviate.html'
        },
        {
            to: '/blog/weaviate-1-2-transformer-models',
            from: '/blog/2021/03/Weaviate-1-2-transformer-models.html'
        },
        {
            to: '/blog/Docker-and-Containers-with-Weaviate',
            from: '/blog/2021/05/Docker-and-Containers-with-Weaviate.html'
        },
        {
            to: '/blog/Semantic-Search-with-Wikipedia-and-Weaviate',
            from: '/blog/2021/11/Semantic-Search-with-Wikipedia-and-Weaviate.html'
        },
        {
            to: '/blog/The-AI-First-Database-Ecosystem',
            from: '/blog/2022/06/The-AI-First-Database-Ecosystem.html'
        },
        {
            to: '/blog/weaviate-1-14-release',
            from: '/blog/2022/07/Weaviate-release-1-14.html'
        },
        {
            to: '/blog/Using-Cross-Encoders-as-reranker-in-multistage-vector-search',
            from: '/blog/2022/08/Using-Cross-Encoders-as-reranker-in-multistage-vector-search.html'
        },
        {
            to: '/blog/GOMEMLIMIT-a-Game-Changer-for-High-Memory-Applications',
            from: '/blog/2022/08/GOMEMLIMIT-a-Game-Changer-for-High-Memory-Applications.html'
        },
        {
            to: '/blog/Research-Insights-Spider',
            from: '/blog/2022/08/Research-Insights-Spider.html'
        },
        {
            to: '/blog/Weaviate-Cloud-Service',
            from: '/blog/2022/09/Weaviate-Cloud-Service.html'
        },
        {
            to: '/blog/weaviate-1-15-release',
            from: '/blog/2022/09/Weaviate-release-1-15.html'
        },
        {
            to: '/blog/Why-is-Vector-Search-so-fast',
            from: '/blog/2022/09/Why-is-Vector-Search-so-fast.html'
        },
        {
            to: '/blog/Distance-Metrics-in-Vector-Search',
            from: '/blog/2022/09/Distance-Metrics-in-Vector-Search.html'
        },
        {
            to: '/blog/weaviate-1-15-1-release',
            from: '/blog/2022/09/Weaviate-release-1-15-1.html'
        },
        {
            to: '/blog/Hugging-Face-Inference-API-in-Weaviate',
            from: '/blog/2022/09/Hugging-Face-Inference-API-in-Weaviate.html'
        },
        {
            to: '/blog/How-to-Choose-a-Sentence-Transformer-from-Hugging-Face',
            from: '/blog/2022/10/How-to-Choose-a-Sentence-Transformer-from-Hugging-Face.html'
        },
        {
            to: '/blog/ANN-algorithms-Vamana-vs-HNSW',
            from: '/blog/2022/10/ANN-algorithms-Vamana-vs-HNSW.html'
        },
        {
            to: '/blog/how-to-build-an-image-search-application-with-weaviate',
            from: '/blog/2022/10/how-to-build-an-image-search-application-with-weaviate.html'
        },
        {
            to: '/blog/Lock-striping-pattern',
            from: '/blog/2022/10/Lock-striping-pattern.html'
        },
        {
            to: '/blog/weaviate-1-16-release',
            from: '/blog/2022/11/Weaviate-release-1-16.html'
        },
        {
            to: '/blog/tutorial-backup-and-restore-in-weaviate',
            from: '/blog/2022/11/tutorial-backup-and-restore-in-weaviate.html'
        },
        {
            to: '/blog/ref2vec-centroid',
            from: '/blog/2022/11/ref2vec-centroid.html'
        },
        {
            to: '/blog/vector-library-vs-vector-database',
            from: '/blog/2022/12/vector-library-vs-vector-database.html'
        },
        {
            to: '/blog/sphere-dataset-in-weaviate',
            from: '/blog/2022/12/sphere-dataset-in-weaviate.html'
        },
        {
            to: '/blog/Cohere-multilingual-with-weaviate',
            from: '/blog/2022/12/Cohere-multilingual-with-weaviate.html'
        },
        {
            to: '/blog/weaviate-1-17-release',
            from: '/blog/2022/12/Weaviate-release-1-17.html'
        },
        {
            to: '/blog/details-behind-the-sphere-dataset-in-weaviate',
            from: '/blog/2022/12/details-behind-the-sphere-dataset-in-weaviate.html'
        },
        {
            to: '/blog/hybrid-search-explained',
            from: '/blog/2023/01/Hybrid-Search-Explained.html'
        },
        {
            to: '/blog/pulling-back-the-curtains-on-text2vec',
            from: '/blog/2023/01/pulling-back-the-curtains-on-text2vec.html'
        },
        {
            to: '/blog/vector-embeddings-explained',
            from: '/blog/2023/01/Vector-Embeddings-Explained.html'
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