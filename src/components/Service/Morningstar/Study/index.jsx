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
              Morningstar chose Weaviate's vector database to build its highly
              accurate and scalable Intelligence Engine Platform, offering users
              reliable, AI-driven financial research tools and transparent,
              dynamic document search capabilities.
            </p>
            <h2>Challenge</h2>
            <p>
              Over the last 40 years, Morningstar amassed an extensive
              collection of proprietary financial data. Morningstar has sought
              to further empower investors that rely on its data by developing
              an advanced research assistant AI application. According to
              Benjamin Barrett, Morningstar’s Head of Technology, Research
              Products, building a chatbot on that data “looks like magic, but
              when you start peeling back the layers of the onion, you have to
              ask, is it actually accurate? Is it pulling the latest, greatest,
              most relevant data? Are our answers robust and complete?”
            </p>
            <p>
              {' '}
              As his engineering team worked with Morningstar’s Quantitative
              Research team to build their Intelligence Engine Platform, they
              had to ensure an incredibly high level of accuracy in order to
              maintain their users’ trust. “We want to have one single source of
              truth. Our whole mission is to empower investor success. And the
              way to do that is to give them reliable, trustworthy financial
              data.”
            </p>

            <h2>Why Weaviate</h2>
            <p>
              In early 2023, Morningstar saw early success in experiments with
              LLMs and snippets of their own data. They quickly realized the
              potential of using AI to harness decades of longform research
              content and real-time data with RAG, and started their search for
              the right vector database.
            </p>
            <p className={styles.boldText}>Why Morningstar chose Weaviate:</p>
            <ul>
              <li>
                <strong>Ease-of-use:</strong> Weaviate’s open-source database
                was quick and easy for Morningstar to spin up locally in a
                Docker container and start experimenting.
              </li>
              <li>
                <strong>Data privacy and security:</strong>Flexible deployment
                options and multi-tenant architecture allowed for strict data
                privacy and security compliance.
              </li>
              <li>
                <strong>Flexibility and scalability:</strong> Weaviate supported
                a variety of use cases–from search engines to tailored AI
                applications–and was able to handle large and diverse data sets.
              </li>

              <li>
                <strong>Support:</strong>Weaviate offered great support from
                local development all the way to production. 
              </li>
            </ul>
            <h2>Results</h2>
            <p>
              With Weaviate, Morningstar was able to build their{' '}
              <Link to="https://www.morningstar.com/business/brands/data-analytics/products/direct-web-services/features/intelligence-engine">
                Intelligence Engine Platform
              </Link>
              , a product which solves a challenge facing today’s financial
              services firms: how to easily create and customize AI applications
              built on a foundation of trusted financial data and research. The
              Intelligence Engine also powers a variety of workflows, APIs, and
              chat interfaces across Morningstar’s own product ecosystem –
              including Mo, it’s investment research-assistant chatbot – for
              both internal and external users.
            </p>
            <div className={styles.results}></div>
            <div className={`${styles.results} ${styles.results02}`}></div>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topSection}>
            <h2>Driving Innovation</h2>
            <p>
              The Morningstar Intelligence Engine has allowed hundreds of
              applications to be created in house that are powering internal use
              cases and external workloads across our diverse portfolio of
              products.
            </p>
            <h2>Financial Research</h2>
            <p>
              Morningstar was able to launch their Weaviate-powered investment
              research assistant, Mo, within weeks to empower both financial
              professionals and individual investors to conduct investment
              research with greater ease.
            </p>
            <h2>RAG pipelines</h2>
            <p>
              Dynamic, context-aware document chunking and cited source
              transparency improves the relevance, accuracy, and trustworthiness
              of AI-generated answers.
            </p>
            <h2>Self-serve RAG</h2>
            <p>
              Internal users can create their own applications by building a
              corpus of documents and using a chat interface to interact with
              that information.
            </p>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.avatar}></div>
            <p className={styles.quote}>
              “Through our Corpus API connected to Weaviate, users can build
              very powerful, low latency search engines in minutes with little
              to no code. Users can then also test different search algorithms
              without having to worry about re-indexing their data or that
              infrastructure at all.”
            </p>
            <p className={styles.name}>Aisis Julian</p>
            <span>Senior Software Engineer, Morningstar</span>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.logo}></div>

            <p>
              <Link to="https://morningstar.com/">Morningstar, Inc.</Link> is a
              leading global provider of independent investment insights.
              Morningstar offers an extensive line of products and services for
              individual investors, financial advisors, asset managers and
              owners, retirement plan providers and sponsors, and institutional
              investors in the debt and private capital markets. Morningstar
              provides data and research insights on a wide range of investment
              offerings, including managed investment products, publicly listed
              companies, private capital markets, debt securities, and real-time
              global market data. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
