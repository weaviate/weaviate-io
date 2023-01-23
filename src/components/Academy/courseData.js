export const courseData = {
  "zero_to_mvp": {
    title: "Zero to MVP",
    courseId: "1",    
    body: "All the core knowledge and essential skills you need to build a minimum viable product with Weaviate.",
    buttonType: "TBD",
    badgeType: "course",
    isCourse: true, 
    units: [
      "intro", "wcs_intro", "queries_1", 
      "vectorizer_selection_1", "schema_1", "data_import", "crud_operations", "modules"
    ],
    learningGoals: [
      "How to build a Weaviate instance and populate it with vectorized data, as well as how to construct queries to efficiently retrieve relevant data."
    ],
    learningOutcomes: [
      "Use Weaviate Cloud Services to create an instance of Weaviate",    
      "Use appropriate query types and syntax to look retrieve desired objects",              
      "Outline what vector search is and suggest an appropriate vectorizer for a given scenario",
      "Select and configure appropriate Weaviate modules for use",
      "Demonstrate how to efficiently populate an Weaviate instance with data",
      "Integrate learnings from this course to build an instance of Weaviate with your own data an appropriate vectorizer"
    ]        
  },
  "zero_to_mvp_advanced": {
    title: "Zero to MVP: Advanced",
    courseId: "1A",
    body: "In-depth discussions topics to follow on from the `Getting to MVP` course.",
    buttonType: "TBD",
    badgeType: "course",
    isCourse: true,
    units: [
      "search_theory", "queries_2", "indexing", "schema_2"
    ],
    learningGoals: [
      "In-depth material on the inner workings of vector searches, as well as additional querying techniques and vectorization strategies."
    ],
    learningOutcomes: [
      "Outline how and why a vector search works, and contrast it to scalar searches",
      "Differentiate BM25 and hybrid search techniques from vector search techniques and apply suitable techniques for given goals",
      "Compare types of indexes used by Weaviate, and modify parameters to balance speed and recall",
      "Describe when cross-references between classes may be appropriate and demonstrate how to apply them",
      "Modify vectorization regimes to specify which properties are vectorized and in what order"
    ]
  },    
  "customization_with_modules": {
    title: "Customization using modules",
    courseId: "2",
    body: "For data scientists: adapt Weaviate with your own vectorizer models, custom modules and tweaked vectorization behavior.",
    buttonType: "Notify",
    badgeType: "course",   
    isCourse: true,   
    units: [
      "t2v_under_hood", "vectorizer_selection_2", "custom_models", "module_building"
    ],
    learningGoals: [
      "TBD"
    ],
    learningOutcomes: [
      "TBD"
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
      "TBD"
    ],
    learningOutcomes: [
      "TBD"
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