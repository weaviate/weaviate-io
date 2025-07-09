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
            <p className={styles.boldText}>
              Finster accelerates research and analysis for financial
              institutions, processing millions of vectors while maintaining
              enterprise-grade security, accuracy, and speed with the help of
              Weaviate.
            </p>
            <h2>Challenge</h2>
            <p>
              Financial institutions face overwhelming amounts of data and
              constant pressure to complete time-sensitive workflows. Analysts
              can spend hours manually processing multiple documents from
              different sources for tasks like earnings analysis. This becomes
              particularly challenging when more than one company in their
              portfolio reports simultaneously. Manual approaches leave analysts
              vulnerable to missing critical information, particularly when they
              are so time-constrained. When considering an AI platform, these
              organizations need results to be incredibly accurate, fast, and
              secure.
            </p>

            <h2>Why Weaviate</h2>
            <p>
              As a rapidly growing fintech startup handling large-scale document
              processing, Finster saw that Weaviate was the vector database that
              could meet their strict requirements:
            </p>

            <ul>
              <li>
                <strong>
                  Robust pre-filtering, reranking, and hybrid search:
                </strong>
                Precise document analysis with understanding of finance-specific
                concepts was critical.
              </li>
              <li>
                <strong>Enterprise-ready platform:</strong> Their customer base
                required sensitive data handling, enabled with multi-tenancy and
                VPC deployments.
              </li>
              <li>
                <strong>Scalability:</strong> The platform needed to handle
                millions of vectors while maintaining performance.
              </li>

              <li>
                <strong>Flexible query patterns:</strong> Weaviate could support
                a diverse range of user queries and task types.
              </li>
              <li>
                <strong>Growth partner:</strong> A supportive technical team was
                crucial for a quickly growing company.
              </li>
            </ul>
            <p>
              “Very early on we were fortunate to speak with Byron Voorbach,
              Weaviate’s Field CTO. He saved us several weeks of iterating on
              various retrieval methods and was able to guide us towards a
              specific solution that worked really well. It helped us deliver on
              the accuracy and consistency our users expect, and we still use
              the framework of that architecture now,” notes Kilgarriff.
            </p>
            <p>
              Ultimately, Finster chose Weaviate for its comprehensive feature
              set, enterprise readiness, and knowledgeable technical team.
            </p>
            <h2>From early iterations to enterprise platform</h2>
            <p>
              Finster was first built with Weaviate Serverless. “We used
              Serverless to maintain speed. When we started, there were three of
              us in the team, so running our own clusters didn't seem like wise
              use of time,” said Kilgarriff.
            </p>
            <p>
              As the business grew, so did their requirements. “We made the
              decision to move from Serverless to Enterprise for a few reasons.
              We landed more enterprise customers, so we needed more enhanced
              features around high availability and compression options, along
              with a closer support relationship and SLAs as uptime and handling
              higher queries per second became more critical. At the rate we
              were scaling, Enterprise was also more cost efficient.”
            </p>
            <p>
              “Since moving to Enterprise from Weaviate Serverless the level of
              support, responsiveness, and the amount we've learned from the
              Weaviate team has been hugely valuable,” he adds.
            </p>
            <h2>Solution</h2>
            <p>
              Finster’s AI-native platform is built on Weaviate, allowing the
              team to use a variety of large language models (LLMs). Financial
              data streams in from{' '}
              <Link to="https://www.youtube.com/watch?v=55mwdGXOgpg">
                FactSet
              </Link>{' '}
              and <Link to="/case-studies/morningstar">Morningstar</Link> with
              additional real-time data ingestion from SEC filings and Finster’s
              custom data ingestion pipeline for thousands of companies. The
              platform delivers:
            </p>
            <ul>
              <li>
                <strong>Trust and accuracy:</strong> Proprietary granular
                citations at the sentence and cell level enable users to verify
                generated responses in seconds.
              </li>
              <li>
                <strong>Finance-specific search:</strong> Combining semantic and
                keyword search using Weaviate’s built-in hybrid search
                functionality allows for meaningful, industry-aware
                interactions.
              </li>
              <li>
                <strong>Time saving task automations:</strong> Accelerating
                complex research end-to-end for tasks like earnings analysis and
                company profile creation.
              </li>
              <li>
                <strong>Enterprise-grade security:</strong> Finster uses single
                and multi-tenant deployments based on customer requirements to
                ensure data remains isolated and secure.
              </li>
            </ul>
            <h2>What's Next?</h2>
            <p>
              Finster continues to expand its capabilities and customer base at
              a rapid rate. Their partnership with Weaviate enables them to
              scale the number of companies they cover, which will more than 5X
              their vector count in the coming months. Additionally, Finster is
              exploring cost optimization options including hot, warm, and cold
              storage and quantization based on guidance from the Weaviate team.
            </p>
            <p>
              “Damien, our solutions engineer, has been absolutely fantastic. We
              always go away thinking we've learned about five or six new things
              just from a 15-minute call with him,” said Kilgarrif. “When you're
              a growing team moving fast, having experts in certain fields to
              guide you and bounce ideas off has been really, really helpful.
              Discussing cost optimization has given us a lot more visibility
              into how our costs scale as we ramp up our document processing and
              use of vector databases.”
            </p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topSection}>
            <h2 className={styles.white}>Results</h2>
            <h2>Millions of vectors</h2>
            <p>Finster successfully manages 42M vectors in production.</p>
            <h2>4+ weeks dev time saved</h2>
            <p>
              With Weaviate’s guidance, Finster quickly identified the best
              retrieval methods for their use case and optimized data
              architecture early on, avoiding costly and time-consuming
              migrations.
            </p>
            <h2>1-day enterprise deployment</h2>
            <p>
              Began testing for a single-tenant deployment with a global
              tier-one investment bank within a day, a company milestone that
              helped expedite the typically long sales cycles banking is known
              for.
            </p>
            <h2>Seamless scaling</h2>
            <p>
              Easily transitioned from Weaviate's Serverless to Enterprise
              offering to support rapid growth.
            </p>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.logo}></div>

            <p>
              Founded in 2023, <Link to="https://finster.ai/">Finster</Link> is
              an AI startup purpose-built for investment research and banking.
              The company enables investment banks and asset managers to
              automate research and analysis, delivering faster and more
              accurate decision making in critical financial workflows.
            </p>
          </div>
          <div className={`${styles.bottomSection} ${styles.navy}`}>
            <div className={styles.avatar}></div>
            <p className={styles.quote}>
              “Many use cases in large banks are focusing on quick wins trying
              to prove the capabilities of AI. We saw a huge opportunity to go
              beyond that and reimagine research workflows in a AI-native way,
              from start to finish.”
            </p>
            <p className={styles.name}>Seán Kilgarriff</p>
            <span>Product Lead and Founding Team member, Finster</span>
          </div>
        </div>
      </div>
    </div>
  );
}
