import React from 'react';

import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import * as Tabs from '@radix-ui/react-tabs';

export default function HomepageWhatYouCanDo() {
  return (
    <div className={styles.bgContainer}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Why build with Weaviate</h2>
          <p className={styles.subtitle}>
            We’re with you at every stage of your AI journey. Our open source
            AI-native database empowers more developers to build and scale AI
            applications in production.
          </p>
        </div>

        <div className={styles.module}>
          <Tabs.Root className={styles.tabs} defaultValue="tab1">
            <div className={styles.left}>
              <Tabs.List
                className={styles.tabsList}
                aria-label="What you can do with Weaviate"
              >
                <Tabs.Trigger
                  className={styles.tabsTrigger}
                  value="tab1"
                  disabled={false}
                >
                  <h3 className={styles.tabHeader01}>
                    AI-native, developer-friendly
                  </h3>
                  <div className={`${styles.cImage} ${styles.codeImg1}`} />
                  <p>
                    Open source with a strong community. Resources to help
                    developers of all levels build production-ready AI apps.
                  </p>
                  <div className={styles.accordianBar}></div>
                </Tabs.Trigger>

                <Tabs.Trigger className={styles.tabsTrigger} value="tab2">
                  <h3 className={styles.tabHeader02}>
                    Cloud, model, and deployment agnostic
                  </h3>
                  <div className={`${styles.cImage} ${styles.codeImg2}`} />
                  <p>
                    Get the best of vector and keyword search. Deliver better
                    results with less effort.
                  </p>
                  <div className={styles.accordianBar}></div>
                </Tabs.Trigger>
                <Tabs.Trigger className={styles.tabsTrigger} value="tab3">
                  <h3 className={styles.tabHeader03}>
                    Flexible cost-performance optimization
                  </h3>
                  <div className={`${styles.cImage} ${styles.codeImg3}`} />
                  <p>
                    Built-in modules for popular machine learning models and
                    frameworks. Just load your data and go.
                  </p>
                  <div className={styles.accordianBar}></div>
                </Tabs.Trigger>
                <Tabs.Trigger className={styles.tabsTrigger} value="tab4">
                  <h3 className={styles.tabHeader04}>
                    <span>
                      Robust developer community and enablement resources
                    </span>
                  </h3>
                  <div className={`${styles.cImage} ${styles.codeImg4}`} />
                  <p>
                    Advanced multi-tenancy, data compression, and filtering.
                    Scale confidently and efficiently.
                  </p>
                  <div className={styles.accordianBar}></div>
                </Tabs.Trigger>
                <Tabs.Trigger className={styles.tabsTrigger} value="tab5">
                  <h3 className={styles.tabHeader05}>
                    Secure, flexible deployment
                  </h3>
                  <div className={`${styles.cImage} ${styles.codeImg5}`} />
                  <p>
                    Adapts to the needs of your business. Run as an open source
                    platform, a managed service, or within your VPC.
                  </p>
                  <div className={styles.accordianBar}></div>
                </Tabs.Trigger>
              </Tabs.List>
            </div>
            <div className={styles.right}>
              <Tabs.Content className={styles.tabsContent} value="tab1">
                <div className={styles.codeContainer}>
                  <p className={styles.tabsText}>
                    Perform lightning-fast pure vector similarity<br></br>search
                    over raw vectors or data objects,<br></br> even with
                    filters.
                  </p>
                  {/*  <div className={styles.codeBlockTitleSmall} />
                <div className={styles.lineBarSmall} />
                <CodeSnippet
                  code={codeExample}
                  buttonText="Vector Search"
                  buttonClass={styles.copyButton}
                  outLink="https://console.weaviate.io/console/query#weaviate_uri=https://demo.dataset.playground.semi.technology&graphql_query=%7B%0A%20%20Get%20%7B%0A%20%20%20%20Publication(%0A%20%20%20%20%20%20nearText%3A%20%7B%0A%20%20%20%20%20%20%20%20concepts%3A%20%5B%22fashion%22%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20limit%3A%201%0A%20%20%20%20)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20_additional%20%7B%0A%20%20%20%20%20%20%20%20certainty%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%20%20vector%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"
                /> */}
                  <div className={`${styles.codeImage} ${styles.code1}`} />
                </div>
              </Tabs.Content>
              <Tabs.Content className={styles.tabsContent} value="tab2">
                <div className={styles.codeContainer}>
                  <p className={styles.tabsText}>
                    Combine keyword-based search with vector search techniques
                    for state-of-the-art results.
                  </p>
                  <div className={`${styles.codeImage} ${styles.code2}`} />
                </div>
              </Tabs.Content>
              <Tabs.Content className={styles.tabsContent} value="tab3">
                <div className={styles.codeContainer}>
                  <p className={styles.tabsText}>
                    Use any generative model in combination with your data, for
                    example to do Q&A over your dataset.
                  </p>

                  <div className={`${styles.codeImage} ${styles.code3}`} />
                </div>
              </Tabs.Content>
              <Tabs.Content className={styles.tabsContent} value="tab4">
                <div className={styles.codeContainer}>
                  <p className={styles.tabsText}>
                    Use any generative model in combination with your data, for
                    example to do Q&A over your dataset.
                  </p>
                  <div className={`${styles.codeImage} ${styles.code4}`} />
                </div>
              </Tabs.Content>
              <Tabs.Content className={styles.tabsContent} value="tab5">
                <div className={styles.codeContainer}>
                  <p className={styles.tabsText}>
                    Use any generative model in combination with your data, for
                    example to do Q&A over your dataset.
                  </p>
                  <div className={`${styles.codeImage} ${styles.code5}`} />
                </div>
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>
        <div className={styles.buttons}>
          <Link className={styles.buttonGradient} to="/pricing">
            Pricing
          </Link>
          <Link className={styles.buttonOutline} to="/platform">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
