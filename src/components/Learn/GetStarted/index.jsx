import React from 'react';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import styles from './styles.module.scss';

const paths = [
  {
    title: 'AI & data leaders',
    description: 'Plan your AI strategy and choose a database for your organization.',
    links: [
      ['AI Strategy Playbook', '/ebooks/the-ai-strategy-playbook'],
      ['Choosing the Right Database for AI', '/ebooks/choosing-the-right-database-for-AI'],
      ['Case studies', '/case-studies'],
    ],
  },
  {
    title: 'Architects & platform teams',
    description: 'Plan infrastructure, security, and deployment for production.',
    links: [
      ['Which Weaviate is right for me?', 'https://docs.weaviate.io/weaviate/starter-guides/which-weaviate'],
      ['Reduce infrastructure costs with tiered storage', 'https://docs.weaviate.io/weaviate/starter-guides/managing-resources'],
      ['Deployment guides', 'https://docs.weaviate.io/deploy'],
      ['Security', '/security'],
      ['Deployment options', '/enterprise'],
    ],
  },
  {
    title: 'Developers',
    description: 'Start building with quickstarts, courses, and recipes.',
    links: [
      ['Cloud quickstart', 'https://docs.weaviate.io/weaviate/quickstart'],
      ['Weaviate Academy', 'https://academy.weaviate.io/'],
      ['Python recipes', 'https://github.com/weaviate/recipes'],
      ['JavaScript and TypeScript recipes', 'https://github.com/weaviate/recipes-ts'],
    ],
  },
];

export default function GetStarted() {
  useBrokenLinks().collectAnchor('learning-paths');

  return (
    <section className={styles.bgCol} id="get-started">
      <div className={`container ${styles.roleAnchor}`} id="learning-paths">
        <div className={styles.header}>
          <h2>Learning paths by role</h2>
          <p>Whether you're setting AI strategy, running the platform, or writing the code.</p>
        </div>
        <div className={styles.roleGrid}>
          {paths.map(({ title, description, links }) => (
            <div className={styles.typeBox} key={title}>
              <div className={styles.typeIcon}><h3>{title}</h3></div>
              <div className={styles.typeText}>
                <p>{description}</p>
                <ul>
                  {links.map(([label, to]) => <li key={to}><Link to={to}>{label}</Link></li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
