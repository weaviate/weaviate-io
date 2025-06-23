import React, { useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import styles from './styles.module.scss';

let searchExample = `# Retrieve the collection
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
)`

let vectorizerExample = `from weaviate.classes.config import Configure

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
])`

const ragExample = `from weaviate.classes.generate import GenerativeConfig

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

const tenantExample = `# Create a multi-tenanant collection
emails = client.collections.create(
    name="CustomerEmails",
    vectorizer_config=Configure.Vectorizer.text2vec_weaviate(),
    multi_tenancy_config=Configure.multi_tenancy(
        enabled=True,
        auto_tenant_creation=True
    )
)

# Manage tenant data and query
acmeTenant = emails.tenants.get("ACME")
acmeTenant.data.insert_many(acme_data)

response = acmeTenant.query.near_text(query="ACME question", limit=3)

# Offload to S3
emails.tenants.offload("ACME")

# Activate from S3
emails.tenants.activate("StarkIndustries")`

const vectorIndexExample = `# Pick your vector indexing strategy
memory_index = Configure.VectorIndex.hnsw() # Use HNSW for lightning-fast in-memory search
disk_index = Configure.VectorIndex.flat()   # Use Flat for fast, disk-based indexing

# Set the index type for your collection in one line
client.collections.create(
    name="Products",
    vectorizer_config=Configure.Vectorizer.text2vec_weaviate(),
    vector_index_config=disk_index
)

# Set vector compression to reduce memory footprint
client.collections.create(
    name="ProductManuals",
    vectorizer_config=Configure.Vectorizer.text2vec_weaviate(),

    # Use Product Quantization to save 75% of required RAM
    vector_index_config=Configure.VectorIndex.hnsw(
        quantizer=Configure.VectorIndex.Quantizer.pq()
    ),
)`

const agentExample = `from weaviate.agents.classes import Operations
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
agent.update_all()`

const codeExamples = {
  search: searchExample,
  vectorize: vectorizerExample,
  RAG: ragExample,
  tenants: tenantExample,
  agents: agentExample,
  index: vectorIndexExample,
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
