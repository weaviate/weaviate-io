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
          <span className={styles.buildTitle}>WHAT ARE YOU BUILDING?</span>
          <div className={styles.boxes}>
            <div className={`${styles.benefitBox} ${styles.BB01}`}>
              <span className={styles.titleBG}>AI-POWERED SEARCH</span>
              <p>Smart, contextual search across unstructured data</p>
              <Link to="/hybrid-search">Learn more</Link>
              <div className={styles.image}></div>
            </div>
            <div className={`${styles.benefitBox} ${styles.BB02}`}>
              <span className={`${styles.titleBG} ${styles.retrieval}`}>
                RETRIEVAL AUGMENTED GENERATION
              </span>
              <p>Trustworthy chat experiences grounded in your data</p>
              <Link to="/rag">Learn more</Link>
              <div className={`${styles.image} ${styles.rag}`}></div>
            </div>
            <div className={`${styles.benefitBox} ${styles.BB03}`}>
              <span className={`${styles.titleBG} ${styles.agenticAI}`}>
                AGENTIC AI
              </span>
              <p>Knowledgeable AI agents and agentic workflows </p>
              <Link to="/agentic-ai">Learn more</Link>
              <div className={`${styles.image} ${styles.agentic}`}></div>
            </div>
          </div>
        </div>
        <div className={styles.boxContainer}>
          <span className={styles.buildTitle}>HOW WILL YOU BUILD?</span>
          <div className={styles.bigBox}>
            <div className={styles.CodeBlockContainer}>
              <div className={styles.CodeBlockSection}>
                <h3>Ship production-ready AI faster</h3>
                <p>
                  Spin up a cluster, point it at your data, and go. Weaviate
                  takes care of embeddings, ranking, and auto-scaling so you can
                  ship features, not infrastructure.
                </p>
                <Link
                  to="https://auth.wcs.api.weaviate.io/auth/realms/SeMI/protocol/openid-connect/auth?client_id=wcs-frontend&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fconsole.weaviate.cloud%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=P3BeeUEpGZNBXSXHycDajZNjrHT_HliA14qrtGovlk8&code_challenge=VZLcWPLzlwCsrvkYzjY3yC9XwUN3KzJqvzXAlzdNYTo&code_challenge_method=S256&__hstc=76629258.2a08ce98ef4ed956e84f6755a768e341.1750342624201.1750342624201.1750342624201.1&__hssc=76629258.1.1750342624201&__hsfp=2985992378"
                  className={styles.buttonLight}
                >
                  Try Weaviate Cloud
                </Link>
                <Link
                  to="/developers/weaviate/quickstart"
                  className={styles.buttonDark}
                >
                  Weaviate Quickstart
                </Link>
              </div>
              <div className={styles.CodeBlock}>
                <CodeTabs />
              </div>
            </div>

            <div className={styles.USPContainer}>
              <div className={styles.USPBox}>
                <Link to="/product">
                  <h4>Seamless model integration</h4>
                </Link>
                <p>
                  Connect your ML models of choice, or use our built-in
                  embedding service.
                </p>
              </div>
              <hr></hr>
              <div className={styles.USPBox}>
                <Link to="/developers/wcs/quickstart">
                  <h4>Weaviate Cloud Quickstart</h4>
                </Link>
                <p>
                  Set up your first cluster in minutes using our fully-managed
                  vector database.
                </p>
              </div>
              <hr></hr>
              <div className={styles.USPBox}>
                <Link to="/product">
                  <h4>Weaviate Agents</h4>
                </Link>
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
              <Link to="/developers/weaviate/">
                MORE DEVELOPER RESOURCES {'-->'}
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.boxContainer}>
          <span className={styles.buildTitle}>WHY USE WEAVIATE?</span>

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
