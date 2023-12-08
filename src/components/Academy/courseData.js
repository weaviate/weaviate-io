export const courseData = {
  "zero_to_mvp": {
    title: "Zero to MVP: The basics",
    courseId: "1",
    body: "Start here: Get started with all the core knowledge and essential skills for building with Weaviate. Learn how to build a Weaviate database and effectively perform queries to find the right data.",
    buttonType: "Click here",
    buttonURL: "/developers/academy/zero_to_mvp",
    badgeType: "course",
    isCourse: true,
    units: [
      "hello_weaviate", "queries_1", "schema_and_import", "queries_2"
    ],
    learningGoals: [
      "How to build a Weaviate instance and populate it with vectorized data, as well as how to construct queries to efficiently retrieve relevant data."
    ],
    learningOutcomes: [
      "Use Weaviate Cloud Services to create an instance of Weaviate",
      "Use appropriate query types and syntax to retrieve desired objects",
      "Outline what vector search is and how it works",
      "Demonstrate how to efficiently populate an Weaviate instance with data",
      "Differentiate BM25 and hybrid search techniques from vector search techniques",
    ]
  },
  "intro_weaviate_typescript": {
    title: "Intro to Weaviate with Typescript (or JavaScript)",
    courseId: "TS/JS-1",
    body: "A practical course where you can learn how to add Weaviate to a TypeScript (or JavaScript) app.",
    buttonType: "Click here",
    buttonURL: "/developers/academy/intro_weaviate_typescript",
    badgeType: "course",
    isCourse: true,
    units: [
      "intro_weaviate_typescript"
    ],
    learningGoals: [
      "The basics of Weaviate, and how to integrate it to a TypeScript app."
    ],
    learningOutcomes: [
      "Create a cloud (WCS) instance fo Weaviate.",
      "Gain an understanding of what a vector database is.",
      "Define a schema (collection definition) and import data.",
      "Perform queries on your data.",
      "Integrate Weaviate into your TypeScript/JavaScript app.",
    ]
  },
  "building_with_weaviate": {
    title: "Building with Weaviate",
    courseId: "2",
    body: "Expand on the `Getting to MVP` course for deeper dives into key topics vectorizer selection, multi-modal models, and best practices.",
    buttonType: "Click here",
    badgeType: "course",
    isCourse: true,
    units: [
      "which_search",
      "schema_design",
      "vectorizer_selection",
      "indexing",
    ],
    learningGoals: [
      "In-depth material and best practices to help you build with Weaviate, such as vectorization options, which searches to perform and how to work with your indexes."
    ],
    learningOutcomes: [
      "Select a suitable vectorizer for your given goals and situation.",
      "Understand practical differences between search methods and suggest a suitable technique for a given situation.",
      "Compare types of indexes used by Weaviate, and modify parameters to balance speed and recall.",
    ]
  },
  // "configuring_weaviate_instance": {
  //   title: "Customization using modules",
  //   courseId: "2",
  //   body: "",
  //   buttonType: "Notify",
  //   badgeType: "course",
  //   isCourse: true,
  //   units: [
  //     "t2v_under_hood", "vectorizer_selection_2", "custom_models", "module_building"
  //   ],
  //   learningGoals: [
  //     "TBC"
  //   ],
  //   learningOutcomes: [
  //     "TBC"
  //   ]
  // },
  // "to_production": {
  //   title: "Getting to Production",
  //   courseId: "3",
  //   body: "Speed to production with authentication & authorization, backups, monitoring and replication.",
  //   buttonType: "Notify",
  //   badgeType: "course",
  //   isCourse: true,
  //   units: [
  //     "backups", "auth", "scaling", "replication", "migration", "kubernetes"
  //   ],
  //   learningGoals: [
  //     "TBC"
  //   ],
  //   learningOutcomes: [
  //     "TBC"
  //   ]
  // },
  "standalone": {
    title: "Standalone units",
    courseId: "0",
    body: "Bite-sized, standalone units that can be reviewed by themselves.",
    buttonType: "Notify",
    badgeType: "course",
    isCourse: false,
    units: [
      "chunking", "beyond_text"
    ]
  }
};
