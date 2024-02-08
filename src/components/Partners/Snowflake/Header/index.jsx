import React from 'react';
import { ButtonContainer } from '../../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function PartnersHeader() {
  return (
    <header>
      <div className={styles.partnersHead}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.leftGrid}>
              <p className={styles.title}>Weaviate + Snowflake</p>
              <p className={styles.text}>
                Leverage generative AI capabilities within the boundaries of
                your Snowflake data environment.
              </p>
              <div className={styles.buttons}>
                <Link
                  className={styles.buttonGradient}
                  to="https://github.com/Snowflake-Labs/sfguide-getting-started-weaviate-on-spcs"
                >
                  Get started with Snowpark Container Services
                </Link>
              </div>
            </div>

            <div className={styles.img} />
          </div>
        </div>
      </div>
    </header>
  );
}
