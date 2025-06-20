import React, { useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import styles from './styles.module.scss';

let vectorizing = `from weaviate.classes.config import Configure

# Choose one of the many built-in vectorizers
collection = client.collections.create(
    "SupportTickets",
    vectorizer_config=Configure.Vectorizer.text2vec_weaviate(
        model="Snowflake/snowflake-arctic-embed-l-v2.0"
    )
)

# Insert data in bulk
collection.data.insert_many([
    {
        "title": "Cannot reset password",
        "content": "User is unable to reset their password using the provided link."
    }
])`;

let searching = `# Retrieve the collection
collection = client.collections.get("SupportTickets")

# Pure vector search
response = jeopardy.query.near_vector(
    near_vector=[0.1, 0.1, 0.1],
    limit=5
)

# Semantic search
response = collection.query.near_text(
    query="login issues after OS upgrade",
    limit=5
)

# Hybrid search (vector + keyword)
response = collection.query.hybrid(
    query="login issues after OS upgrade",
    alpha=0.75,
    limit=5
)`;

let tenanting = `from weaviate.classes.config import Configure

# Optimize for speed (memory) or storage (disk)
memo_idx = Configure.VectorIndex.flat()
disk_idx = Configure.VectorIndex.hnsw()

# Create a multi tenancy set-up
collection = client.collections.create(
    name="SupportTickets",
    vector_index_config=disk_idx,
    multi_tenancy_config=Configure.multi_tenancy()
)

# Offload to S3
collection.tenants.offload("ACME")

# Active from S3
collection.tenants.activate("StarkIndustries")
`;

let agenting = `from weaviate.agents.classes import Operations
from weaviate.collections.classes.config import DataType
from weaviate.agents.transformation import TransformationAgent

# Define the agentic operation
add_severity = Operations.append_property(
    property_name="severity",
    data_type=DataType.TEXT,
    view_properties=["content"],
    instruction="Classify the severity of the ticket as Notice, Moderate, Important or Critical"
)

# Initialize the agent
agent = TransformationAgent(
    client=client,
    collection="SupportTickets",
    operations=[add_severity]
)

# Run the transformation on all objects in the collection
agent.update_all()`;

let rag = `from weaviate.classes.generate import GenerativeConfig

# Select collection
supportTickets = client.collections.get("SupportTicket")

# Generate an RAG response by piping
# results through a generative model
response = supportTickets.generate.near_text(
    query="Solutions to OS login bug",
    auto_limit=1,
    generative_provider=GenerativeConfig.openai(
        model="gpt-4o-mini",
    ),
    grouped_task="How do I fix my latest OS login bug?"
)`

const codeExamples = {
  search: searching,
  vectorize: vectorizing,
  RAG: rag,
  tenants: tenanting,
  agents: agenting,
};

export default function CodeTabs() {
  const [active, setActive] = useState('search');

  return (
    <div className={styles.codeTabs}>
      <div className={styles.tabHeader}>
        {Object.keys(codeExamples).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={active === key ? styles.active : ''}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>

      <Highlight
        {...defaultProps}
        theme={theme}
        code={codeExamples[active]}
        language="python"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} ${styles.codeBlock}`}
            style={{
              ...style,
              backgroundColor: 'transparent',
              overflowX: 'auto',
              maxHeight: '100%',
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
