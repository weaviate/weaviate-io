import React, { useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import styles from './styles.module.scss';

let vectorizing = `import weaviate
from weaviate.classes.config import Configure

# Choose one of the many built-in vectorizers
client.collections.create(
    "SupportTickets",
    vectorizer_config=[
        Configure.NamedVectors.text2vec_weaviate(
            model="Snowflake/snowflake-arctic-embed-l-v2.0"
        )
    ]
)

# Insert data in bulk
collection.data.insert(
    properties={
        "title": "Cannot reset password",
        "content": "User is unable to reset their password using the provided link."
    }
)`

let searching = `import weaviate
from weaviate.classes.query import HybridFusion

# Retrieve the collection
collection = client.collections.get("SupportTickets")

# End-to-end hybrid search in less than 10 lines of code
response = collection.query.hybrid(
    query="I have login issues after the OS upgrade",
    alpha=0.75,
    fusion_type=HybridFusion.RANKED,
    auto_limit=1,
    limit=10,
)

for obj in response.objects:
    print(obj.properties)`

let tenanting = `import weaviate
from weaviate.classes.config import Configure

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
`

let agenting = `import weaviate
from weaviate.agents.classes import Operations
from weaviate.collections.classes.config import DataType
from weaviate.agents.transformation import TransformationAgent

# Define the agentic operation
add_summary = Operations.append_property(
    property_name="summary",
    data_type=DataType.TEXT,
    view_properties=["content"],
    instruction="Summarize the content of the support ticket in one sentence."
)

# Initialize the agent
agent = TransformationAgent(
    client=client,
    collection="SupportTickets",
    operations=[add_summary]
)

# Run the transformation on all objects in the collection
agent.update_all()`

const codeExamples = {
  searching: searching,
  vectorizing: vectorizing,
  tenanting: tenanting,
  agenting: agenting,
};

export default function CodeTabs() {
  const [active, setActive] = useState('searching');

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
        language='python'
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} ${styles.codeBlock}`}
            style={{ ...style, backgroundColor: 'transparent', overflowX: 'auto', maxHeight: '18rem' }}
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
