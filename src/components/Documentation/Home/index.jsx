import React from 'react';
import styles from './styles.module.scss';

const DocHomePage = () => {
  return (
    <div className={styles.docHome}>
      <h1 className={styles.docHeadText}>Welcome to Weviate Docs</h1>

      <p className={styles.docText}>
        Weaviate is an open source, AI-native vector database.<br></br>
        Learn how to store and retrieve data objects and vector embeddings.
        Seamlessly connect <br></br> to your favorite ML models. And build
        intuitive, reliable AI applications that scale.
      </p>

      <div className={styles.welcomeSection}>
        <div className={styles.welcomeBox}>
          <div className={`${styles.welcomeHeader} ${styles.new}`}>
            {' '}
            New to Weaviate?{' '}
          </div>
          <p>
            Start with the{' '}
            <a href="/quickstart/index.md">Quickstart tutorial</a> - an
            end-to-end demo that takes 15-30 minutes.
          </p>
        </div>
        <div className={styles.welcomeBox}>
          <div className={`${styles.welcomeHeader} ${styles.questions}`}>
            Questions{' '}
          </div>
          <p>
            Please visit our{' '}
            <a href="https://forum.weaviate.io/c/support/">forum</a> to get help
            from the Weaviate community including the Weaviate team.
          </p>
        </div>
      </div>
      <br />

      <p className={styles.highLightText}>Getting Started</p>

      <h3 className={styles.docHeader}>Step 1 - Choose your deployment</h3>
      <p className={styles.docText}>
        All options include Vectorizer integration, RAG module integration and
        Optional data replication
      </p>

      <div className={styles.deploySection}>
        <div className={styles.deployBox}>
          <div className={styles.tabContainer}>
            <div className={styles.deployTab}>Evaluation</div>
            <div className={styles.deployTab}>Deployment</div>
            <div className={styles.deployTab}>Production</div>
          </div>
          <div className={styles.deployContent}>
            <div className={styles.deployHeader}>Weaviate Cloud Services</div>
            <ul className={styles.deployList}>
              <li>From evaluation (sandbox) to production</li>
              <li>Serverless (infrastructure managed by Weaviate)</li>
            </ul>
            <button className={styles.deployButton}>
              <a href="/developers/wcs/guides/create-instance">
                Set up a WCS instance
              </a>
            </button>
          </div>
        </div>

        <div className={styles.deployBox}>
          <div className={styles.tabContainer}>
            <div className={styles.deployTab}>Evaluation</div>
            <div className={styles.deployTab}>Deployment</div>
            <div className={`${styles.deployTab} ${styles.inactive}`}>
              Production
            </div>
          </div>
          <div className={styles.deployContent}>
            <div className={`${styles.deployHeader} ${styles.docker}`}>
              Docker
            </div>
            <ul className={styles.deployList}>
              <li>For local evaluation & development</li>
              <li>Local inference containers available</li>
              <li>Multi-modal models available</li>
              <li>Fully customizable</li>
              <li>System agnostic</li>
              <li>Easy to set up</li>
            </ul>
            <button className={styles.deployButton}>
              <a href="/developers/weaviate/installation/docker-compose">
                Run Weaviate with Docker
              </a>
            </button>
          </div>
        </div>
      </div>
      <br />

      <div className={styles.deploySection}>
        <div className={styles.deployBox}>
          <div className={styles.tabContainer}>
            <div className={`${styles.deployTab} ${styles.inactive}`}>
              Evaluation
            </div>
            <div className={styles.deployTab}>Deployment</div>
            <div className={styles.deployTab}>Production</div>
          </div>
          <div className={styles.deployContent}>
            <div className={`${styles.deployHeader} ${styles.kubernetes}`}>
              Kubernetes
            </div>
            <ul className={styles.deployList}>
              <li>For development to production</li>
              <li>Local inference containers available</li>
              <li>Multi-modal models available</li>
              <li>Fully customizable</li>
              <li>System agnostic</li>
              <li>Zero-downtime updates</li>
              <li>Self-deploy or Marketplace deployment</li>
            </ul>
            <button className={styles.deployButton}>
              <a href="/developers/weaviate/installation/kubernetes">
                Run Weaviate with Kubernetes
              </a>
            </button>
          </div>
        </div>

        <div className={styles.deployBox}>
          <div className={styles.tabContainer}>
            <div className={styles.deployTab}>Evaluation</div>
            <div className={`${styles.deployTab} ${styles.inactive}`}>
              Deployment
            </div>
            <div className={`${styles.deployTab} ${styles.inactive}`}>
              Production
            </div>
          </div>
          <div className={styles.deployContent}>
            <div className={styles.deployHeader}>Embedded Weaviate</div>
            <ul className={styles.deployList}>
              <li>For basic, quick evaluation</li>
              <li>
                Conveniently launch Weaviate directly from Python or TS/JS
              </li>
            </ul>
            <button className={styles.deployButton}>
              <a href="/developers/weaviate/installation/embedded">
                Run Embedded Weaviate
              </a>
            </button>
          </div>
        </div>
      </div>
      <br />

      <h3 className={styles.docHeader}>Step 2 - Choose your scenario</h3>
      <p className={styles.docText}>
        Import data with Weaviate vectorizer, execute basic queries and discover
        the best<br></br> search options, including vector, keyword and hybrid
        searches.
      </p>

      <div className={`${styles.deploySection} ${styles.scenario}`}>
        <div className={styles.scenarioBox}>
          <div className={`${styles.scenarioLogo} ${styles.data}`}></div>
          <div className={styles.scenarioText}>
            <span>
              <a href="/developers/weaviate/manage-data/import">Data imports</a>{' '}
              to <a href="/developers/weaviate/search/similarity">vector</a>{' '}
              searches, made easy
            </span>

            <p>
              Weaviate abstracts away complexities of building a vector
              database.
            </p>
            <p>
              Learn how to import data with a Weaviate vectorizer, and run basic
              queries.
            </p>
          </div>
        </div>
        <div className={styles.scenarioBox}>
          <div className={`${styles.scenarioLogo} ${styles.custom}`}></div>
          <div className={styles.scenarioText}>
            <span>
              <a href="/developers/weaviate/starter-guides/custom-vectors">
                Custom vectors with Weaviate
              </a>
            </span>

            <p>
              It’s easy to import data with pre-existing vectors into Weaviate.
            </p>
            <p>
              Learn how Weaviate can just as easily work with your existing data
              and corresponding vectors.
            </p>
            <p>
              You can perform the same searches, and even work with a vectorizer
              if a compatible one is available.
            </p>
          </div>
        </div>
        <div className={styles.scenarioBox}>
          <div className={`${styles.scenarioLogo} ${styles.semantic}`}></div>
          <div className={styles.scenarioText}>
            <span>
              <a href="/developers/weaviate/search">Semantic search</a> and{' '}
              <a href="/developers/weaviate/starter-guides/generative">RAG</a>
            </span>

            <p>Weaviate makes it easy for you to find the right information.</p>
            <p>
              <a href="/developers/weaviate/search">
                Learn how to perform different types of available searches
              </a>
              , including vector, keyword and hybrid searches.
            </p>
            <p>
              See how filters can add to these capabilities, and{' '}
              <a href="/developers/weaviate/starter-guides/generative">
                how to perform retrieval augmented generation
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <h3 className={styles.docHeader}>What Next</h3>
      <p className={styles.docText}>
        We recommend starting with these sections
      </p>

      <div className={`${styles.deploySection} ${styles.whatsNext}`}>
        <div className={styles.whatnextBox}>
          <span>What is Weaviate?</span>
          <p>
            Weaviate is an open source vector search engine that stores both
            objects and vectors.
          </p>
          <div className={styles.wtLearn}>
            <a href="/developers/weaviate#what-is-weaviate">Learn more</a>
          </div>
        </div>
        <div className={styles.whatnextBox}>
          <span>What can you do with Weaviate?</span>
          <p>
            Features, examples, demo applications, recipes, use cases, etc..
          </p>
          <div className={styles.wtLearn}>
            <a href="/developers/weaviate/more-resources/example-use-cases">
              Learn more
            </a>
          </div>
        </div>
        <div className={`${styles.whatnextBox} ${styles.small}`}>
          <span className={styles.filters}>Installation</span>
          <p>
            Learn about the available options for running Weaviate, along with
            instructions on installation and configuration.
          </p>
          <div className={styles.wtLearn}>
            <a href="/developers/weaviate/installation">Learn more</a>
          </div>
        </div>
        <div className={`${styles.whatnextBox} ${styles.small}`}>
          <span className={styles.filters}>How-to: Configure</span>
          <p>Discover how to configure Weaviate to suit your specific needs.</p>
          <div className={styles.wtLearn}>
            <a href="/developers/weaviate/configuration">Learn more</a>
          </div>
        </div>
        <div className={`${styles.whatnextBox} ${styles.small}`}>
          <span className={styles.filters}>Concepts</span>
          <p>
            Get the most out of Weaviate and learn about its architecture and
            various features.
          </p>
          <div className={styles.wtLearn}>
            <a href="/developers/weaviate/concepts">Learn more</a>
          </div>
        </div>
      </div>

      <div className={styles.secondaryContent}>
        <h3>Need Help</h3>
        <div className={`${styles.secondaryTabs} ${styles.slack}`}>
          <a href="https://weaviate.io/slack">Slack</a>
        </div>
        <div className={`${styles.secondaryTabs} ${styles.github}`}>
          <a href="https://github.com/weaviate/weaviate">Github</a>
        </div>
        <div className={`${styles.secondaryTabs} ${styles.forum}`}>
          <a href="https://forum.weaviate.io/">Forum</a>
        </div>
      </div>
    </div>
  );
};

export default DocHomePage;
