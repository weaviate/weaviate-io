const siteRedirects = {
    // fromExtensions: ['html', 'htm'],
    redirects: [
        // Safeguard, weaviate.io/company
        {
            to: '/company/about-us',
            from: '/company',
        },
        {
            to: '/developers/weaviate/roadmap',
            from: [
                '/developers/weaviate/current/roadmap/index',
                '/developers/weaviate/current/roadmap/architectural-roadmap',
                '/developers/weaviate/current/roadmap/feature-roadmap',
            ],
        },
        {
            to: '/developers/weaviate/concepts/data',
            from: '/developers/weaviate/current/core-knowledge/basics',
        },
        {
            to: '/developers/weaviate/concepts/vector-index',
            from: [
                '/developers/weaviate/current/vector-index-plugins',
                '/developers/weaviate/current/vector-index-plugins/hnsw',
            ],
        },
        {
            to: '/developers/weaviate/client-libraries',
            from: '/developers/weaviate/current/core-knowledge/clients',
        },
        {
            to: '/developers/wcs/guides/console',
            from: '/developers/weaviate/current/core-knowledge/console',
        },

        // Client library redirects
        {
            to: '/developers/weaviate/client-libraries/typescript',
            from: '/developers/weaviate/client-libraries/javascript'
        },

        // Config-refs redirects
        {
            to: '/developers/weaviate/config-refs/datatypes',
            from: '/developers/weaviate/configuration/datatypes',
        },
        {
            to: '/developers/weaviate/config-refs/distances',
            from: '/developers/weaviate/configuration/distances',
        },

        // Configuration redirects
        {
            to: '/developers/weaviate/config-refs/datatypes',
            from: '/developers/weaviate/current/schema/datatypes',
        },
        {
            to: '/developers/weaviate/config-refs/distances',
            from: '/developers/weaviate/current/vector-index-plugins/distances',
        },
        {
            to: '/developers/weaviate/config-refs/schema/vector-index',
            from: '/developers/weaviate/configuration/indexes',
        },
        {
            to: '/developers/weaviate/config-refs/schema/vector-index',
            from: '/developers/weaviate/current/configuration/vector-index-type',
        },
        {
            to: '/developers/weaviate/manage-data/collections',
            from: [
                '/developers/weaviate/current/schema',
                '/developers/weaviate/current/schema/schema-configuration',
            ],
        },

        // More-resources redirects
        {
            to: '/developers/weaviate/more-resources/example-datasets',
            from: '/developers/weaviate/current/tutorials/example-datasets',
        },
        {
            to: '/developers/weaviate/more-resources/write-great-bug-reports',
            from: '/developers/weaviate/current/tutorials/write-great-bug-reports',
        },
        {
            to: '/developers/weaviate/',
            from: '/developers/weaviate/current/more-resources/deprecation-messages',
        },

        // Quickstart redirects
        {
            to: '/developers/weaviate/starter-guides/schema',
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
            to: '/developers/wcs/guides/console',
            from: '/developers/weaviate/quickstart/console',
        },

        // Old Quickstart redirects
        {
            to: '/developers/weaviate/starter-guides/schema',
            from: '/developers/weaviate/current/quickstart/schema',
        },
        {
            to: '/developers/weaviate/tutorials/import',
            from: '/developers/weaviate/current/quickstart/import',
        },
        {
            to: '/developers/weaviate/tutorials/query',
            from: '/developers/weaviate/current/quickstart/query',
        },
        {
            to: '/developers/weaviate/tutorials/modules',
            from: '/developers/weaviate/current/quickstart/modules',
        },
        {
            to: '/developers/wcs/guides/console',
            from: '/developers/weaviate/current/quickstart/console',
        },

        // WCS redirects
        {
            to: '/developers/wcs/faq',
            from: '/developers/wcs/troubleshooting',
        },
        
        // Tutorial redirects
        {
            to: '/developers/weaviate/starter-guides/schema',
            from: '/developers/weaviate/current/tutorials/how-to-create-a-schema',
        },
        {
            to: '/developers/weaviate/tutorials/query',
            from: '/developers/weaviate/current/tutorials/how-to-query-data',
        },
        {
            to: '/developers/weaviate/tutorials/query',
            from: '/developers/weaviate/current/tutorials/how-to-perform-a-semantic-search',
        },
        {
            to: '/developers/weaviate/tutorials/query',
            from: '/developers/weaviate/current/tutorials/semantic-search-through-wikipedia',
        },
        {
            to: '/developers/weaviate/tutorials',
            from: [
                '/developers/weaviate/current/tutorials/how-to-do-classification',
                '/developers/weaviate/current/tutorials/how-to-use-weaviate-without-modules',
                '/developers/weaviate/current/tutorials/other-examples',
                '/developers/weaviate/current/tutorials/quick-start-with-the-text2vec-contextionary-module',
            ],
        },

        // Howto redirects
        {
            to: '/developers/weaviate/manage-data/read-all-objects',
            from: '/developers/weaviate/manage-data/exhaustive-retrieval',
        },

        // Tutorial refresh Jan 2024
        {
            to: '/developers/weaviate/starter-guides/schema',
            from: '/developers/weaviate/tutorials/schema',
        },

        // Blog redirects
        {
            to: '/blog/understand-your-unstructured-data',
            from: '/blog/2021/01/understand-your-unstructured-data',
        },
        {
            to: '/blog/history-of-weaviate',
            from: '/blog/2021/01/The-history-of-Weaviate',
        },
        {
            to: '/blog/graphql-api-design',
            from: '/blog/2021/01/GraphQL-API-design',
        },
        {
            to: '/blog/crud-support-in-weaviate',
            from: '/blog/2021/02/CRUD-support-in-Weaviate',
        },
        {
            to: '/blog/weaviate-1-2-transformer-models',
            from: '/blog/2021/03/Weaviate-1-2-transformer-models',
        },
        {
            to: '/blog/docker-and-containers-with-weaviate',
            from: '/blog/2021/05/Docker-and-Containers-with-Weaviate',
        },
        {
            to: '/blog/semantic-search-with-wikipedia-and-weaviate',
            from: '/blog/2021/11/Semantic-Search-with-Wikipedia-and-Weaviate',
        },
        {
            to: '/blog/the-ai-first-database-ecosystem',
            from: '/blog/2022/06/The-AI-First-Database-Ecosystem',
        },
        {
            to: '/blog/weaviate-1-14-release',
            from: '/blog/2022/07/Weaviate-release-1-14',
        },
        {
            to: '/blog/cross-encoders-as-reranker',
            from: [
                '/blog/2022/08/Using-Cross-Encoders-as-reranker-in-multistage-vector-search',
                '/blog/Using-Cross-Encoders-as-reranker-in-multistage-vector-search',
            ],
        },
        {
            to: '/blog/gomemlimit-a-game-changer-for-high-memory-applications',
            from: '/blog/2022/08/GOMEMLIMIT-a-Game-Changer-for-High-Memory-Applications',
        },
        {
            to: '/blog/research-insights-spider',
            from: '/blog/2022/08/Research-Insights-Spider',
        },
        {
            to: '/blog/weaviate-cloud-services',
            from: [
                '/blog/2022/09/Weaviate-Cloud-Service',
                '/blog/weaviate-cloud-service',
            ],
        },
        {
            to: '/blog/weaviate-1-15-release',
            from: '/blog/2022/09/Weaviate-release-1-15',
        },
        {
            to: '/blog/why-is-vector-search-so-fast',
            from: '/blog/2022/09/Why-is-Vector-Search-so-fast',
        },
        {
            to: '/blog/distance-metrics-in-vector-search',
            from: '/blog/2022/09/Distance-Metrics-in-Vector-Search',
        },
        {
            to: '/blog/weaviate-1-15-1-release',
            from: '/blog/2022/09/Weaviate-release-1-15-1',
        },
        {
            to: '/blog/hugging-face-inference-api-in-weaviate',
            from: '/blog/2022/09/Hugging-Face-Inference-API-in-Weaviate',
        },
        {
            to: '/blog/how-to-choose-a-sentence-transformer-from-hugging-face',
            from: '/blog/2022/10/How-to-Choose-a-Sentence-Transformer-from-Hugging-Face',
        },
        {
            to: '/blog/ann-algorithms-vamana-vs-hnsw',
            from: '/blog/2022/10/ANN-algorithms-Vamana-vs-HNSW',
        },
        {
            to: '/blog/how-to-build-an-image-search-application-with-weaviate',
            from: '/blog/2022/10/how-to-build-an-image-search-application-with-weaviate',
        },
        {
            to: '/blog/Lock-striping-pattern',
            from: '/blog/2022/10/Lock-striping-pattern',
        },
        {
            to: '/blog/weaviate-1-16-release',
            from: '/blog/2022/11/Weaviate-release-1-16',
        },
        {
            to: '/blog/tutorial-backup-and-restore-in-weaviate',
            from: '/blog/2022/11/tutorial-backup-and-restore-in-weaviate',
        },
        {
            to: '/blog/ref2vec-centroid',
            from: '/blog/2022/11/ref2vec-centroid',
        },
        {
            to: '/blog/vector-library-vs-vector-database',
            from: '/blog/2022/12/vector-library-vs-vector-database',
        },
        {
            to: '/blog/sphere-dataset-in-weaviate',
            from: '/blog/2022/12/sphere-dataset-in-weaviate',
        },
        {
            to: '/blog/cohere-multilingual-with-weaviate',
            from: '/blog/2022/12/Cohere-multilingual-with-weaviate',
        },
        {
            to: '/blog/weaviate-1-17-release',
            from: '/blog/2022/12/Weaviate-release-1-17',
        },
        {
            to: '/blog/details-behind-the-sphere-dataset-in-weaviate',
            from: '/blog/2022/12/details-behind-the-sphere-dataset-in-weaviate',
        },
        {
            to: '/blog/hybrid-search-explained',
            from: '/blog/2023/01/Hybrid-Search-Explained',
        },
        {
            to: '/blog/pulling-back-the-curtains-on-text2vec',
            from: '/blog/2023/01/pulling-back-the-curtains-on-text2vec',
        },
        {
            to: '/blog/vector-embeddings-explained',
            from: '/blog/2023/01/Vector-Embeddings-Explained',
        },
        {
            // to: '/blog/generative-search',
            to: '/developers/weaviate/modules/reader-generator-modules/generative-openai',
            from: '/blog/chatgpt-for-generative-search',
        },

        // GSOC and GSOD redirects
        // Hidden as not participating in 2023
        {
            to: '/',
            from: [
                '/resources/gsod',
                '/resources/gsoc',
                '/google-summer/gsoc-23',
                '/google-summer/',
                '/resources/gsod-summary',
            ],
        },

        // // Rename google modules
        // {
        //     to: '/developers/weaviate/modules/reader-generator-modules/generative-google',
        //     from: '/developers/weaviate/modules/reader-generator-modules/generative-palm',
        // },
        // {
        //     to: '/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-google',
        //     from: '/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-palm',
        // },
        // REMOVE WHEN MODULE RENAMING IMPLEMENTED: Temp redirect.
        {
            to: '/developers/weaviate/modules/reader-generator-modules/generative-palm',
            from: '/developers/weaviate/modules/reader-generator-modules/generative-google',
        },
        {
            to: '/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-palm',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-google',
        },


        // moved Quickstart installation to Quickstart
        {
            to: '/developers/weaviate/quickstart',
            from: '/developers/weaviate/quickstart/installation',
        },

        {
            to: '/developers/wcs/guides/console',
            from: '/developers/weaviate/tutorials/console',
        },

        // References: API / GraphQL redirects
        {
            to:   '/developers/weaviate/api/graphql/search-operators',
            from: '/developers/weaviate/api/graphql/vector-search-parameters',
        },

        // old link redirects
        {
            to: '/developers/weaviate/installation',
            from: '/developers/weaviate/current/getting-started/installation',
        },

        {
            to: '/developers/weaviate/configuration/pq-compression',
            from: '/developers/weaviate/configuration/compression',
        },

        {
            to: '/developers/weaviate/manage-data/collections',
            from: '/developers/weaviate/manage-data/classes',
        },

        {
            to: '/developers/weaviate/manage-data/collections',
            from: '/developers/weaviate/configuration/schema-configuration',
        },

     // Products to Pricing redirects

        {
            to: "/pricing",
            from: "/products",
        },

        {
            to: "/pricing",
            from: "/products/byoc",
        },
        {
            to: "/pricing",
            from: "/products/serverless",
        },
        // workshops
        {
            to: "/community/events",
            from: "/learn/workshop"
        },
        // Partners Off
        {
            to: "/pricing",
            from: "/partnersOff"
        },
            // Terms and Policies Changes
        {
            to: "/service",
            from: "/service/EULA"
        },
        {
            to: "/service",
            from: "/service/sla"
        },
        {
            to: "/service",
            from: "/service/general-terms"
        },
        {
            to: "/service",
            from: "/service/service-schedule"
        },


    ],
    createRedirects(existingPath) {
        if (existingPath.includes('/weaviate/api/graphql')) {
            return [
                existingPath.replace(
                    '/weaviate/api/graphql',
                    '/weaviate/current/graphql-references'
                ),
            ];
        }
        if (
            existingPath.includes(
                '/weaviate/modules/retriever-vectorizer-modules'
            )
        ) {
            return [
                existingPath.replace(
                    '/weaviate/modules/retriever-vectorizer-modules',
                    '/weaviate/current/retriever-vectorizer-modules'
                ),
            ];
        }
        if (
            existingPath.includes('/weaviate/modules/reader-generator-modules')
        ) {
            return [
                existingPath.replace(
                    '/weaviate/modules/reader-generator-modules',
                    '/weaviate/current/reader-generator-modules'
                ),
            ];
        }
        if (existingPath.includes('/weaviate/modules/other-modules')) {
            return [
                existingPath.replace(
                    '/weaviate/modules/other-modules',
                    '/weaviate/current/other-modules'
                ),
            ];
        }
        if (existingPath.includes('/weaviate/api/rest')) {
            return [
                existingPath.replace(
                    '/weaviate/api/rest',
                    '/weaviate/current/restful-api-references'
                ),
            ];
        }

        if (
            existingPath.includes('/weaviate/concepts/replication-architecture')
        ) {
            return [
                existingPath.replace(
                    '/weaviate/concepts/replication-architecture',
                    '/weaviate/current/replication-architecture'
                ),
            ];
        }
        if (existingPath.includes('/weaviate/concepts')) {
            return [
                existingPath.replace(
                    '/weaviate/concepts',
                    '/weaviate/current/core-knowledge'
                ),
                existingPath.replace(
                    '/weaviate/concepts',
                    '/weaviate/current/architecture'
                ),
            ];
        }
        if (existingPath.includes('/weaviate/quickstart')) {
            return [
                existingPath.replace(
                    '/weaviate/quickstart',
                    '/weaviate/current/getting-started'
                ),
            ];
        }

        // Any remaining weaviate docs redirects
        if (existingPath.includes('/developers/weaviate')) {
            return [
                existingPath.replace(
                    '/developers/weaviate',
                    '/developers/weaviate/current'
                ),
            ];
        }

        // Contributor Guide redirects
        if (existingPath.includes('/contributor-guide/weaviate-modules')) {
            return [
                existingPath.replace(
                    '/developers/contributor-guide/weaviate-modules',
                    '/developers/contributor-guide/current/weaviate-module-system'
                ),
            ];
        }
        if (existingPath.includes('/contributor-guide')) {
            return [
                existingPath.replace(
                    '/developers/contributor-guide',
                    '/developers/contributor-guide/current'
                ),
            ];
        }

        return undefined; // Return a falsy value: no redirect created
    },
};

module.exports = siteRedirects;
