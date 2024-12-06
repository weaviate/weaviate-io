import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function StudyHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.left}>
            <span className={styles.headSpan}>MORNINGSTAR CASE STUDY</span>
            <h1>
              “Through our Corpus API connected to Weaviate, users can build
              very powerful, low latency search engines in minutes with little
              to no code.”
            </h1>
            <span>
              <strong>Aisis Julian</strong>
              <br></br>
              Senior Software Engineer, Morningstar
            </span>
            <div className={styles.headerBox}>
              <div className={styles.buttons}>
                <Link
                  to="/case-studies/morningstar"
                  className={styles.buttonDark}
                >
                  Download PDF
                </Link>
                <Link to="/contact" className={styles.buttonLight}>
                  Contact sales
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.image}></div>
          </div>
        </div>
      </div>
    </header>
  );
}
