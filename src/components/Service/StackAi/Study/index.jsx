import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function Study() {
  return (
    <div className={styles.bgColor}>
      <div className={styles.studyContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.studyContent}>
            <h2>Summary</h2>
            <p>
              <strong>
                Stack AI chose Weaviate as the vector database to power their
                enterprise AI orchestration platform. This resulted in
                significant cost savings, enhanced customer retention, and the
                ability to serve security-conscious customers through flexible
                deployment capabilities.
              </strong>
            </p>
            <h2>The Challenge</h2>
            <p>
              In the rapidly evolving AI landscape, Stack AI faces intense
              pressure to integrate new features and capabilities at
              unprecedented speed. Their enterprise customers require quick
              access to the latest AI models, embeddings, external applications,
              and advanced querying capabilities. The challenge lies in
              delivering these features rapidly while maintaining performance
              and reliability.{' '}
            </p>
            <p>
              <strong>
                {' '}
                "Business is moving at the speed of light. If you don't add
                features as soon as possible, competitors will add them,"
              </strong>{' '}
              explains Antoni Rosinol,<br></br> CEO and Co-founder of Stack AI.
            </p>{' '}
            <p>
              As the Stack AI team evaluated which datastore they would use,
              several key requirements came up. They wanted a reliable and
              fully-featured vector database, not a solution that had vector
              search bolted on like MongoDB or Postgres with pgvector.
            </p>{' '}
            <p>
              This also meant that they required top-tier performance and
              accuracy in vector search while maintaining reasonable costs for
              their growing company. Finally, they needed to be able to support
              large organizations that had strict legal and compliance
              requirements, so the ability to deploy in a secure environment was
              a must.
            </p>
            <h2>Why Weaviate?</h2>
            <p>
              After evaluating several vector database solutions including
              Pinecone, ChromaDB, and Qdrant, Stack AI chose Weaviate for its
              comprehensive feature set, strong technical foundation, and
              partnership-oriented support team. Here are some of the key
              reasons Stack AI went with Weaviate:
            </p>
            <ul className={styles.whyWeaviate}>
              <li>
                Reliability and feature robustness, including hybrid search and
                metadata querying.
              </li>
              <li>
                Purpose-built architecture, leveraging Weaviate’s unique
                solution to multi-tenancy.
              </li>
              <li>High-speed performance and accuracy in vector search.</li>
              <li>
                Cost-effective pricing structure that grows with the company.
              </li>
              <li>
                {' '}
                Flexible deployment capabilities for security and compliance.
              </li>{' '}
              <li>
                Ease of use with thoughtfully designed developer experience.
              </li>{' '}
              <li>
                Responsive support team helping Stack AI to quickly implement
                new features.
              </li>
            </ul>
            <p>
              <strong>
                "The biggest benefit of using Weaviate isn't just the technology
                – it's the team behind it. The level of support we receive
                through their engineering team and support channels has been
                company-saving help,"
              </strong>{' '}
              says Rosinol.
            </p>
            <h2>What's Next?</h2>
            <p>
              As Stack AI continues to grow, the team relies on Weaviate's
              continuous innovation and support to help them stay competitive in
              their field. The partnership has proven essential for maintaining
              their rapid development pace while ensuring reliable service for
              their enterprise customers.
            </p>
            <p>
              <span className={styles.quote}>
                “Stack AI is possible thanks to Weaviate.”
              </span>
            </p>
            <p>Antoni Rosinol, CEO of Stack AI</p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topSection}>
            <h2>Results</h2>
            <h3>Enhanced Customer Retention</h3>
            <p>
              Weaviate's robust support team and rapid feature development
              helped Stack AI maintain their customer base by quickly addressing
              technical challenges and implementing new capabilities.
            </p>
            <h3>Significant Cost Savings</h3>
            <p>
              Compared to alternative solutions like Pinecone, Stack AI achieved
              substantial cost savings in the tens of thousands of dollars while
              accessing a more robust feature set and maintaining high
              performance.
            </p>
            <h3>Unlocking Enterprise-readiness</h3>
            <p>
              Weaviate's flexible deployment options with their Enterprise Cloud
              offering enabled Stack AI to meet strict security and compliance
              requirements, enabling them to support enterprise customers in
              highly regulated industries.
            </p>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.logo}></div>

            <p>
              <Link to="https://www.stack-ai.com/">Stack AI</Link> is a platform
              for building and managing enterprise AI agents. With its visual
              interface and robust security features, enterprise organizations
              have everything they need to create, deploy, and manage AI agents.
              Stack AI supports use cases from operations to finance to
              healthcare. Founded in December 2022 by MIT graduates Antoni
              Rosinol and Bernando Aceituno, the company has quickly grown from
              a Y Combinator project to a Series A funded startup with over 100
              enterprise customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
