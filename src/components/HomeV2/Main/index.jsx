import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';
import CodeTabs from '../CodeBlock';
import SplitImageSlider from '../SplitBlock';

export default function Main() {
  return (
    <main className={styles.mainContainer}>
      <div className="container">
        <div className={styles.box}>
          <h2>
            Your stack’s missing piece for RAG, agents, and everything coming
            next
          </h2>
        </div>
        <div className={styles.boxContainer}>
          <span>WHAT ARE YOU BUILDING?</span>
          <div className={styles.boxes}>
            <div className={`${styles.benefitBox} ${styles.BB01}`}>
              <span className={styles.titleBG}>AI-POWERED SEARCH</span>
              <p>Smart, contextual search across unstructured data</p>
              <Link to="">Learn more</Link>
              <div className={styles.image}></div>
            </div>
            <div className={`${styles.benefitBox} ${styles.BB02}`}>
              <span className={`${styles.titleBG} ${styles.retrieval}`}>
                RETRIEVAL AUGMENTED GENERATION
              </span>
              <p>Trustworthy chat experiences grounded in your data</p>
              <Link to="">Learn more</Link>
              <div className={`${styles.image} ${styles.rag}`}></div>
            </div>
            <div className={`${styles.benefitBox} ${styles.BB03}`}>
              <span className={`${styles.titleBG} ${styles.agenticAI}`}>
                AGENTIC AI
              </span>
              <p>Knowledgeable AI agents and agentic workflows </p>
              <Link to="">Learn more</Link>
              <div className={`${styles.image} ${styles.agentic}`}></div>
            </div>
          </div>
        </div>
        <div className={styles.boxContainer}>
          <span>HOW WILL YOU BUILD?</span>
          <div className={styles.bigBox}>
            <div className={styles.CodeBlockContainer}>
              <div className={styles.CodeBlockSection}>
                <h3>Ship production-ready AI faster</h3>
                <p>
                  Spin up a cluster, point it at your data, and go. Weaviate
                  takes care of embeddings, ranking, and auto-scaling so you can
                  ship features, not infrastructure.
                </p>
                <Link to="" className={styles.buttonLight}>
                  Try Weaviate Cloud
                </Link>
                <Link to="" className={styles.buttonDark}>
                  Weaviate Quickstart
                </Link>
              </div>
              <div className={styles.CodeBlock}>
                <CodeTabs />
              </div>
            </div>

            <div className={styles.USPContainer}>
              <div className={styles.USPBox}>
                <h4>Seamless model integration</h4>
                <p>
                  Connect your ML models of choice, or use our built-in
                  embedding service.
                </p>
              </div>
              <hr></hr>
              <div className={styles.USPBox}>
                <h4>Weaviate Cloud Quickstart</h4>
                <p>
                  Set up your first cluster in minutes using our fully-managed
                  vector database.
                </p>
              </div>
              <hr></hr>
              <div className={styles.USPBox}>
                <h4>Weaviate Agents</h4>
                <p>
                  Reduce manual work with pre-built agents that interact with
                  and improve your data.
                </p>
              </div>
            </div>

            <div className={styles.logoContainer}>
              <div className={`${styles.bottomlogo} ${styles.bl01}`}></div>
              <div className={`${styles.bottomlogo} ${styles.bl02}`}></div>
              <div className={`${styles.bottomlogo} ${styles.bl03}`}></div>
              <div className={`${styles.bottomlogo} ${styles.bl04}`}></div>
              <div className={`${styles.bottomlogo} ${styles.bl05}`}></div>
              <div className={`${styles.bottomlogo} ${styles.bl06}`}></div>
              <div className={`${styles.bottomlogo} ${styles.bl07}`}></div>
              <div className={`${styles.bottomlogo} ${styles.bl08}`}></div>
              <div className={`${styles.bottomlogo} ${styles.bl09}`}></div>
              <div className={`${styles.bottomlogo} ${styles.bl10}`}></div>
            </div>

            <div className={styles.linkContainer}>
              <span>MORE DEVELOPER RESOURCES {'-->'}</span>
            </div>
          </div>
        </div>

        <div className={styles.boxContainer}>
          <span>WHY USE WEAVIATE?</span>

          <div className={styles.whyContainer}>
            <div className={styles.leftContainer}>
              <h4>Your legacy database wasn’t built for this</h4>
              <div className={`${styles.benefitText} ${styles.ww01}`}>
                <div>
                  <h5>AI-first features under one roof</h5>
                  <p>
                    Avoid separate systems and complex data pipelines. Spend
                    less time writing code for basic AI functionality.
                  </p>
                </div>
              </div>
              <div className={`${styles.benefitText} ${styles.ww02}`}>
                <div>
                  <h5>Billion-scale architecture</h5>
                  <p>
                    Adapt to any workload. Scale seamlessly as you grow up or
                    out, all while optimizing costs.
                  </p>
                </div>
              </div>
              <div className={`${styles.benefitText} ${styles.ww03}`}>
                <div>
                  <h5>Enterprise-ready deployment</h5>
                  <p>
                    Run securely in our cloud or yours. Meet enterprise
                    requirements like RBAC, SOC 2, and HIPAA.
                  </p>
                </div>
              </div>
              <div className={`${styles.benefitText} ${styles.ww04}`}>
                <div>
                  <h5>A partner in innovation</h5>
                  <p>
                    Fuel your AI products with cutting-edge features and
                    first-class support from our global team of experts.
                  </p>
                </div>
              </div>
              <div className={`${styles.benefitText} ${styles.ww05}`}>
                <div>
                  <h5>Where the AI builders build </h5>
                  <p>
                    Join our community of over 50,000 AI builders. Attend
                    courses, events, and discussions online or in-person.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.rightContainer}>
              <SplitImageSlider />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
