export const industries = [
  {
    id: "creative-media",
    label: "Creative & Media",
    eyebrow: "Creative & Media",
    title: "Turn your content library into an intelligent creative partner",
    description:
      "Make images, video, audio, and editorial content easier to search, explore, recommend, and reuse with AI-native retrieval.",
    ideas: [
      {
        title: "Search a visual archive by meaning",
        description:
          "Find shots, scenes, products, and concepts without depending on exact filenames or manual tags.",
        accent: "#00FE6B",
      },
      {
        title: "Build a multimodal research assistant",
        description:
          "Explore images, transcripts, briefs, and documents through one conversational experience.",
        accent: "#26D6FF",
      },
      {
        title: "Recommend what audiences discover next",
        description:
          "Use semantic similarity and context to create more relevant content journeys.",
        accent: "#D77AFF",
      },
      {
        title: "Reuse the best ideas in your library",
        description:
          "Surface related campaigns and creative work before teams start from scratch.",
        accent: "#FFB648",
      },
    ],
    proof: [
      {
        type: "Customer story",
        title: "Protecting digital identity across billions of visual assets",
        description:
          "See how Loti AI uses Weaviate to identify unauthorized content while processing 120–140 million images and videos per day across nine billion facial vectors.",
        href: "/case-studies/loti",
      },
    ],
    resources: [
      {
        type: "Blog",
        title:
          "Building Foundry: AI isn’t replacing creativity, it’s removing friction",
        description:
          "Why creative teams lose time searching for existing work—and how semantic retrieval can make images, footage, audio, and design files easier to rediscover and reuse.",
        href: "/blog/building-foundry-ai-creative-workflows",
      },
      {
        type: "Blog",
        title: "Building Foundry Part 2: Where creative workflows break",
        description:
          "Explore why folders, manual tags, and keyword search become unreliable as creative archives and production teams grow.",
        href: "/blog/building-foundry-where-workflows-break",
      },
      {
        type: "Guide",
        title: "Multimodal Embeddings and RAG: A Practical Guide",
        description:
          "Learn how to search and reason across text, images, audio, video, and visually rich documents using multimodal embeddings and Weaviate.",
        href: "/blog/multimodal-guide",
      },
      {
        type: "Documentation",
        title: "Search with images, video, and audio",
        description:
          "Configure multimedia collections and use media inputs to retrieve semantically similar content with Weaviate.",
        href: "https://docs.weaviate.io/weaviate/search/near-media",
      },
      {
        type: "GitHub template",
        title: "Next.js Multimodal Search",
        description:
          "Start from a reusable Next.js application for building a multimodal search experience with Weaviate.",
        href: "https://github.com/weaviate-tutorials/next-multimodal-search-demo",
      },
    ],
  },
  {
    id: "financial-services",
    label: "Financial Services",
    eyebrow: "Financial Services",
    title: "Make complex financial knowledge easier to find and act on",
    description:
      "Build secure search, research, and agentic experiences over reports, policies, market data, and institutional knowledge.",
    ideas: [
      {
        title: "Build an investment research assistant",
        description:
          "Search reports, filings, earnings calls, and market commentary through one grounded conversational experience.",
        accent: "#00FE6B",
      },
      {
        title: "Find answers across policies and controls",
        description:
          "Help teams retrieve relevant internal guidance, procedures, and regulatory context without relying on exact keywords.",
        accent: "#26D6FF",
      },
      {
        title: "Give service teams better context",
        description:
          "Bring together product knowledge and customer history to support more relevant, consistent responses.",
        accent: "#D77AFF",
      },
      {
        title: "Surface similar cases and documents",
        description:
          "Connect related claims, transactions, investigations, or agreements to accelerate specialist review.",
        accent: "#FFB648",
      },
    ],
    proof: [
      {
        type: "Customer story",
        title: "Morningstar builds a trustworthy Intelligence Engine",
        description:
          "Morningstar launched its Mo research assistant within weeks and enabled hundreds of applications using trusted financial data.",
        href: "/case-studies/morningstar",
      },
      {
        type: "Customer story",
        title: "Finster reimagines investment research",
        description:
          "Finster manages 42 million vectors in production and delivers finance-specific retrieval with granular citations.",
        href: "/case-studies/finster",
      },
      {
        type: "Customer story",
        title: "Commercialising financial AI in under a year",
        description:
          "See how a leading US financial data company created a shared foundation for secure internal and customer-facing AI applications.",
        href: "/case-studies/finance",
      },
    ],
    resources: [
      {
        type: "Build story",
        title: "Building a Legal RAG App in 36 Hours",
        description:
          "Build grounded contract search with cited source passages for legal, compliance, and financial operations.",
        href: "/blog/legal-rag-app",
      },
      {
        type: "Guide",
        title: "Your LLM Is Only as Good as What It Retrieves",
        description:
          "Learn practical ways to improve retrieval quality for accurate, high-trust RAG applications.",
        href: "/blog/retrieval-quality-rag-overview",
      },
      {
        type: "Guide",
        title: "Exploring RAG and GraphRAG",
        description:
          "Understand when semantic retrieval is enough and when connected data calls for a graph-based approach.",
        href: "/blog/graph-rag",
      },
    ],
  },
  {
    id: "ecommerce-retail",
    label: "Ecommerce & Retail",
    eyebrow: "Ecommerce & Retail",
    title: "Create product discovery that understands what shoppers mean",
    description:
      "Connect product content and customer intent to power semantic search, recommendations, and shopping assistants.",
    ideas: [
      {
        title: "Let shoppers search the way they speak",
        description:
          "Match natural descriptions such as style, occasion, and intent to the most relevant products in your catalogue.",
        accent: "#00FE6B",
      },
      {
        title: "Recommend products with more context",
        description:
          "Combine semantic similarity with customer preferences to create useful alternatives, bundles, and discovery journeys.",
        accent: "#26D6FF",
      },
      {
        title: "Build a conversational shopping assistant",
        description:
          "Help customers compare options and narrow large catalogues through grounded, product-aware conversations.",
        accent: "#D77AFF",
      },
      {
        title: "Enrich and organise product content",
        description:
          "Connect descriptions, imagery, reviews, and attributes so merchandising teams can find gaps and improve listings.",
        accent: "#FFB648",
      },
    ],
    proof: [
      {
        type: "Customer story",
        title: "Building an AI-powered shopping copilot",
        description:
          "Moonsift built a production-ready AI search engine over data representing 60 million products, 250 million interactions, and 40,000 retailers.",
        href: "/blog/moonsift-story",
      },
    ],
    resources: [
      {
        type: "Build story",
        title: "Building Glowe: AI-powered skincare recommendations",
        description:
          "See how domain knowledge, custom embeddings, vector search, and agents can produce more relevant product recommendations.",
        href: "/blog/glowe-app",
      },
      {
        type: "Tutorial",
        title: "AI-Enabled Ecommerce in TypeScript",
        description:
          "Build a multilingual semantic product-search experience that understands intent beyond exact product terms.",
        href: "/blog/ai-enabled-ecommerce-typescript",
      },
      {
        type: "Tutorial",
        title: "Build an Ecommerce Assistant with Query Agent",
        description:
          "Create a conversational assistant capable of answering complex questions across clothing and brand collections.",
        href: "https://docs.weaviate.io/agents/query/tutorial-ecommerce",
      },
      {
        type: "GitHub template",
        title: "Nuxt Ecommerce Search and RAG",
        description:
          "Start from a reusable implementation for semantic product search and retrieval-augmented generation.",
        href: "https://github.com/weaviate-tutorials/nuxt-ecommerce-rag",
      },
      {
        type: "Guide",
        title: "Evaluate Retail Search with LLM-as-a-Judge",
        description:
          "Test whether natural-language product searches return results that match customer intent and requirements.",
        href: "/blog/evals-and-guardrails-part-2",
      },
    ],
  },
  {
    id: "software-technology",
    label: "Software & Technology",
    eyebrow: "Software & Technology",
    title: "Build AI products on retrieval designed for production",
    description:
      "Give developers the foundation for search, RAG, recommendations, and agents across product and company knowledge.",
    ideas: [
      {
        title: "Build search that understands your product",
        description:
          "Help users discover features, documentation, and answers even when their language differs from your internal terminology.",
        accent: "#00FE6B",
      },
      {
        title: "Create an AI support engineer",
        description:
          "Ground answers in documentation, tickets, release notes, and known issues to speed up technical support.",
        accent: "#26D6FF",
      },
      {
        title: "Give agents long-term context",
        description:
          "Let AI workflows retrieve the relevant history, preferences, and decisions they need across sessions.",
        accent: "#D77AFF",
      },
      {
        title: "Connect knowledge across your company",
        description:
          "Make engineering discussions, product decisions, documentation, and research accessible through one intelligent layer.",
        accent: "#FFB648",
      },
    ],
    proof: [
      {
        type: "Customer story",
        title: "DocsBot scales AI support to 50,000+ tenants",
        description:
          "DocsBot answered more than 6.1 million customer questions in a year while storing over 50,000 tenants in one cluster.",
        href: "/case-studies/docsbot",
      },
      {
        type: "Customer story",
        title: "Kapa takes the pain out of technical answers",
        description:
          "Kapa delivered the first working version of its documentation-answer platform in seven days and now supports more than 100 companies.",
        href: "/case-studies/kapa",
      },
      {
        type: "Customer story",
        title: "Stack AI delivers agentic AI for enterprises",
        description:
          "Explore how an enterprise AI platform uses Weaviate as part of its foundation for production agentic applications.",
        href: "/case-studies/stack-ai",
      },
      {
        type: "Customer story",
        title: "Instabase turns unstructured data into insights",
        description:
          "Instabase processes more than 500,000 documents each day and supports over 450 data types with Weaviate.",
        href: "/case-studies/instabase",
      },
    ],
    resources: [
      {
        type: "Tutorial",
        title: "Build a Coding Assistant with Weaviate MCP",
        description:
          "Create a coding assistant using hybrid retrieval over source code and technical documentation.",
        href: "/blog/coding-assistant-weaviate-mcp",
      },
      {
        type: "Framework",
        title: "Build Agentic RAG with Elysia",
        description:
          "Explore a decision-tree agent that selects tools, evaluates results, and adapts its response to the data it retrieves.",
        href: "/blog/elysia-agentic-rag",
      },
      {
        type: "GitHub project",
        title: "Elysia",
        description:
          "Use Weaviate's open-source agentic RAG framework as a foundation for building data-aware AI applications.",
        href: "https://github.com/weaviate/elysia",
      },
    ],
  },
  {
    id: "healthcare-life-sciences",
    label: "Healthcare & Life Sciences",
    eyebrow: "Healthcare & Life Sciences",
    title: "Connect health knowledge without compromising trust",
    description:
      "Build secure AI experiences across clinical, operational, research, and wellness data with accurate retrieval and clear source context.",
    ideas: [
      {
        title: "Build a clinical knowledge assistant",
        description:
          "Retrieve relevant guidance, medical literature, and organisational knowledge with traceable source context.",
        accent: "#00FE6B",
      },
      {
        title: "Give care teams a unified patient view",
        description:
          "Connect visits, laboratory results, medication history, and notes for contextual retrieval at the point of care.",
        accent: "#26D6FF",
      },
      {
        title: "Create personalised wellness guidance",
        description:
          "Bring together nutrition, activity, sleep, and user context in a conversational experience.",
        accent: "#D77AFF",
      },
      {
        title: "Search visually rich medical material",
        description:
          "Retrieve diagrams, scans, charts, tables, and document pages using multimodal representations.",
        accent: "#FFB648",
      },
    ],
    proof: [
      {
        type: "Customer story",
        title: "MetaBuddy powers personalised AI coaching",
        description:
          "MetaBuddy increased conversational engagement threefold and reduced trainer analysis time by 60 percent.",
        href: "/case-studies/metabuddy",
      },
    ],
    resources: [
      {
        type: "Compliance",
        title: "Secure AI for Healthcare",
        description:
          "Explore HIPAA-ready vector search, deployment safeguards, access controls, encryption, and healthcare use cases.",
        href: "/blog/weaviate-hipaa-compliant",
      },
      {
        type: "Guide",
        title: "Advanced RAG Techniques",
        description:
          "Improve indexing, retrieval, and generation quality through a practical healthcare-assistant scenario.",
        href: "/blog/advanced-rag",
      },
      {
        type: "Demo",
        title: "Healthsearch",
        description:
          "Explore an open-source technical demonstration of semantic and generative search over supplement reviews—not medical advice.",
        href: "/blog/healthsearch-demo",
      },
      {
        type: "Guide",
        title: "Multimodal Embeddings and RAG",
        description:
          "Learn how to retrieve information from images, visually rich documents, audio, and video in their native formats.",
        href: "/blog/multimodal-guide",
      },
      {
        type: "Security guide",
        title: "Securing Enterprise AI with Weaviate",
        description:
          "Plan identity, permissions, compliance, and infrastructure for secure enterprise retrieval applications.",
        href: "/blog/weaviate-security-enterprise",
      },
    ],
  },
];
