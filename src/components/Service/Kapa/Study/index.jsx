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
              Using Weaviate's vector database, Kapa created an innovative AI
              platform that converts complex technical documentation into
              responsive support chatbots, enabling companies of all sizes to
              streamline their technical support operations. Kapa powers the
              “Ask AI” widget on Weaviate’s documentation.
            </p>
            <h2>About Kapa</h2>
            <p>
              <Link to="https://www.kapa.ai/">Kapa</Link> is an AI platform that
              turns knowledgebases into reliable, production-ready AI chatbots
              specialized in answering technical product questions. Founded by
              Finn Bauer and Emil Soerensen, the company emerged from the idea
              of reducing workload on support teams swamped with repetitive
              technical questions, despite having comprehensive documentation.
              Kapa secured their first pilot in just two weeks of operations,
              subsequently joining Y Combinator and raising $3.2M for their seed
              round.
            </p>

            <h2>The Challenge</h2>
            <p>
              Technical documentation is vast and complex, making it challenging
              for users to quickly find the specific information they need.
              Traditional search methods often fall short when dealing with
              technical queries, requiring users to spend considerable time
              piecing together answers from multiple sources. Kapa focused on
              building an intelligent platform that could effectively process
              and respond to technical questions while maintaining accuracy and
              reliability.
            </p>
            <p>This required a robust solution that could:</p>
            <ul>
              <li>
                <strong>
                  Handle large volumes of documentation efficiently
                </strong>
              </li>
              <li>
                <strong>Process queries quickly and accurately</strong>
              </li>
              <li>
                <strong>Scale across distributed systems</strong>
              </li>
              <li>
                <strong>
                  Provide reliable performance under heavy memory consumption
                </strong>
              </li>
            </ul>

            <h2>Why Weaviate?</h2>
            <p>
              After evaluating various vector database solutions, Kapa chose
              Weaviate for several key reasons:
            </p>

            <ul>
              <li>
                <strong>Docker Compatibility:</strong> Weaviate's ability to run
                in Docker containers was crucial for their deployment and local
                development needs, unlike alternatives such as Pinecone.
              </li>
              <li>
                <strong>Built-in Hybrid Search:</strong> Weaviate was one of the
                first vector databases to offer hybrid search out-of-the-box.
              </li>
              <li>
                <strong>Built-in Hybrid Search:</strong> Weaviate was one of the
                first vector databases to offer hybrid search out-of-the-box.
              </li>
              <li>
                <strong>Scalability:</strong> The distributed nature of
                Weaviate’s multi-tenancy feature made it ideal for scaling
                across nodes, which was essential for Kapa as they were
                experiencing rapid growth with users and data quantities.
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topSection}>
            <h2>Results</h2>
            <ul>
              <li>
                <strong>Speed of delivery:</strong> The team built the first
                working version of their service with Weaviate in just 7 days,
                allowing them to quickly onboard new customers.
              </li>
              <li>
                <strong>Efficient Resource Management:</strong> Weaviate’s
                compression capabilities allowed Kapa to optimize costs while
                maintaining strict standards for accuracy.
              </li>
              <li>
                <strong>Successful Customer Implementations:</strong> Kapa has
                over 100 leading companies as customers including Docker,
                OpenAI, Monday.com, Grafana, and Reddit.
              </li>
            </ul>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.logo}></div>
            <h2>What's Next?</h2>
            <p>
              Kapa is actively exploring new opportunities with Weaviate's
              latest features, including a focus on multi-vector support. This
              will allow them to have backups of embeddings enhancing
              reliability with a cost-effective layer of redundancy. The team is
              continuously working on improving accuracy benchmarking and
              measurement systems to ensure optimal performance for their
              customers. Running on Google Cloud and written in Python, Kapa
              continues to evolve their tech stack while maintaining Weaviate as
              their core vector database and embeddings layer solution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
