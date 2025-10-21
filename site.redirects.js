const siteRedirects = {
    redirects: [
        {
            to: '/company/about-us',
            from: '/company',
        },

        // Blog redirects
        {
            to: '/blog/history-of-weaviate',
            from: '/blog/2021/01/The-history-of-Weaviate',
        },
        {
            to: '/blog/crud-support-in-weaviate',
            from: '/blog/2021/02/CRUD-support-in-Weaviate',
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
            from: [
                '/learn/workshop',
                '/learn/workshops',
            ],
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

        // // GFL > Agentic AI Changes
        {
            to: '/agentic-ai',
            from: '/gen-feedback-loops',
        },

         // // Build with Weaviate Offline
        {
            to: '/',
            from: '/community/build-with-weaviate',
        },
        // Blog Update
        {
            to: '/blog/when-good-models-go-bad',
            from: '/blog/when%20good%20models%20go%20bad',
        },

        // Knowledge cards to Learn Cluster URLS

        {
            to: '/learn/knowledgecards/chunking',
            from: '/learn/data-processing/chunking',
        },
        {
            to: '/learn/knowledgecards/prompt-engineering',
            from: '/learn/generative-ai/prompt-engineering',
        },
        {
            to: '/learn/knowledgecards/generative-ai',
            from: '/learn/generative-ai',
        },
        {
            to: '/learn/knowledgecards/retrieval-augmented-generation-rag',
            from: '/learn/rag',
        },
        {
            to: '/learn/knowledgecards/multimodal-rag',
            from: '/learn/rag/multimodal-rag',
        },
        {
            to: '/learn/knowledgecards/vector-database',
            from: '/learn/vector-database',
        },
        {
            to: '/learn/knowledgecards/vectorbased-index',
            from: '/learn/vector-database/vector-indexing',
        },
        {
            to: '/learn/knowledgecards/multi-tenancy',
            from: '/learn/vector-database/multi-tenancy',
        },
        {
            to: '/learn/knowledgecards/unstructured-data-objects',
            from: '/learn/vector-database/unstructured-data',
        },
        {
            to: '/learn/knowledgecards/keyword-search',
            from: '/learn/retrieval/keyword-search',
        },
        {
            to: '/learn/knowledgecards/semanticvector-search',
            from: '/learn/retrieval/vector-search',
        },
        {
            to: '/learn/knowledgecards/vectorbased-index',
            from: '/learn/vector-database/vector-indexing',
        },
        {
            to: '/learn/knowledgecards/hybrid-search',
            from: '/learn/retrieval/hybrid-search',
        },
        {
            to: '/learn/knowledgecards/bm25bm25f',
            from: '/learn/vector-database/keyword-search/bm25',
        },
        {
            to: '/learn/knowledgecards/inverted-indexes',
            from: '/learn/vector-database/keyword-search/inverted-index',
        },
        {
            to: '/learn/knowledgecards/anytoany-search',
            from: '/learn/vector-database/vector-search/multimodal-search',
        },
        {
            to: '/learn/knowledgecards/metadata-filtering',
            from: '/learn/vector-database/vector-search/metadata-filtering',
        },
        {
            to: '/learn/knowledgecards/reasoning-and-acting-react',
            from: '/learn/agents/ReAct',
        },
        {
            to: '/learn/knowledgecards/pq',
            from: '/learn/vector-database/vector-compression/product-quantization',
        },
        {
            to: '/learn/knowledgecards/quantized-embeddings',
            from: '/learn/vector-database/vector-compression',
        },
        {
            to: '/learn/knowledgecards/binary-embeddings',
            from: '/learn/vector-database/vector-embeddings/binary-embeddings',
        },
        {
            to: '/learn/knowledgecards/multivector-embeddings',
            from: '/learn/vector-database/vector-embeddings/multi-vector-embeddings',
        },
        {
            to: '/learn/knowledgecards/sparse-embeddings',
            from: '/learn/vector-database/vector-embeddings/sparse-embeddings',
        },
        {
            to: '/learn/knowledgecards/variable-dimensions',
            from: '/learn/vector-database/vector-embeddings/matryoshka',
        },
        {
            to: '/learn/knowledgecards/hnsw',
            from: '/learn/vector-database/vector-indexing/ann/hierarchical-navigable-small-world',
        },
        {
            to: '/learn/knowledgecards/embedding-model',
            from: '/learn/models/embedding-model/',
        },
        {
            to: '/learn/knowledgecards/large-language-model-llm',
            from: '/learn/models/large-language-model',
        },
        {
            to: '/learn/knowledgecards/reranking',
            from: '/learn/models/reranking',
        }
    ],
};

module.exports = siteRedirects;
