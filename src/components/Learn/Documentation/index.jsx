import React from 'react';
import Link from '@docusaurus/Link';
import styles from '../GetStarted/styles.module.scss';

const groups = [
  {
    title: 'Quickstarts',
    description: 'Start building in the cloud or locally.',
    links: [
      ['Cloud quickstart', 'https://docs.weaviate.io/weaviate/quickstart'],
      ['Local quickstart', 'https://docs.weaviate.io/weaviate/quickstart/local'],
      ['Connect to Weaviate', 'https://docs.weaviate.io/weaviate/connections'],
      ['Generative search (RAG)', 'https://docs.weaviate.io/weaviate/starter-guides/generative'],
      ['Which Weaviate is right for me?', 'https://docs.weaviate.io/weaviate/starter-guides/which-weaviate'],
      ['Collections and data schema', 'https://docs.weaviate.io/weaviate/starter-guides/managing-collections'],
      ['Managing resources', 'https://docs.weaviate.io/weaviate/starter-guides/managing-resources'],
      ['All starter guides', 'https://docs.weaviate.io/weaviate/starter-guides'],
    ],
  },
  {
    title: 'Weaviate Academy',
    description: 'Build your skills with courses created by the Weaviate team and its partners.',
    links: [
      ['Weaviate Academy courses', 'https://academy.weaviate.io/'],
      ['DeepLearning.AI course', 'https://www.deeplearning.ai/short-courses/vector-databases-embeddings-applications/'],
      ['LinkedIn Learning course', 'https://www.linkedin.com/learning/introduction-to-ai-native-vector-databases'],
    ],
    // TODO: Confirm replacement destinations for these legacy Academy links; some redirect to documentation.
    additionalLinks: [
      ['Text data', 'https://docs.weaviate.io/academy/py/starter_text_data'],
      ['Custom vectors', 'https://docs.weaviate.io/academy/py/starter_custom_vectors'],
      ['Multimodal data', 'https://docs.weaviate.io/academy/py/starter_multimodal_data'],
      ['Vector compression', 'https://docs.weaviate.io/academy/py/compression'],
      ['Multi-tenancy', 'https://docs.weaviate.io/academy/py/multitenancy'],
      ['Choosing a search method', 'https://docs.weaviate.io/academy/py/standalone/which_search'],
      ['Chunking long texts', 'https://docs.weaviate.io/academy/py/standalone/chunking'],
    ],
  },
  {
    title: 'Documentation',
    description: 'Find guides, concepts, and API references for your build.',
    links: [
      ['Model provider integrations', 'https://docs.weaviate.io/weaviate/model-providers'],
      ['Configuration', 'https://docs.weaviate.io/weaviate/configuration'],
      ['Search', 'https://docs.weaviate.io/weaviate/search'],
      ['Manage data', 'https://docs.weaviate.io/weaviate/manage-data'],
      ['Concepts', 'https://docs.weaviate.io/weaviate/concepts'],
      ['API references', 'https://docs.weaviate.io/weaviate/api'],
      ['Client libraries', 'https://docs.weaviate.io/weaviate/client-libraries'],
    ],
  },
  {
    title: 'Code examples',
    description: 'Use recipes and demos to get started with working examples.',
    links: [
      ['Python recipes', 'https://github.com/weaviate/recipes'],
      ['JavaScript and TypeScript recipes', 'https://github.com/weaviate/recipes-ts'],
      ['Demos', 'https://playground.weaviate.io/'],
      ['JavaScript guide', '/javascript'],
    ],
  },
  {
    title: 'Repositories',
    description: 'Find the database and client libraries on GitHub.',
    links: [
      ['Weaviate', 'https://github.com/weaviate/weaviate'],
      ['Python client', 'https://github.com/weaviate/weaviate-python-client'],
      ['TypeScript client', 'https://github.com/weaviate/typescript-client'],
      ['Go client', 'https://github.com/weaviate/weaviate-go-client'],
      ['Java client', 'https://github.com/weaviate/java-client'],
      ['All Weaviate repositories', 'https://github.com/weaviate'],
    ],
  },
];

export default function Documentation() {
  return (
    <section className={styles.bgCol} id="developer-resources">
      <div className="container" id="documentation">
        <div className={styles.header}>
          <h2>Developer resources</h2>
          <p>Build, test, and deploy with practical guidance.</p>
        </div>
        <div className={styles.roleGrid}>
          {groups.map(({ title, description, links, additionalLinks }) => (
            <div className={styles.typeBox} key={title} id={title === 'Code examples' ? 'code-examples' : undefined}>
              <div className={styles.typeIcon}><h3>{title}</h3></div>
              <div className={styles.typeText}>
                <p>{description}</p>
                <ul>
                  {links.map(([label, to]) => <li key={to}><Link to={to}>{label}</Link></li>)}
                </ul>
                {additionalLinks && (
                  <details>
                    <summary>Additional learning topics</summary>
                    <ul>
                      {additionalLinks.map(([label, to]) => <li key={to}><Link to={to}>{label}</Link></li>)}
                    </ul>
                  </details>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
