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
                For a growing AI-Tech company, every dollar and every
                engineering hour counts. predori, an ambitious patent
                intelligence software, found itself burning cash on a costly,
                inefficient system that wasn't built for modern AI. By switching
                to Weaviate's managed vector database, they reduced their
                operational costs by over 80%, freed their team to innovate, and
                cleared the path for building advanced agentic RAG systems that
                will define their future.
              </strong>
            </p>

            <h2>The Challenge</h2>
            <p>
              <strong>Migrating from a Costly and Inefficient System</strong>
            </p>
            <p>
              predori was founded in 2020 with a clear mission: make patent
              research simple and accessible. From the start, they knew semantic
              context and vector retrieval were the future. However, in the
              early days before vector databases became mainstream (late 2022),
              the team was forced to build its capabilities on a Lucene-based
              AWS service.
            </p>
            <p>
              This setup was not designed for the mathematical problem of
              approximate nearest neighbor search. To make it work, the team had
              to keep everything in RAM and over-provision hardware, leading to
              a system that was "super expensive and just not good." For CTO
              Konstantin Schmitz, the choice was clear: find a scalable,
              purpose-built vector solution or risk being buried by
              infrastructure costs.
            </p>
            <p className={styles.quote}>
              "We were trying to squeeze a vector database into what is not
              really a vector database, and it was super expensive and just not
              good. It was just the wrong technology, a complete overkill for
              the mathematical problem of approximate nearest neighbor search."
            </p>
            <p>
              <strong>- Konstantin Schmitz, Co-founder of predori</strong>
            </p>
            <div className={styles.founderImage}></div>

            <h2>The Solution</h2>
            <p>
              <strong>
                A Production-Ready Patent Intelligence Platform Built on
                Weaviate
              </strong>
            </p>
            <p>
              The team knew they needed a purpose-built vector database. After
              experimenting with a range of self-hosting options like Facebook's
              Faiss and evaluating managed providers like Milvus and Pinecone,
              they chose{' '}
              <Link to="https://console.weaviate.cloud/signin?next=%2F">
                Weaviate Cloud
              </Link>{' '}
              in 2021. The decision came down to three key factors that were
              critical:
            </p>
            <ul className={styles.whyWeaviate}>
              <li>
                <strong>Predictable Pricing:</strong> Weaviate's transparent
                pricing and sandbox environment gave the team the confidence to
                experiment and scale without worrying about runaway costs.
              </li>
              <li>
                <strong>Operational Freedom:</strong> As a fully managed
                solution, Weaviate Cloud handled the operational heavy lifting
                of hardware management. This allowed predori's team to stop
                being sysadmins and get back to what they do best: building
                their software.
              </li>
              <li>
                <strong>Ease of Migration:</strong> The team was able to
                seamlessly switch from their previous AWS infrastructure to
                Weaviate Cloud. Konstantin described the process as a "natural"
                transition that felt like a "drop-in replacement," simply
                swapping out the old client connection for the Weaviate Python
                client.
              </li>
            </ul>
            <h2>Results</h2>
            <p>
              <strong>Cost Reduction, Faster Innovation</strong>
            </p>
            <ul className={styles.whyWeaviate}>
              <li>
                <strong>80%+ Cost Reduction:</strong> By moving away from the
                Lucene-based AWS setup, predori immediately cut their
                operational costs by a factor of 10.{' '}
              </li>
              <li>
                <strong>Redirected Engineering Focus:</strong> With a dedicated
                vector database partner, the engineering team was able to
                “iterate on the product side and develop new features in the RAG
                space”, without the distraction of building their own solution,
                a process that would have "greatly delayed our time to market."
                - Konstantin Schmitz, Co-founder of predori.
              </li>
              <li>
                <strong>Expansion into Agentic RAG:</strong> Weaviate’s scalable
                foundation has supported predori to move beyond basic search to
                develop advanced agentic RAG systems. They could now focus on
                building new, high-value features instead of constantly battling
                their infrastructure.
              </li>
            </ul>

            <h2>What's Next?</h2>
            <p>
              The partnership is now focused on optimization. predori is
              currently implementing Weaviate’s multi-tenancy and vector
              compression features to further optimize their service in light of
              its growing user base and the continued expansion of its
              capabilities. For them, the value isn't just in the technology,
              but in the partnership. As Konstantin put it, the experience has
              been "very pleasant."
            </p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topSection}>
            <h2>Results: A 10x Cost Reduction and the Freedom to Innovate</h2>
            <h3>80%+ Cost Reduction</h3>
            <p>
              By moving away from the Apache Lucene-based AWS setup, predori
              immediately cut their operational costs by a factor of 10, giving
              them more runway to invest back into their product.
            </p>
            <h3>Accelerated Time to Market</h3>
            <p>
              With Weaviate as their dedicated vector database partner, the
              engineering team was free to iterate on the product side and
              develop new, advanced features in the RAG space.
            </p>
            <h3>Expansion into Agentic RAG</h3>
            <p>
              Weaviate’s scalable foundation has supported predori's evolution
              from a simple search tool to a strategic platform for building
              advanced agentic RAG systems.
            </p>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.logo}></div>

            <p>
              <Link to="https://predori.com/en/">predori</Link>, short for
              "patent research done right," was founded in 2020 to make patent
              search easier and more accessible to a broader audience and user
              group. Their platform has since expanded to cover strategic patent
              information topics like M&A, portfolio analysis, and monitoring.
              Based in Ulm, Germany, predori serves a diverse customer base
              across multiple industries, with a strong presence in the
              automotive sector.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
