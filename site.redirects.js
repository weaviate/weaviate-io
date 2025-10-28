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
            to: '/deployment/dedicated',
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
            to: '/deployment/shared',
            from: '/services/serverless',
        },
        {
            to: '/deployment/dedicated',
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
        // // Enterprise pricing > Prcing
        {
            to: '/pricing',
            from: '/pricing/enterprise',
        },
        // // Serverless pricing > Pricing
        {
            to: '/pricing',
            from: '/pricing/serverless',
        },


          // // Enterprise Cloud > Dedicated Cloud
        {
            to: '/deployment/dedicated',
            from: '/deployment/enterprise-cloud',
        },
           // // Serverless Cloud > Shared Cloud
        {
            to: '/deployment/shared',
            from: '/deployment/serverless',
        },
          // Blog Update
        {
            to: '/blog/when-good-models-go-bad',
            from: '/blog/when%20good%20models%20go%20bad',
        }

    ],
};

module.exports = siteRedirects;
