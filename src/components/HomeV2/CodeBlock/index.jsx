import React, { useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import styles from './styles.module.scss';

const codeExamples = {
  python: `jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(query="food", limit=3)

for o in response.objects:
    print(o.properties)`,
  go: `// Go code example
client := weaviate.NewClient(...)
resp := client.Query().Hybrid("food", 3)
fmt.Println(resp)`,
  js: `// JavaScript/TypeScript example
const response = await client.query.hybrid({ query: "food", limit: 3 });
console.log(response);`,
  graphql: `# GraphQL example
query {
  Get {
    JeopardyQuestion(nearText: { concepts: ["food"] }, limit: 3) {
      properties
    }
  }
}`,
};

export default function CodeTabs() {
  const [active, setActive] = useState('python');

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
        language={active}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} ${styles.codeBlock}`}
            style={{ ...style, backgroundColor: 'transparent' }}
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
