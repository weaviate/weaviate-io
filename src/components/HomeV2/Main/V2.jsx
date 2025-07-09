import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';
import CodeTabs from '../CodeBlock';
import SplitImageSlider from '../SplitBlock';
import WhyUse from './WhyUse.jsx';

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
                <h3>
                  Production-ready<br></br> AI applications, faster
                </h3>
                <p>
                  Spin up a cluster, point it at your data, and go. Weaviate can
                  take care of embeddings, ranking, and auto-scaling so you can
                  ship features, not infrastructure.
                </p>
                <Link
                  to="https://auth.wcs.api.weaviate.io/auth/realms/SeMI/protocol/openid-connect/auth?client_id=wcs-frontend&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fconsole.weaviate.cloud%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=P3BeeUEpGZNBXSXHycDajZNjrHT_HliA14qrtGovlk8&code_challenge=VZLcWPLzlwCsrvkYzjY3yC9XwUN3KzJqvzXAlzdNYTo&code_challenge_method=S256&__hstc=76629258.2a08ce98ef4ed956e84f6755a768e341.1750342624201.1750342624201.1750342624201.1&__hssc=76629258.1.1750342624201&__hsfp=2985992378"
                  className={styles.buttonLight}
                >
                  Try Weaviate Cloud
                </Link>
                <Link
                  to="https://docs.weaviate.io/weaviate/quickstart"
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
                <Link to="https://docs.weaviate.io/weaviate/client-libraries">
                  <h4>
                    <span>Language agnostic by design</span>
                    <span className={styles.arrowIcon}></span>
                  </h4>
                </Link>
                <p>
                  Use SDKs for Python, Go, TypeScript, or JavaScript—or connect
                  to GraphQL or REST APIs.
                </p>
              </div>
              <hr></hr>
              <div className={styles.USPBox}>
                <Link to="https://docs.weaviate.io/weaviate/model-providers">
                  <h4>
                    <span>Seamless model integration</span>
                    <span className={styles.arrowIcon}></span>
                  </h4>
                </Link>
                <p>
                  Connect your ML models of choice, or use our built-in
                  embedding service.
                </p>
              </div>
              <hr></hr>
              <div className={styles.USPBox}>
                <Link to="/product">
                  <h4>
                    <span>Database Agents</span>
                    <span className={styles.arrowIcon}></span>
                  </h4>
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
              <Link to="https://docs.weaviate.io/weaviate">
                MORE DEVELOPER RESOURCES {'-->'}
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <span className={styles.Title}>WHY USE WEAVIATE?</span>
        </div>
        {/*    <div className={styles.boxContainer}>
          <div className={styles.staticBoxesWrapper}>
            <div className={styles.bigStaticBox}>
              <span className={styles.boxLabel}>BEFORE WEAVIATE</span>
              <img src="img/site/codeBefore.png" alt="Before code" />
            </div>

            <div className={styles.smallBoxesColumn}>
              <div className={styles.smallStaticBox}>
                <span className={styles.boxLabel}>WITH WEAVIATE</span>
                <img src="img/site/codeAfter.png" alt="With code" />
              </div>

              <div className={styles.smallBenefitBox}>
                <div className={styles.benefitsContent}>
                  <div className={`${styles.benefitText} ${styles.ww01}`}>
                    <div>
                      <h5>AI-first features under one roof</h5>
                      <p>
                        Avoid separate systems and complex data pipelines. Write
                        less custom code and build AI-native apps faster.
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.benefitText} ${styles.ww02}`}>
                    <div>
                      <h5>Billion-scale architecture</h5>
                      <p>
                        Adapt to any workload. Scale seamlessly as you grow up
                        or out, all while optimizing costs.
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
                      <h5>Where the AI builders build</h5>
                      <p>
                        Join our community of over 50,000 AI builders. Attend
                        courses, events, and discussions online or in-person.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <WhyUse />
        {/* END UPDATED SECTION */}
      </div>
    </main>
  );
}
