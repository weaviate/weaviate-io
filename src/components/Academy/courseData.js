export const courseData = {
  "zero_to_mvp": {
    title: "Zero to MVP",
    courseId: "1",
    body: "All the core knowledge and essential skills you need to build a minimum viable product with Weaviate.",
    buttonType: "TBD",
    badgeType: "course",
    isCourse: true,
    units: [
      "hello_weaviate", "queries_1", "vectorization_essentials", "schema_1",
      "data_import", "queries_2", "crud_operations", "modules"
    ],
    learningGoals: [
      "TBC"
      // "How to build a Weaviate instance and populate it with vectorized data, as well as how to construct queries to efficiently retrieve relevant data."
    ],
    learningOutcomes: [
      "TBC"
      // "Use Weaviate Cloud Services to create an instance of Weaviate",
      // "Use appropriate query types and syntax to look retrieve desired objects",
      // "Outline what vector search is and suggest an appropriate vectorizer for a given scenario",
      // "Select and configure appropriate Weaviate modules for use",
      // "Demonstrate how to efficiently populate an Weaviate instance with data",
      // "Integrate learnings from this course to build an instance of Weaviate with your own data an appropriate vectorizer"
    ]
  },
  "zero_to_mvp_advanced": {
    title: "Zero to MVP: Advanced",
    courseId: "1A",
    body: "Expand on the `Getting to MVP` course for deeper dives into key topics like search theory, indexing and queries.",
    buttonType: "TBD",
    badgeType: "course",
    isCourse: true,
    units: [
      "vectorizer_selection_1", "search_theory", "queries_2", "indexing", "schema_2"
    ],
    learningGoals: [
      "TBC"
      // "In-depth material on the inner workings of vector searches, as well as additional querying techniques and vectorization strategies."
    ],
    learningOutcomes: [
      "TBC"
      // "Outline how and why a vector search works, and contrast it to scalar searches",
      // "Differentiate BM25 and hybrid search techniques from vector search techniques and apply suitable techniques for given goals",
      // "Compare types of indexes used by Weaviate, and modify parameters to balance speed and recall",
      // "Describe when cross-references between classes may be appropriate and demonstrate how to apply them",
      // "Modify vectorization regimes to specify which properties are vectorized and in what order"
    ]
  },
  "customization_with_modules": {
    title: "Customization using modules",
    courseId: "2",
    body: "How to adapt Weaviate with custom vectorizer models and modules as well as tweaked vectorization behavior.",
    buttonType: "Notify",
    badgeType: "course",
    isCourse: true,
    units: [
      "t2v_under_hood", "vectorizer_selection_2", "custom_models", "module_building"
    ],
    learningGoals: [
      "TBC"
    ],
    learningOutcomes: [
      "TBC"
    ]
  },
  "to_production": {
    title: "MVP to Production",
    courseId: "3",
    body: "Speed to production with authentication & authorization, backups, monitoring and replication.",
    buttonType: "Notify",
    badgeType: "course",
    isCourse: true,
    units: [
      "backups", "auth", "scaling", "replication", "migration", "kubernetes"
    ],
    learningGoals: [
      "TBC"
    ],
    learningOutcomes: [
      "TBC"
    ]
  },
  "standalone": {
    title: "Standalone units",
    courseId: "0",
    body: "Bite-sized, standalone units that can be reviewed by themselves.",
    buttonType: "Notify",
    badgeType: "course",
    isCourse: false,
    units: [
      "clients", "docker", "reader_generator", "beyond_text", "vectorizer_text_overview"
    ]
  }
};