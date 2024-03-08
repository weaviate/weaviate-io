import React from 'react';
import styles from './styles.module.scss';
import content from './content.json';
import CustomScriptLoader from '../../scriptSwitch';

const DocHomePage = () => {
  return (
    <>
      <div className={styles.docHome}>
        <h1 className={styles.docHeadText}>Welcome to Weaviate Docs</h1>

        <p className={styles.docText}>
          Weaviate <i>(we-vee-eight)</i> is an open source, AI-native vector
          database. Use this documentation to get started with Weaviate and to
          learn how to get the most out of Weaviate's features.
        </p>

        <div className={styles.welcomeSection}>
          <div className={styles.welcomeBox}>
            <div className={`${styles.welcomeHeader} ${styles.new}`}>
              {' '}
              New to Weaviate?{' '}
            </div>
            <p>
              Start with the{' '}
              <a href="/developers/weaviate/quickstart">Quickstart tutorial</a>{' '}
              - an end-to-end demo that takes 15-30 minutes.
            </p>
          </div>
          <div className={styles.welcomeBox}>
            <div className={`${styles.welcomeHeader} ${styles.questions}`}>
              Questions{' '}
            </div>
            <p>
              Please visit our{' '}
              <a href="https://forum.weaviate.io/c/support/">forum</a>. The
              Weaviate team and our awesome community can help.
            </p>
          </div>
        </div>
        <br />

        <p className={styles.highLightText}>Getting Started</p>

        <h3 className={styles.docHeader}>Step 1 - Choose your deployment</h3>
        <p className={styles.docText}>
          Multiple deployment options are available to cater for different users
          and use cases. All options offer vectorizer and RAG module
          integration.
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
                <li>(Optional) Data replication (high-availability)</li>
                <li>(Optional) Zero-downtime updates</li>
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
                <li>Local inference containers</li>
                <li>Multi-modal models</li>
                <li>Customizable configurations</li>
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
                <li>Local inference containers</li>
                <li>Multi-modal models</li>
                <li>Customizable configurations</li>
                <li>Self-deploy or Marketplace deployment</li>
                <li>(Optional) Zero-downtime updates</li>
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
          Choose your next step. Weaviate is flexible and can be used in many
          contexts and scenarios.
        </p>

        <div className={`${styles.deploySection} ${styles.scenario}`}>
          <div className={styles.scenarioBox}>
            <div className={`${styles.scenarioLogo} ${styles.data}`}></div>
            <div className={styles.scenarioText}>
              <span>
                <a href="/developers/academy/py/starter_text_data/">Work with text data
                </a>
              </span>

              <p>
                Just bring your text data to Weaviate and it will do the rest.
              </p>
              <p>
                Just{' '}
                <a href="/developers/academy/py/starter_text_data/text_collections/">
                  populate Weaviate
                </a>
                {' '}with your text data and start using powerful{' '}
                <a href="/developers/academy/py/starter_text_data/text_searches/">
                vector, keyword and hybrid search capabilities
                </a>.
              </p>
              <p>
                And use our integrations to{' '}
                <a href="/developers/academy/py/starter_text_data/text_rag/">
                  build generative ai tools
                </a>
                {' '}with your data.
              </p>
            </div>
          </div>
          <div className={styles.scenarioBox}>
            <div className={`${styles.scenarioLogo} ${styles.custom}`}></div>
            <div className={styles.scenarioText}>
              <span>
                <a href="/developers/academy/py/starter_custom_vectors">
                  Bring your own vectors
                </a>
              </span>

              <p>
                Do you prefer to work with your own vectors? No problem.
              </p>
              <p>
                You can{' '}
                <a href="/developers/academy/py/starter_custom_vectors/object_collections/">
                  add your own vectors to Weaviate
                </a>
                {' '}and still benefit from{' '}
                <a href="/developers/academy/py/starter_custom_vectors/object_searches/">
                all of its indexing and search capabilities.
                </a>.
              </p>
              <p>
                Our integrations to{' '}
                <a href="/developers/academy/py/starter_custom_vectors/object_rag/">
                  build generative ai tools
                </a>
                {' '}work just as well with your data and vectors.
              </p>
            </div>
          </div>
          <div className={styles.scenarioBox}>
            <div className={`${styles.scenarioLogo} ${styles.semantic}`}></div>
            <div className={styles.scenarioText}>
              <span>
                <a href="/developers/academy/py/starter_multimodal_data">
                  Multimodality
                </a>
              </span>

              <p>
                For many, data comes in multiple forms beyond text.
              </p>
              <p>
                Weaviate's multimodal modules{' '}
                <a href="/developers/academy/py/starter_multimodal_data/mm_collections/">
                  can import text, audio and video and more
                </a>
                {' '}as well as{' '}
                <a href="/developers/academy/py/starter_multimodal_data/mm_searches/">
                  perform multimodal searches
                </a>.
              </p>
              <p>
                Use these modules to{' '}
                <a href="/developers/academy/py/starter_multimodal_data/mm_rag/">
                  build generative ai tools
                </a>
                {' '}from your entire dataset.
              </p>
            </div>
          </div>
        </div>

        <h3 className={styles.docHeader}>What Next</h3>
        <p className={styles.docText}>
          We recommend starting with these sections:
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
            <p>
              Discover how to configure Weaviate to suit your specific needs.
            </p>
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
          <h3>Can we help?</h3>
          <div className={`${styles.secondaryTabs} ${styles.github}`}>
            <a href="https://github.com/weaviate/weaviate">Github</a>
          </div>
          <div className={`${styles.secondaryTabs} ${styles.forum}`}>
            <a href="https://forum.weaviate.io/">Community forum</a>
          </div>
          <div className={`${styles.secondaryTabs} ${styles.slack}`}>
            <a href="https://weaviate.io/slack">Slack</a>
          </div>
        </div>
        <div className={styles.secondaryContent}>
          <h3>Client Libraries</h3>
          <div className={styles.tabRow}>
            <div className={`${styles.secondaryTabs} ${styles.python}`}>
              <a href="/developers/weaviate/client-libraries/python">Python</a>
            </div>
            <div className={`${styles.secondaryTabs} ${styles.ts}`}>
              <a href="/developers/weaviate/client-libraries/typescript">
                TS/JS
              </a>
            </div>
          </div>

          <div className={`${styles.secondaryTabs} ${styles.go}`}>
            <a href="/developers/weaviate/client-libraries/go">Go</a>
          </div>
          <div className={`${styles.secondaryTabs} ${styles.java}`}>
            <a href="/developers/weaviate/client-libraries/java">Java</a>
          </div>
        </div>
      </div>
      <CustomScriptLoader />
    </>
  );
};

export default DocHomePage;
