export const unitData = {
  hello_weaviate: {
    title: "Hello, Weaviate",
    body: "Start here: Learn what Weaviate is, and about its key capabilities and features, as well as about vectors that power Weaviate.",
    buttonType: "Click here",
    buttonURL: "/developers/academy/zero_to_mvp/hello_weaviate",
    badgeType: "mixed",
    learningGoals: [
      "What Weaviate is, and what it does.",
      "How to create your own Weaviate instance on WCS.",
      "Weaviate clients and how to install them.",
      "Hands-on experience with Weaviate.",
    ],
    learningOutcomes: [
      "Broadly describe what Weaviate is.",
      "Outline what vector search is.",
      "Create a Weaviate instance on WCS.",
      "Install your preferred Weaviate client.",
      "Describe some of Weaviate's capabilities.",
    ],
    owner: "jp",
    reviewer: "jp"
  },
  queries_1: {
    title: "Queries 1",
    body: "Learn how queries work in Weaviate, how to use similarity searches and use filters, as well as how search works under the hood.",
    buttonType: "Click here",
    badgeType: "practical",
    buttonURL: "/developers/academy/zero_to_mvp/queries_1",
    learningGoals: [
      "How to retrieve objects and properties.",
      "The structure of returned responses from Weaviate.",
      "The difference between `nearVector`, `nearObject` and `nearText`.",
      "How to aggregate meta information about objects.",
      "How to add filters to vector searches.",
      "Weaviate's internal vector search process.",
    ],
    learningOutcomes: [
      "Construct 'Get' queries to retrieve relevant objects and desired properties.",
      "Parse a response from Weaviate.",
      "Explain the differences between `nearVector`, `nearObject` and `nearText`.",
      "Construct 'Aggregate' queries to retrieve aggregated properties about relevant objects.",
      "Add filters to queries to exclude certain results.",
      "Describe how `nearObject` and `nearText` queries are converted to vector searches, and what pre-filtering is.",
    ],
    owner: "jp",
    reviewer: "jp"
  },
  schema_and_import: {  // Separate the more difficult topics into their own units (schema 2 / import 2)
    title: "Schema and imports",
    body: "Learn what role the schema plays in Weaviate, and how to define it, before learning how to effectively populate Weaviate with data.",
    buttonType: "Click here",
    badgeType: "mixed",
    buttonURL: "/developers/academy/zero_to_mvp/schema_and_imports",
    learningGoals: [
      "How Weaviate organizes and stores data.",
      "An overview of indexes used in Weaviate.",
      "What a schema is, and how to define it.",
      "How to define classes and properties, including appropriate data types.",
      "How to populate Weaviate with data.",
      "Some best practices such as batch imports and additional properties.",
    ],
    learningOutcomes: [
      "Describe how the schema relates to organization and storage of data in Weaviate.",
      "Broadly describe the role of indexes in Weaviate.",
      "Understand how classes and properties represent your data.",
      "Create a schema to suit your data.",
      "Populate Weaviate with data, using batch imports.",
    ],
    owner: "jp",
    reviewer: "jp"
  },
  queries_2: {
    title: "Queries 2",
    body: "Learn about even more query types, from hybrid searches that combine keyword and vector searches to generative searches that transform your data at retrieval.",
    buttonType: "Click here",
    badgeType: "practical",
    buttonURL: "/developers/academy/zero_to_mvp/queries_2",
    learningGoals: [
      "How to formulate and perform keyword or BM25 searches.",
      "What Hybrid searches are, how they are ranked and how to use them.",
      "How Generative searches utilize language models to transform data before delivery.",
      "How you can extract the exact answers from data with the Question & Answer (QnA) module.",
    ],
    learningOutcomes: [
      "Perform BM25 and hybrid searches.",
      "Differentiate between vector, BM25 and hybrid searches.",
      "Transform data before delivery with generative searches.",
      "Extract answers from data with QnA searches.",
    ],
    owner: "jp",
    reviewer: "jp"
  },
  // crud_operations: {
  //   title: "CRUD operations",
  //   body: "How to perform object manipulation operations in Weaviate.",
  //   buttonType: "Notify",
  //   buttonURL: "/developers/academy/units/crud_operations",
  //   badgeType: "practical",
  //   learningGoals: [
  //     "Learn how to handle data objects in Weaviate, with Create, Read, Update and Delete (CRUD) operations for data objects via its RESTful endpoint."
  //   ],
  //   learningOutcomes: [
  //     "Use the RESTful objects endpoint (GET) to collect data objects from Weaviate.",
  //     "Use the RESTful objects endpoint (GET) to retrieve data objects with query parameters like limit, sort, order, offset and including fields like the object's vector",
  //     "Use the RESTful objects endpoint (PUT/PATCH) to update data objects in Weaviate.",
  //     "Use the RESTful objects endpoint (HEAD) to check and validate if data objects exists without retrieving it."
  //   ],
  //   owner: "jp",
  //   reviewer: "jp"
  // },




  // vectorization_essentials: {
  //   title: "Vectorization Essentials",
  //   body: "Learn about vectors including how to create and use them.",
  //   buttonType: "Click here",
  //   badgeType: "mixed",
  //   buttonURL: "/developers/academy/units/vectorization_essentials",
  //   learningGoals: [
  //     "Various options for providing vector embeddings.",
  //     "Important class and property parameters, including cross-references.",
  //     "The relationship between the data structure and searches.",
  //     "How vectors and deep learning models enable semantic search.",
  //     "How Weaviate converts data into vectors.",
  //     "Weaviate's text vectorization process.",
  //     "Basics of vectorizer selection for Weaviate.",
  //   ],
  //   learningOutcomes: [
  //     "Different options for providing vector embeddings in Weaviate",
  //     "Understand how the data structure affects search capabilities and results.",
  //     "Describe the use of vectors and deep learning models in semantic search.",
  //     "Broadly explain the process by which Weaviate converts data into vectors.",
  //     "Understand the fundamental concepts of text vectorization.",
  //     "Outline why vectorizer selection is important for effective search.",
  //     "Broadly outline available vectorizer types in Weaviate.",
  //   ],
  //   owner: "jp",
  //   reviewer: "jp"
  // },
  // imports_in_detail: {
  //   title: "Data import",
  //   body: "How to efficiently import data into Weaviate.",
  //   buttonType: "Click here",
  //   badgeType: "practical",
  //   buttonURL: "/developers/academy/units/data_import",
  //   learningGoals: [
  //     "The ability to populate Weaviate with data, including an understanding of suggested best practices such as batching, error diagnoses and handling.",
  //   ],
  //   learningOutcomes: [
  //     "Use upload, retrieve and change operations to a data schema in Weaviate.",
  //     "Describe available batching parameters and their purpose.",
  //     "Distinguish between object-level and batch-level errors occurring during import.",
  //     "Identify object-level import errors and implement error handling through the Weaviate client.",
  //   ],
  //   owner: "jp",
  //   reviewer: "jp"
  // },
  // modules: {
  //   title: "Modules",
  //   body: "What roles modules play, and how to enable and use them, including examples.",
  //   buttonType: "Notify",
  //   buttonURL: "/developers/academy/units/modules",
  //   badgeType: "mixed",
  //   learningGoals: [
  //     "Learn that Weaviate is fully modularized",
  //     "Learn what modules are, how to choose, enable and use them.",
  //     "Learn the difference between vectorization modules and reader/generator modules"
  //   ],
  //   learningOutcomes: [
  //     "Explain the different types of modules that you can use with Weaviate.",
  //     "Select the right modules for your use case, and enable them for your Weaviate instance."
  //   ],
  //   owner: "jp",
  //   reviewer: "jp"
  // },



  // search_theory: {
  //   title: "Vector search theory",
  //   body: "Vector search powers Weaviate - but what is it and how does it work?",
  //   buttonType: "Click here",
  //   badgeType: "theory",
  //   learningGoals: [
  //     "Learn what vectors are",
  //     "Understand how vectors vectors can be used to represent meaning",
  //     "Understand how vector search works"
  //   ],
  //   learningOutcomes: [
  //     "Understand the connection between vectors and meaning",
  //     "Understand how vectors representing the meaning of data enables semantic search.",
  //     "Understand how vectors can be calculated from e.g. machine learning models."
  //   ],
  //   owner: "jp",
  //   reviewer: "jp"
  // },
  // queries_3: {
  //   title: "Queries 3 (Advanced)",
  //   body: "Learn about BM25 and hybrid searches, and the `Explore` function.",
  //   buttonType: "Notify",
  //   badgeType: "practical",
  //   learningGoals: [
  //     "Learn how to do a data search using GraphQL with more complex queries using e.g. BM25, Hybrid Search, Explore and formulate complex filters with multiple operands.",
  //     "Learn how to use module-specific query functions and parameters."
  //   ],
  //   learningOutcomes: [
  //     "Formulate search queries using BM25.",
  //     "Construct hybrid search queries using a combination of vector search and BM25.",
  //     "Use variables in hybrid search to tweak the query to the use case.",
  //     "Construct GraphQL Explore queries for data exploration",
  //     "Construct GraphQL queries with module-specific filters, functions and parameters.",
  //   ],
  //   owner: "jp",
  //   reviewer: "jp"
  // },
  // indexing: {
  //   title: "Indexing (Advanced)",
  //   buttonType: "Notify",
  //   body: "Learn how Weaviate indexes data, and how to balance retrieval speed with recall.",
  //   badgeType: "theory",
  //   learningGoals: [
  //     "Learn how Weaviate indexes data using one of the available vector indexing plugins.",
  //     "Learn about HNSW and how to configure it to balance retrieval speed with recall."
  //   ],
  //   learningOutcomes: [
  //     "Describe how data indexing works within Weaviate.",
  //     "Recognize and describe various indexing methods.",
  //     "Understand and use configuration parameters of HNSW to balance speed and recall."
  //   ],
  //   owner: "jp",
  //   reviewer: "jp"
  // },
  // schema_2: {
  //   title: "Schema 2 (Advanced)",
  //   body: "Implement cross-references, and modify indexing options through the schema.",
  //   buttonType: "Notify",
  //   badgeType: "practical",
  //   learningGoals: [
  //     "Learn how to implement cross-references between data objects.",
  //     "Learn about indexing options and how to set this in a schema.",
  //     "Learn about module-specific schema settings and how to modify this."
  //   ],
  //   learningOutcomes: [
  //     "Create cross-references between data classes in the schema.",
  //     "Use different indexing settings for data objects in the schema.",
  //     "Use module-specific settings for data objects in the schema."
  //   ],
  //   owner: "jp",
  //   reviewer: "jp"
  // },
  // t2v_under_hood: {
  //   title: "Text2vec under the hood",
  //   body: "Find out exactly how Weaviate vectorizes text, and how to modify its behavior.",
  //   buttonType: "Notify",
  //   badgeType: "theory",
  //   learningGoals: [
  //     "Understand Weaviate's default object vectorization behavior in terms of data types and order of text concatenation, and how to modify this"
  //   ],
  //   learningOutcomes: [
  //     "Explain the processes Weaviate employs to pre-process text before vectorization.",
  //     "Demonstrate where to locate the exact references for data types and concatenation order in the documentation.",
  //     "Implement manual vectorization (e.g. via OpenAI API) to reproduce a vector produced by Weaviate.",
  //     "Formulate a vectorization strategy and defend its reasoning given a data object and a goal."
  //   ],
  //   owner: "jp",
  //   reviewer: "jp"
  // },
  // vectorizer_selection_2: {
  //   title: "Vectorizer selection 2",
  //   body: "Get into the weeds in model selection: how to look for a model that best suits your use case.",
  //   buttonType: "Notify",
  //   badgeType: "theory",
  //   learningGoals: [
  //     ""
  //   ],
  //   learningOutcomes: [
  //     ""
  //   ]
  // },
  // custom_models: {
  //   title: "Custom models with Weaviate",
  //   body: "How you can combine your custom vectorizer model with Weaviate.",
  //   buttonType: "Notify",
  //   badgeType: "mixed",
  //   learningGoals: [
  //     ""
  //   ],
  //   learningOutcomes: [
  //     ""
  //   ]
  // },
  // module_building: {
  //   title: "Module building",
  //   body: "You can extend Weaviate's capabilities with custom modules. Learn how to build one to fit your needs.",
  //   buttonType: "Notify",
  //   badgeType: "practical",
  //   learningGoals: [
  //     ""
  //   ],
  //   learningOutcomes: [
  //     ""
  //   ]
  // },
  // backups: {
  //   title: "Backups",
  //   body: "How to back up and restore data in Weaviate: try partial and full backups to local or cloud storage.",
  //   buttonType: "Notify",
  //   badgeType: "practical",
  //   learningGoals: [
  //     "Learn how to back up and restore data in Weaviate, both partial and full backups to local and cloud storage. "
  //   ],
  //   learningOutcomes: [
  //     "Create partial and full backups of a Weaviate instance.",
  //     "Restore backups of a Weaviate instance into another instance."
  //   ],
  //   owner: "jp",
  //   reviewer: "jp"
  // },
  // auth: {
  //   title: "Authentication & Authorization",
  //   body: "Identify users and control access with OpenID Connect (OIDC).",
  //   buttonType: "Notify",
  //   badgeType: "practical",
  //   learningGoals: [
  //     "An overview of authentication and authorization, as well as how to implement token-based authentication and authorization in Weaviate."
  //   ],
  //   learningOutcomes: [
  //     "Describe the principles behind token-based security such as OIDC / OAuth.",
  //     "Differentiate between an ID token and access token",
  //     "Implement OIDC-based authentication with Weaviate using Weaviate Cloud Services as the identity provider.",
  //     "Implement authorization with Weaviate based on OIDC authentication."
  //   ],
  //   owner: "jp",
  //   reviewer: "jp"
  // },
  // scaling: {
  //   title: "Scaling",
  //   body: "What to expect and consider when scaling Weaviate to production.",
  //   buttonType: "Notify",
  //   badgeType: "theory",
  //   learningGoals: [
  //     ""
  //   ],
  //   learningOutcomes: [
  //     ""
  //   ]
  // },
  // replication: {
  //   title: "Replication",
  //   body: "What to consider when adding replication, and how to implement it.",
  //   buttonType: "Notify",
  //   badgeType: "mixed",
  //   learningGoals: [
  //     "Learn what replication is, what to consider and how to implement it for your Weaviate instance."
  //   ],
  //   learningOutcomes: [
  //     "Describe what replication is, when to use it and how replication is designed in Weaviate.",
  //     "Select the correct replication factor and consistency levels for read and write operations for various use cases.",
  //     "Create a replicated Weaviate setup through settings in the schema.",
  //     "Create queries to retrieve data with various consistency levels."
  //   ],
  //   owner: "jp",
  //   reviewer: "jp"
  // },
  // migration: {
  //   title: "Migration",
  //   body: "How to upgrade (or downgrade) your Weaviate version.",
  //   buttonType: "Notify",
  //   badgeType: "practical",
  //   learningGoals: [
  //     ""
  //   ],
  //   learningOutcomes: [
  //     ""
  //   ]
  // },
  // kubernetes: {
  //   title: "Weaviate and Kubernetes",
  //   body: "How to run Weaviate on Kubernetes, and best practice tips.",
  //   buttonType: "Notify",
  //   badgeType: "practical",
  //   learningGoals: [
  //     ""
  //   ],
  //   learningOutcomes: [
  //     ""
  //   ]
  // },
  // clients: {
  //   title: "Weaviate Clients",
  //   body: "An overview: what's available, where to find them, and their capabilities.",
  //   buttonType: "Notify",
  //   badgeType: "mixed",
  //   learningGoals: [
  //     "Learn what Weaviate client libraries offer, which client languages are available and how to use them."
  //   ],
  //   learningOutcomes: [
  //     "Understand where to find which Weaviate clients are available.",
  //     "Understand the capabilities of the Weaviate clients.",
  //     "Use a client to interact with Weaviate's API endpoints."
  //   ],
  //   owner: "jp",
  //   reviewer: "jp"
  // },
  // docker: {
  //   title: "Weaviate with Docker",
  //   body: "How to run Weaviate on Docker, and best practice tips.",
  //   buttonType: "Notify",
  //   badgeType: "practical",
  //   learningGoals: [
  //     ""
  //   ],
  //   learningOutcomes: [
  //     ""
  //   ]
  // },
  // reader_generator: {
  //   title: "Reader and Generator modules",
  //   body: "Overview of question-answering, summarization and named entity recognition modules.",
  //   buttonType: "Notify",
  //   badgeType: "mixed",
  //   learningGoals: [
  //     "Learn about reader and generator modules like question answering, summerization and NER in a Weaviate pipeline, and how to use them."
  //   ],
  //   learningOutcomes: [
  //     "Describe what reader and generator modules are.",
  //     "Choose fitting reader and/or generator modules for various use cases.",
  //     "Use third party (HuggingFace, OpenAI) reader and/or generator models in a Weaviate setup.",
  //     "Use reader and generator modules in GraphQL queries."
  //   ],
  //   owner: "jp",
  //   reviewer: "jp"
  // },
  vectorizer_selection_1: {
    title: "Vectorizer selection 1",
    body: "This unit will discuss the basics on how to select a good baseline vectorizer for given data and task types.",
    buttonType: "TBD",
    badgeType: "theory",
    learningGoals: [
      "Theory and heuristics for selecting appropriate, robust vectorizers for the data type and task at hand and how to set the vectorizer appropriately in Weaviate.",
    ],
    learningOutcomes: [
      "Describe key considerations in vectorizer selection.",
      "List types of vectorizer modules available with Weaviate.",
      "Identify key differences between using an inference service and a local model.",
      "Describe situations in which a fine-tuned model may significantly outperform a pretrained model.",
      "Select an appropriate vectorizer model for a given data and task type.",
      "Demonstrate ability to change the default vectorizer in Weaviate.",
      "Demonstrate ability to change the class vectorizer in Weaviate.",
    ],
    owner: "jp",
    reviewer: "jp"
  },
  beyond_text: {
    title: "Weaviate: Beyond text",
    body: "How to use Weaviate with non-text media, such as images. What models are available, and how can you use them?",
    buttonType: "TBD",
    badgeType: "mixed",
    learningGoals: [
      "What media types are currently supported, and how to use Weaviate with each media type and appropriate module."
    ],
    learningOutcomes: [
      "Select an appropriate module for vectorizing non-text data given the data type and use case.",
      "Construct a schema for non-text data types such as images.",
      "Use Weaviate to catalog text and non-text data in the same vector space.",
      "Implement a Weaviate instance with vectorized non-text data.",
    ],
    owner: "jp",
    reviewer: "jp"
  },

  chunking: {
    title: "Document chunking - why and how?",
    body: "Chunking is essential for working with longer texts in vector databases. This unit covers how to use it as well as tips and best practices.",
    buttonType: "Click here",
    buttonURL: "/developers/academy/standalone/chunking",
    badgeType: "practical",
    learningGoals: [
      "What chunking is",
      "Its role in vector search and generative search",
      "Various chunking methods",
      "Key considerations and suggested starting points",
    ],
    learningOutcomes: [
      "Describe chunking at a high level",
      "Explain the impact of chunking in vector search and retrieval augmented generation",
      "Implement various chunking methods and know where to explore others",
      "Evaluate chunking strategies based on your needs",
    ],
    owner: "jp",
    reviewer: "jp"
  },
  // vectorizer_text_overview: {
  //   title: "Text vectorizers: An overview",
  //   body: "An overview of models - from bag-of-words to word2vec and all the way to transformers.",
  //   buttonType: "Notify",
  //   badgeType: "mixed",
  //   learningGoals: [
  //     "A brief history of text vectorization in modern natural language processing to provide context for their development including pros and cons."
  //   ],
  //   learningOutcomes: [
  //     "Describe each of bag-of-words, word-based, and transformer models as well as RNN and LSTM models at a high level.",
  //     "Categorize well-known models and methods such as TF-IDF, BM25, text2vec, GloVe, FastText, BERT, GPT and CLIP to a model type.",
  //     "Distinguish key differences between each model types as well as key limitations or challenges for each model type.",
  //   ],
  //   owner: "jp",
  //   reviewer: "jp"
  // },
  // {
  //   title: "Placeholder",
  //   body: "Something something dark side",
  //   buttonType: "Notify",
  //   badgeType: "mixed",
    // learningGoals: [
    //   "TBC"
    // ],
    // learningOutcomes: [
    //   "TBC"
    // ]
  // },
};
