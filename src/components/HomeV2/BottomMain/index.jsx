import Link from '@docusaurus/Link';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function BottomMain() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h2>The best teams choose Weaviate to power their AI products</h2>
          <p>
            With over 20M open source downloads and thousands of customers,
            Weaviate is a core piece of the stack for leading startups,
            scale-ups, and enterprises.
          </p>
          <Link to="/case-studies" className={styles.caseLink}>
            {' '}
            SEE ALL CASE STUDIES{'-->'}{' '}
          </Link>
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
                    className={styles.arrowButton}
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
                    className={styles.arrowButton}
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
                    className={styles.arrowButton}
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
                    className={styles.arrowButton}
                  ></Link>
                </div>
              </div>
            </Link>
          </div>

          {/* Row 2 - Three medium bento with images */}
          <div className={styles.rowWide}>
            <div className={styles.bentoWithImage}>
              <div className={styles.bentoImage}></div>
              <div className={styles.bentoText}>
                <h3>
                  "Accuracy — how good the answer is — is the first thing we
                  want to optimize for. That’s how we found Weaviate."
                </h3>
                <div className={styles.bentoNameRow}>
                  <div>
                    <p>Kerry Chang</p>
                    <span>Head of Product Engineering</span>
                  </div>
                  <img
                    className={styles.instabase}
                    src="/img/site/instabase-cs.svg"
                    alt="Instabase logo"
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.bentoWithImage} ${styles.BWI02}`}>
              <div className={styles.bentoImage}></div>
              <div className={styles.bentoText}>
                <h3>
                  “We were able to translate the speed of implementation of
                  Weaviate to the speed of delivering commercial AI products
                  within a year.”
                </h3>
                <div className={styles.bentoNameRow}>
                  <div>
                    <p className={styles.visuallyHidden}>Hidden Name</p>
                    <span>Principal Engineer</span>
                  </div>
                  <img src="/img/site/build-factset.svg" alt="Factset logo" />
                </div>
              </div>
            </div>
            <div className={`${styles.bentoWithImage} ${styles.BWI03}`}>
              <div className={styles.bentoImage}></div>
              <div className={styles.bentoText}>
                <h3>
                  "The biggest benefit of using Weaviate isn't just the
                  technology – it's the team behind it. The level of support we
                  receive through their engineering team and support channels
                  has been company-saving help.”
                </h3>
                <div className={styles.bentoNameRow}>
                  <div>
                    <p>Antoni Rosinol</p>
                    <span>Co-founder</span>
                  </div>
                  <img src="/img/site/build-stack-ai.svg" alt="Stack-AI logo" />
                </div>
              </div>
            </div>
          </div>

          {/* Row 3 - One big + Four small */}
          <div className={styles.rowLarge}>
            <div className={styles.bento05}>
              <div className={styles.bentoText}>
                <h3>Let’s build together</h3>
                <p>
                  Our global community is here to help you with your projects
                  and provide expert advice.
                </p>
                <div className={styles.socialContainer}>
                  <Link
                    to="https://github.com/weaviate/weaviate"
                    className={styles.socialLink}
                  ></Link>
                  <Link
                    to="https://weaviate.io/slack"
                    className={`${styles.socialLink} ${styles.slack}`}
                  ></Link>
                  <Link
                    to="https://weaviate.io"
                    className={`${styles.socialLink} ${styles.weaviate}`}
                  ></Link>
                  <Link
                    to="https://x.com/weaviate_io"
                    className={`${styles.socialLink} ${styles.x}`}
                  ></Link>
                  <Link
                    to="https://www.linkedin.com/company/weaviate-io"
                    className={`${styles.socialLink} ${styles.linkedin}`}
                  ></Link>
                </div>
              </div>
            </div>
            <div className={styles.rightCol}>
              <Link to="/learn" className={styles.bentoSmall}>
                <div className={styles.bentoText}>
                  <div className={styles.innerText}>
                    <h3>Learning Center</h3>
                  </div>
                  <div className={styles.buttons}>
                    <Link to="/learn" className={styles.arrowButton}></Link>
                  </div>
                </div>
              </Link>
              <Link
                to="/community/events"
                className={`${styles.bentoSmall} ${styles.small02}`}
              >
                <div className={styles.bentoText}>
                  <div className={styles.innerText}>
                    <h3>Events</h3>
                  </div>
                  <div className={styles.buttons}>
                    <Link
                      to="/community/events"
                      className={styles.arrowButton}
                    ></Link>
                  </div>
                </div>
              </Link>
              <Link
                to="/blog"
                className={`${styles.bentoSmall} ${styles.small03}`}
              >
                <div className={styles.bentoText}>
                  <div className={styles.innerText}>
                    <h3>Blog</h3>
                  </div>
                  <div className={styles.buttons}>
                    <Link to="/blog" className={styles.arrowButton}></Link>
                  </div>
                </div>
              </Link>
              <Link
                to="https://docs.weaviate.io/weaviate"
                className={`${styles.bentoSmall} ${styles.small04}`}
              >
                <div className={styles.bentoText}>
                  <div className={styles.innerText}>
                    <h3>Docs</h3>
                  </div>
                  <div className={styles.buttons}>
                    <Link
                      to="https://docs.weaviate.io/weaviate"
                      className={styles.arrowButton}
                    ></Link>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
