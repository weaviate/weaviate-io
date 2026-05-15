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
                As the AI revolution took off, solo founder Aaron Edwards moved
                fast to launch DocsBot at the perfect moment. But viral growth
                created a major technical challenge: how to manage tens of
                thousands of unique, isolated customer indexes without a
                dedicated infrastructure team. By partnering with Weaviate
                Cloud, DocsBot solved this unique multi-tenancy problem, scaled
                to answer over 6.1 million questions in a year, and freed up its
                founder to focus on building a serious, production-ready AI
                product.
              </strong>
            </p>
            <h2>The Challenge</h2>
            <p>
              <strong>Surviving Viral Success as a Solo Founder</strong>
            </p>
            <p>
              As a former CTO, Aaron Edwards knew that for a support and
              documentation product, trust is everything. Maintaining strict
              customer data isolation (preventing cross-tenant leakage) was
              non‑negotiable. When he launched DocsBot, he needed a RAG
              retrieval system that could scale across thousands of customers,
              each with their own isolated datasets, while maintaining
              high-quality semantic search. The product was an instant hit. It
              started with{' '}
              <Link to="https://x.com/masahirochaen/status/1635136368300163079">
                a single post from a Japanese tech influencer
              </Link>
              . On Sunday night, this tweet went viral, to the tune of 2.3
              million impressions. Hundreds of sign-ups poured in overnight. But
              this success revealed a crucial flaw in his initial MVP: it
              couldn't scale.
            </p>
            <p>
              Early approaches either didn’t scale to many parallel smaller
              indexes, required too much operational overhead, or were simply
              too costly. The risk was existential. If the database couldn't
              scale to handle tens of thousands of parallel indexes, the system
              would crash and they would lose customers. If retrieval quality
              degraded, users would lose trust in the AI’s answers, undermining
              the product's core value. This would have limited their ability to
              onboard larger customers and slowed down all future product
              development.
            </p>
            <h2>The Solution</h2>
            <p>
              <strong>A Pragmatic, Production-Ready Partner</strong>
            </p>
            <p>
              Aaron needed a solution with reliable semantic search, strong
              hybrid search support, metadata filtering, and clean multi-tenant
              isolation. But as a solo founder, operational simplicity was
              critical, he didn't want to spend time constantly tuning or
              maintaining custom infrastructure.
            </p>
            <p>After evaluating the market, he chose Weaviate.</p>
            <p className={styles.quote}>
              "Weaviate stood out because it’s clearly designed for real
              production use cases, not just experimentation. It was the only
              solution with an efficient tenant-based system that scaled to our
              unique workload of tens of thousands of distinct segmented
              indexes."
            </p>
            <p>
              <strong>- Aaron Edwards, Founder of DocsBot</strong>
            </p>
            <div className={styles.founderImage}></div>
            <p>
              As one of the first customers of Weaviate Cloud, DocsBot formed a
              close partnership with the Weaviate team, working together to
              rearchitect the software to support their unique multi-tenant use
              case.
            </p>{' '}
            <p>
              {' '}
              DocsBot's stack is built for the cloud. They handle document
              ingestion, chunking, and embedding generation before storing
              vectors and metadata in Weaviate. At query time, Weaviate powers
              semantic and hybrid search, returning the most relevant context,
              which is then passed to large language models to generate
              grounded, accurate responses.
            </p>
            <h2>What's Next for DocsBot?</h2>
            <p>
              With its RAG foundation firmly in place, DocsBot is now moving
              into the next frontier: <strong>agentic capabilities</strong>. The
              product is evolving from a simple answer engine to a true AI agent
              that can perform actions like capturing leads, routing/escalating
              support requests, triggering workflows in existing tools. This
              shift, powered by Weaviate, will allow DocsBot to deflect even
              more customer queries and provide greater value to its global
              customer base.
            </p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topSection}>
            <h2>Results</h2>
            <h3>Answered 6.1 Million+ Customer Questions in a Year</h3>
            <p>
              DocsBot scaled retrieval with Weaviate Cloud to handle massive
              query volume, directly enabling DocsBot’s core business.
            </p>
            <h3>Scaled to 50,000+ Tenants in a Single Cluster</h3>
            <p>
              DocsBot successfully solved its unique multi-tenancy challenge,
              proving Weaviate's ability to handle an extreme number of small,
              isolated indexes.
            </p>
            <h3>Freed a Solo Founder to Build</h3>
            <p>
              With Weaviate managing the database, founder Aaron Edwards was
              able to focus on product innovation instead of infrastructure
              maintenance.
            </p>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.logo}></div>

            <p>
              Founded by solopreneur Aaron Edwards,{' '}
              <Link to="https://docsbot.ai/">DocsBot</Link> is a leading
              platform that empowers companies to create custom AI chatbots
              trained on their own documentation, help centers, internal wikis,
              and other proprietary content. By using advanced
              Retrieval-Augmented Generation (RAG), DocsBot makes company
              knowledge instantly accessible for customer support and teams
              without requiring them to build complex AI systems themselves.
            </p>
          </div>
          <div className={`${styles.bottomSection} ${styles.information}`}>
            <h3>What is Multi-Tenancy?</h3>
            <p>
              Multi-tenancy allows a single Weaviate instance to serve thousands
              of isolated customer datasets, dramatically reducing operational
              overhead and cost compared to managing separate databases for each
              customer. It was the key feature that enabled DocsBot AI to scale.
            </p>
            <p>
              Learn more about{' '}
              <Link to="https://docs.weaviate.io/weaviate/starter-guides/managing-collections/collections-scaling-limits#multi-tenancy-architecture">
                Multi-Tenancy in Weaviate
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
