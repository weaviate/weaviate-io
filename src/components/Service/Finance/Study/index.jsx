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
                A leading US financial data analytics company needed to enable
                their engineering teams to build and scale secure, reliable AI
                applications, fast. Weaviate’s AI-native, open source vector
                database came with robust out-of-the-box features, flexible
                deployment options, strong performance, and reliable support,
                making it the company’s vector database of choice. In less than
                one year, this company commercialized AI and empowered every
                internal employee to ask questions about their files in their
                proprietary chat tool.
              </strong>
            </p>
            <h2>Challenge</h2>
            <p>
              A Lead System Engineer (LSE) was tasked to determine which vector
              database would best enable engineering teams across the company to
              build and scale secure applications in production. As AI
              excitement spread across the financial data industry, he noticed
              that within a month there were four to five different vector
              databases in use across internal teams. He needed to find and
              implement the right solution before tool sprawl got out of hand
              and his team would be stuck supporting a bloated tech stack.
              Additionally, competitors were starting to build their own AI
              tools to support faster and more accurate decision making – the
              company needed to move quickly to maintain the best-in-class
              service they provide their customers.
            </p>
            <h2>Why Weaviate</h2>
            <p>
              Early in his research, the LSE learned that his company’s
              engineers weren’t just looking for a database to support basic
              search features – they wanted to build chatbots, integrate
              multiple data sources and large language models (LLMs), have
              support for vector search, metadata, hybrid search, reranking, and
              filtering. He worked across teams to determine the importance of
              ease of implementation, performance benchmarks and infrastructure
              requirements like backups, restoration, and being able to deploy a
              vector database on premises or in their own AWS cloud environment.
              Many vector databases could meet multiple requirements, but only
              Weaviate could meet them all.{' '}
            </p>
            <p className={styles.quote}>
              “Experimenting is one thing, but when you’re building long-term,
              client-facing enterprise applications, you want the right vector
              database with the right level of support. Weaviate was that
              database for us,”
            </p>
            <p>
              Lead System Engineer from a top US financial data analytics
              company
            </p>

            <h2>Solution</h2>
            <p>
              The company chose Weaviate because it fulfilled four primary
              requirements:
            </p>
            <ul>
              <li>
                <strong>Robust feature set:</strong> Weaviate’s modular
                architecture allowed easy integration of various data types and
                sources and popular LLMs. Out-of-the-box features like hybrid
                search, reranking, and filtering allowed developers of various
                skill levels across teams to focus on building applications
                instead of creating those functions from scratch.
              </li>
              <li>
                <strong>Flexible deployment options:</strong> The company could
                deploy Weaviate on AWS EKS through a pre-vetted Kubernetes
                blueprint for internal usage, fulfilling security requirements
                and allowing teams to move quickly. As an open-source vector
                database, Weaviate could be deployed on premises and in the
                cloud allowing strict data control.
              </li>
              <li>
                <strong>Meeting required benchmarks:</strong> The infrastructure
                team surveyed internal teams about the technical requirements
                for various use cases – including queries per second, speed of
                implementation, and high availability. Weaviate was able to
                perform well within their required benchmark ranges.
              </li>
              <li>
                <strong>Reliable support:</strong> The company has an open
                culture of sharing what’s working and not working in their Slack
                channels for third-party developer tools. The Weaviate channel
                became a source of internal collaboration, problem solving, and
                best practice sharing with the Weaviate team. In addition, the
                company has peace-of-mind knowing they can access Weaviate’s
                24/7 support team.
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topSection}>
            <h2>{'<1 year to commercialized AI'}</h2>
            <p>
              “Our whole value as a company is our expertise and content. We
              were able to translate the speed of implementation of Weaviate to
              the speed of delivering commercial AI products within a year,”
              said the LSE.
            </p>
            <h2>Unlocking AI for non-technical roles</h2>
            <p>
              “Every employee can now upload files and ask questions about them
              in our internal chat tool. Anyone, even if they're not an engineer
              and know nothing about coding, is able to use really good RAG.”
              said a VP, Principal Software Engineer who developed a data
              platform built on Weaviate.
            </p>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.logo}></div>

            <p className={styles.quote}>
              “Teams started flocking to it. I thought I would need to convince
              them to move from Pinecone, ChromaDB or Postgres. But as internal
              expertise grew, people just started adopting Weaviate for its
              features, performance, and ease of use.”
            </p>
            <p>
              Lead System Engineer from a top US financial data analytics
              company
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
