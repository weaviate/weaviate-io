import Link from '@docusaurus/Link';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function MainSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h2>
            Innovative companies of all sizes power AI experiences with Weaviate
          </h2>
        </div>

        <div className={styles.bentoGrid}>
          {/* Row 1 - Four small */}
          <div className={styles.row}>
            <Link
              to="/case-studies/morningstar"
              className={`${styles.bentoSmall} ${styles.BS01}`}
            >
              <div className={styles.bentoText}>
                <div className={styles.innerText}>
                  <div className={styles.bentoLogo}></div>
                  <h3>Turning over 450 data types into customer insights </h3>
                </div>
                <div className={styles.buttons}>
                  <Link
                    to="case-studies/instabase"
                    className={`${styles.arrowButton} ${styles.arrowButtonLight}`}
                  ></Link>
                </div>
              </div>
            </Link>
            <Link
              to="/case-studies/kapa"
              className={`${styles.bentoSmall} ${styles.BS02}`}
            >
              <div className={styles.bentoText}>
                <div className={styles.innerText}>
                  <div className={styles.bentoLogo}></div>
                  <h3>Production-ready AI assistant built in 7 days</h3>
                </div>
                <div className={styles.buttons}>
                  <Link
                    to="case-studies/kapa"
                    className={`${styles.arrowButton} ${styles.arrowButtonLight}`}
                  ></Link>
                </div>
              </div>
            </Link>
            <Link
              to="/case-studies/neople"
              className={`${styles.bentoSmall} ${styles.BS03}`}
            >
              <div className={styles.bentoText}>
                <div className={styles.innerText}>
                  <div className={styles.bentoLogo}></div>
                  <h3>Customer service agents with 90% faster search</h3>
                </div>
                <div className={styles.buttons}>
                  <Link
                    to="case-studies/neople"
                    className={`${styles.arrowButton} ${styles.arrowButtonLight}`}
                  ></Link>
                </div>
              </div>
            </Link>
            <Link
              to="/case-studies/finster"
              className={`${styles.bentoSmall} ${styles.BS04}`}
            >
              <div className={styles.bentoText}>
                <div className={styles.innerText}>
                  <div className={styles.bentoLogo}></div>
                  <h3>Successful management of 42M vectors in production</h3>
                </div>
                <div className={styles.buttons}>
                  <Link
                    to="/case-studies/finster"
                    className={`${styles.arrowButton} ${styles.arrowButtonLight}`}
                  ></Link>
                </div>
              </div>
            </Link>
          </div>
          {/* Row 2 - Three small */}
          <div className={styles.row}>
            <Link
              to="/case-studies/marvelx"
              className={`${styles.bentoSmall} ${styles.BS05}`}
            >
              <div className={styles.bentoText}>
                <div className={styles.innerText}>
                  <div className={styles.bentoLogo}></div>
                  <h3>
                    How MarvelX is Scaling Insurance Processing at the Speed of
                    AI
                  </h3>
                </div>
                <div className={styles.buttons}>
                  <Link
                    to="case-studies/marvelx"
                    className={`${styles.arrowButton} ${styles.arrowButtonLight}`}
                  ></Link>
                </div>
              </div>
            </Link>
            <Link
              to="/case-studies/loti"
              className={`${styles.bentoSmall} ${styles.BS06}`}
            >
              <div className={styles.bentoText}>
                <div className={styles.innerText}>
                  <div className={styles.bentoLogo}></div>
                  <h3>
                    How Loti AI fights likeness infringement and digital
                    impersonation with Weaviate
                  </h3>
                </div>
                <div className={styles.buttons}>
                  <Link
                    to="case-studies/loti"
                    className={`${styles.arrowButton} ${styles.arrowButtonLight}`}
                  ></Link>
                </div>
              </div>
            </Link>
            <Link
              to="/case-studies/morningstar"
              className={`${styles.bentoSmall} ${styles.BS07}`}
            >
              <div className={styles.bentoText}>
                <div className={styles.innerText}>
                  <div className={styles.bentoLogo}></div>
                  <h3>
                    How Morningstar built a trustworthy, AI-driven financial
                    data platform{' '}
                  </h3>
                </div>
                <div className={styles.buttons}>
                  <Link
                    to="case-studies/morningstar"
                    className={styles.arrowButton}
                  ></Link>
                </div>
              </div>
            </Link>
          </div>

          {/* Row 3 - 1 big/2 small */}
          <div className={styles.row}>
            <Link
              to="/case-studies/stack-ai"
              className={`${styles.bentoSmall} ${styles.BS08}`}
            >
              <div className={styles.bentoText}>
                <div className={styles.innerText}>
                  <div className={styles.bentoLogo}></div>
                  <h3>
                    How Stack AI Delivers Lighting-Fast Agentic AI for
                    Enterprises
                  </h3>
                </div>
                <div className={styles.buttons}>
                  <Link
                    to="case-studies/stack-ai"
                    className={`${styles.arrowButton} ${styles.arrowButtonLight}`}
                  ></Link>
                </div>
              </div>
            </Link>
            <Link
              to="blog/moonsift-story"
              className={`${styles.bentoSmall} ${styles.BS09}`}
            >
              <div className={styles.bentoText}>
                <div className={styles.innerText}>
                  <div className={styles.bentoLogo}></div>
                  <h3>Building an AI-Powered Shopping Copilot</h3>
                </div>
                <div className={styles.buttons}>
                  <Link
                    to="/blog/moonsift-story"
                    className={`${styles.arrowButton} ${styles.arrowButtonLight}`}
                  ></Link>
                </div>
              </div>
            </Link>
            <Link
              to="/case-studies/finance"
              className={`${styles.bentoSmall} ${styles.BS10}`}
            >
              <div className={styles.bentoText}>
                <div className={styles.innerText}>
                  <h3>
                    How a Leading Financial Data Company Commercialized AI in
                    Under a Year
                  </h3>
                </div>
                <div className={styles.buttons}>
                  <Link
                    to="case-studies/finance"
                    className={`${styles.arrowButton} ${styles.arrowButtonLight}`}
                  ></Link>
                </div>
              </div>
            </Link>
          </div>

          {/* Row 3 - 1 big/2 small */}
          <div className={styles.row}>
            <Link
              to="https://www.astronomer.io/blog/ask-astro-open-source-llm-application-apache-airflow/"
              className={`${styles.bentoSmall} ${styles.BS11}`}
            >
              <div className={styles.bentoText}>
                <div className={styles.innerText}>
                  <div className={styles.bentoLogo}></div>
                  <h3>Ask Astro: An open source LLM Application</h3>
                </div>
                <div className={styles.buttons}>
                  <Link
                    to="https://www.astronomer.io/blog/ask-astro-open-source-llm-application-apache-airflow/"
                    className={styles.arrowButton}
                  ></Link>
                </div>
              </div>
            </Link>
            <Link
              to="https://innovativesol.com/success-stories/preverity/"
              className={`${styles.bentoSmall} ${styles.BS12}`}
            >
              <div className={styles.bentoText}>
                <div className={styles.innerText}>
                  <div className={styles.bentoLogo}></div>
                  <h3>Transforming Risk Management with Generative AI</h3>
                </div>
                <div className={styles.buttons}>
                  <Link
                    to="https://innovativesol.com/success-stories/preverity/"
                    className={styles.arrowButton}
                  ></Link>
                </div>
              </div>
            </Link>
            <Link
              to="/blog/unbody-weaviate"
              className={`${styles.bentoSmall} ${styles.BS13}`}
            >
              <div className={styles.bentoText}>
                <div className={styles.innerText}>
                  <div className={styles.bentoLogo}></div>
                  <h3>Building Foundations for AI-First App Development</h3>
                </div>
                <div className={styles.buttons}>
                  <Link
                    to="/blog/unbody-weaviate"
                    className={`${styles.arrowButton} ${styles.arrowButtonLight}`}
                  ></Link>
                </div>
              </div>
            </Link>
          </div>

          {/* Row 2 - Three medium bento with images */}
          <div className={styles.rowWide}>
            <div className={styles.bento05}>
              <div className={styles.bentoText}>
                <div className={styles.bentoImage}></div>
                <div className={styles.innerText}>
                  <h3>
                    “Through our Corpus API connected to Weaviate, users can
                    build very powerful, low latency search engines in minutes
                    with little to no code.”
                  </h3>
                  <p>Aisis Julian</p>
                  <span>Senior Software Engineer, Morningstar</span>
                </div>
              </div>
            </div>
            <div className={styles.bento06}>
              <div className={styles.bentoText}>
                <div className={styles.innerText}>
                  <h3>Start building with Weaviate for free</h3>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <Link
                  to="https://console.weaviate.cloud"
                  className={styles.buttonDark}
                >
                  Get Started
                </Link>
                <Link to="/contact" className={styles.buttonLight}>
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
