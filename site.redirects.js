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
            to: '/developers/wcs/tools/query-tool',
            from: '/developers/weaviate/current/core-knowledge/console',
        },
        {
            to: '/developers/wcs/tools/query-tool',
            from: '/developers/wcs/guides/console',
        },
        {
            to: '/developers/wcs/manage-clusters/create',
            from: '/developers/wcs/guides/create-instance',
        },
        {
            to: '/developers/wcs/manage-clusters/connect',
            from: '/developers/wcs/guides/authentication',
        },
        // Client library redirects
        {
            to: '/developers/weaviate/client-libraries/typescript',
            from: '/developers/weaviate/client-libraries/javascript',
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
            to: '/developers/weaviate/concepts/filtering',
            from: '/developers/weaviate/config-refs/schema/range-index',
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
        {
            to: '/developers/integrations/llm-agent-frameworks/dspy',
            from: '/developers/weaviate/more-resources/dspy',
        },

        // Quickstart redirects
        {
            to: '/developers/weaviate/starter-guides/managing-collections',
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
            to: '/developers/wcs/tools/query-tool',
            from: '/developers/weaviate/quickstart/console',
        },

        // Old Quickstart redirects
        {
            to: '/developers/weaviate/starter-guides/managing-collections',
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
            to: '/developers/wcs/tools/query-tool',
            from: '/developers/weaviate/current/quickstart/console',
        },

        // WCD redirects
        {
            to: '/developers/wcs/faq',
            from: '/developers/wcs/troubleshooting',
        },
        {
            to: '/developers/wcs/tools/query-tool',
            from: '/developers/wcs/platform/ssconsole',
        },
        {
            to: '/developers/wcs/manage-clusters/status',
            from: '/developers/wcs/platform/cluster-status',
        },
        {
            to: '/developers/wcs/tools/query-tool',
            from: '/developers/wcs/console',
        },
        {
            to: '/developers/wcs/manage-clusters/status',
            from: '/developers/wcs/cluster-status',
        },
        {
            to: '/developers/wcs/manage-clusters/connect',
            from: '/developers/wcs/connect',
        },
        {
            to: '/developers/wcs/manage-clusters/create',
            from: '/developers/wcs/create-instance',
        },
        {
            to: '/developers/wcs/manage-clusters/upgrade',
            from: '/developers/wcs/upgrade',
        },
        // Tutorial redirects
        {
            to: '/developers/weaviate/starter-guides/managing-collections',
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

        // Tutorial refresh 2024
        {
            to: '/developers/weaviate/starter-guides/managing-collections',
            from: '/developers/weaviate/tutorials/schema',
        },
        {
            to: '/developers/weaviate/connections',
            from: '/developers/weaviate/tutorials/connect',
        },
        {
            to: '/developers/weaviate/connections',
            from: '/developers/weaviate/starter-guides/connect',
        },

        // 2024.10 Rename "prefiltering" to "filtering"
        {
            to: '/developers/weaviate/concepts/filtering',
            from: '/developers/weaviate/concepts/prefiltering',
        },

        // Remove BPR page
        {
            to: '/developers/weaviate/concepts/vector-index',
            from: '/developers/weaviate/concepts/binary-passage-retrieval',
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
            to: '/blog/vector-search-explained',
            from: [
                '/blog/why-is-vector-search-so-fast',
                '/blog/2022/09/Why-is-Vector-Search-so-fast',
            ],
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
            to: '/developers/weaviate/model-providers/openai/generative',
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
            to: '/developers/weaviate/model-providers/google/generative',
            from: '/developers/weaviate/modules/reader-generator-modules/generative-google',
        },
        {
            to: '/developers/weaviate/model-providers/google/embeddings',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-google',
        },

        // =============================================================================================
        // 202409 Remove old module docs & redirect to model provider integration
        // =============================================================================================
        // API-based T2V modules
        {
            to: '/developers/weaviate/model-providers/aws/embeddings',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-aws',
        },
        {
            to: '/developers/weaviate/model-providers/cohere/embeddings',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-cohere',
        },
        {
            to: '/developers/weaviate/model-providers/huggingface/embeddings',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-huggingface',
        },
        {
            to: '/developers/weaviate/model-providers/jinaai/embeddings',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-jinaai',
        },
        {
            to: '/developers/weaviate/model-providers/openai/embeddings',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-openai',
        },
        {
            to: '/developers/weaviate/model-providers/google/embeddings',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-palm',
        },
        {
            to: '/developers/weaviate/model-providers/voyageai/embeddings',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-voyageai',
        },
        // Local T2V modules
        {
            to: '/developers/weaviate/model-providers/gpt4all/embeddings',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-gpt4all',
        },
        {
            to: '/developers/weaviate/model-providers/ollama/embeddings',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-ollama',
        },
        {
            to: '/developers/weaviate/model-providers/transformers/embeddings',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-transformers',
        },
        // Other vectorizer modules
        {
            to: '/developers/weaviate/model-providers/imagebind/embeddings-multimodal',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/multi2vec-bind',
        },
        {
            to: '/developers/weaviate/model-providers/transformers/embeddings-multimodal',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/multi2vec-clip',
        },
        {
            to: '/developers/weaviate/model-providers/google/embeddings-multimodal',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/multi2vec-palm',
        },
        // Reranker modules
        {
            to: '/developers/weaviate/model-providers/cohere/reranker',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/reranker-cohere',
        },
        {
            to: '/developers/weaviate/model-providers/voyageai/reranker',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/reranker-voyageai',
        },
        {
            to: '/developers/weaviate/model-providers/transformers/reranker',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/reranker-transformers',
        },
        // Generative modules
        {
            to: '/developers/weaviate/model-providers/anyscale/generative',
            from: '/developers/weaviate/modules/reader-generator-modules/generative-anyscale',
        },
        {
            to: '/developers/weaviate/model-providers/aws/generative',
            from: '/developers/weaviate/modules/reader-generator-modules/generative-aws',
        },
        {
            to: '/developers/weaviate/model-providers/cohere/generative',
            from: '/developers/weaviate/modules/reader-generator-modules/generative-cohere',
        },
        {
            to: '/developers/weaviate/model-providers/mistral/generative',
            from: '/developers/weaviate/modules/reader-generator-modules/generative-mistral',
        },
        {
            to: '/developers/weaviate/model-providers/ollama/generative',
            from: '/developers/weaviate/modules/reader-generator-modules/generative-ollama',
        },
        {
            to: '/developers/weaviate/model-providers/openai/generative',
            from: '/developers/weaviate/modules/reader-generator-modules/generative-openai',
        },
        {
            to: '/developers/weaviate/model-providers/google/generative',
            from: '/developers/weaviate/modules/reader-generator-modules/generative-palm',
        },

        {
            to: '/developers/weaviate/modules/custom-modules',
            from: '/developers/weaviate/modules/other-modules/custom-modules',
        },
        {
            to: '/developers/weaviate/modules/spellcheck',
            from: '/developers/weaviate/modules/other-modules/spellcheck',
        },
        {
            to: '/developers/weaviate/modules/ner-transformers',
            from: '/developers/weaviate/modules/reader-generator-modules/ner-transformers',
        },
        {
            to: '/developers/weaviate/modules/qna-transformers',
            from: '/developers/weaviate/modules/reader-generator-modules/qna-transformers',
        },
        {
            to: '/developers/weaviate/modules/sum-transformers',
            from: '/developers/weaviate/modules/reader-generator-modules/sum-transformers',
        },
        {
            to: '/developers/weaviate/modules/qna-openai',
            from: '/developers/weaviate/modules/reader-generator-modules/qna-openai',
        },
        {
            to: '/developers/weaviate/modules/img2vec-neural',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/img2vec-neural',
        },
        {
            to: '/developers/weaviate/modules/ref2vec-centroid',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/ref2vec-centroid',
        },
        {
            to: '/developers/weaviate/modules/text2vec-contextionary',
            from: '/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-contextionary',
        },

        // =============================================================================================
        // END - 202409 Remove old module docs & redirect to model provider integration
        // =============================================================================================

        // moved Quickstart installation to Quickstart
        {
            to: '/developers/weaviate/quickstart',
            from: '/developers/weaviate/quickstart/installation',
        },

        {
            to: '/developers/wcs/tools/query-tool',
            from: '/developers/weaviate/tutorials/console',
        },

        // References: API / GraphQL redirects
        {
            to: '/developers/weaviate/api/graphql/search-operators',
            from: '/developers/weaviate/api/graphql/vector-search-parameters',
        },

        // old link redirects
        {
            to: '/developers/weaviate/installation',
            from: '/developers/weaviate/current/getting-started/installation',
        },

        {
            to: '/developers/weaviate/configuration/compression/pq-compression',
            from: '/developers/weaviate/configuration/pq-compression',
        },

        {
            to: '/developers/weaviate/configuration/compression/bq-compression',
            from: '/developers/weaviate/configuration/bq-compression',
        },

        {
            to: '/developers/weaviate/manage-data/collections',
            from: '/developers/weaviate/manage-data/classes',
        },

        {
            to: '/developers/weaviate/manage-data/collections',
            from: '/developers/weaviate/configuration/schema-configuration',
        },

        // Legacy REST API redirects
        {
            to: '/developers/weaviate/api/rest/',
            from: [
                '/developers/weaviate/api/rest/schema',
                '/developers/weaviate/api/rest/objects',
                '/developers/weaviate/api/rest/batch',
                '/developers/weaviate/api/rest/backups',
                '/developers/weaviate/api/rest/classification',
                '/developers/weaviate/api/rest/meta',
                '/developers/weaviate/api/rest/nodes',
                '/developers/weaviate/api/rest/well-known',
                '/developers/weaviate/api/rest_legacy/schema',
                '/developers/weaviate/api/rest_legacy/objects',
                '/developers/weaviate/api/rest_legacy/batch',
                '/developers/weaviate/api/rest_legacy/backups',
                '/developers/weaviate/api/rest_legacy/classification',
                '/developers/weaviate/api/rest_legacy/meta',
                '/developers/weaviate/api/rest_legacy/nodes',
                '/developers/weaviate/api/rest_legacy/well-known',
            ],
        },
        {
            to: '/developers/weaviate/model-providers',
            from: [
                '/developers/weaviate/api/rest/modules',
                '/developers/weaviate/api/rest_legacy/modules',
            ],
        },

        // Products to Pricing redirects

        {
            to: '/pricing',
            from: '/products',
        },

        {
            to: '/pricing',
            from: '/products/byoc',
        },
        {
            to: '/pricing',
            from: '/products/serverless',
        },
        // workshops
        {
            to: '/community/events',
            from: '/learn/workshop',
        },
        {
            to: '/community/events',
            from: '/learn/workshops',
        },
        // Partners Off
        {
            to: '/pricing',
            from: '/partnersOff',
        },
        // Terms and Policies Changes
        {
            to: '/service',
            from: '/service/EULA',
        },
        {
            to: '/service',
            from: '/service/sla',
        },
        {
            to: '/service',
            from: '/service/general-terms',
        },
        {
            to: '/service',
            from: '/service/service-schedule',
        },
        {
            to: '/weaviate-support-terms',
            from: '/supportterms',
        },
        {
            to: '/service',
            from: '/service/weaviate-general-terms-of-service',
        },
        // Case Study Changes
        {
            to: '/case-studies/neople',
            from: '/services/case-study-neople',
        },
        // Services Changes
        {
            to: '/deployment/enterprise-cloud',
            from: '/services/enterprise-dedicated',
        },

        // Blog Article Changes
        {
            to: '/blog',
            from: '/blog/tips-for-scaling-and-shipping-ai-products',
        },

        // Release notes
        {
            to: '/developers/weaviate/release-notes/older-releases/release_1_20',
            from: '/developers/weaviate/release-notes/release_1_20',
        },
        {
            to: '/developers/weaviate/release-notes/older-releases/release_1_19',
            from: '/developers/weaviate/release-notes/release_1_19',
        },
        {
            to: '/developers/weaviate/release-notes/older-releases/release_1_18',
            from: '/developers/weaviate/release-notes/release_1_18',
        },
        {
            to: '/developers/weaviate/release-notes/older-releases/release_1_17',
            from: '/developers/weaviate/release-notes/release_1_17',
        },
        {
            to: '/developers/weaviate/release-notes/older-releases/release_1_16',
            from: '/developers/weaviate/release-notes/release_1_16',
        },

        // Services Changes
        {
            to: '/platform',
            from: '/services',
        },
        {
            to: '/deployment/serverless',
            from: '/services/serverless',
        },
        {
            to: '/deployment/enterprise-cloud',
            from: '/services/enterprise-cloud',
        },
        {
            to: '/deployment/byoc',
            from: '/services/byoc',
        },
        {
            to: '/deployment/enablement',
            from: '/services/education-and-support',
        },
        {
            to: '/deployment/enablement',
            from: '/deployment/education-and-support',
        },
        // KC Component Changes
        {
            to: '/learn/knowledgecards',
            from: '/learn/knowledgecards/shareoptions',
        },
        {
            to: '/learn/knowledgecards',
            from: '/learn/knowledgecards/knowledgeheader',
        },
        // Recommender Component Changes
        {
            to: '/product/personalization-agent',
            from: '/workbench/recommender',
        },
        {
            to: '/product/personalization-agent',
            from: '/product/recommender',
        },

        // GFL > Agentic AI Changes

        {
            to: '/agentic-ai',
            from: '/gen-feedback-loops',
        },

        // Integration Docs
        {
            to: '/developers/integrations/llm-agent-frameworks',
            from: '/developers/integrations/llm-frameworks',
        },
        {
            to: '/developers/integrations/llm-agent-frameworks/composio',
            from: '/developers/integrations/llm-frameworks/composio',
        },
        {
            to: '/developers/integrations/llm-agent-frameworks/dspy',
            from: '/developers/integrations/llm-frameworks/dspy',
        },
        {
            to: '/developers/integrations/llm-agent-frameworks/haystack',
            from: '/developers/integrations/llm-frameworks/haystack',
        },
        {
            to: '/developers/integrations/llm-agent-frameworks/langchain',
            from: '/developers/integrations/llm-frameworks/langchain',
        },
        {
            to: '/developers/integrations/llm-agent-frameworks/llamaindex',
            from: '/developers/integrations/llm-frameworks/llamaindex',
        },
        {
            to: '/developers/integrations/llm-agent-frameworks/semantic-kernel',
            from: '/developers/integrations/llm-frameworks/semantic-kernel',
        },
        {
            to: '/developers/integrations/data-platforms/confluent',
            from: '/developers/integrations/data-platforms/confluent-cloud',
        },

        // Restructured starter guides
        {
            to: '/developers/weaviate/starter-guides/managing-collections',
            from: '/developers/weaviate/starter-guides/schema',
        },

        // Redirects for Weaviate Core error messages
        {
            to: '/developers/weaviate/starter-guides/managing-collections/collections-scaling-limits',
            from: '/collections-count-limit',
        },

        // Redirects for dynamic user support
        {
            to: '/developers/weaviate/configuration/rbac/manage-roles',
            from: '/developers/weaviate/configuration/rbac/manage-roles-users',
        },

        // Redirects for AWS and GCP
        {
            to: '/developers/weaviate/installation',
            from: '/developers/weaviate/installation/gc-marketplace',
        },

        // Redirect for manage API keys page
        {
            to: '/developers/wcs/manage-clusters/authentication',
            from: '/developers/wcs/platform/manage-api-keys',
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
