import React from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
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
              <p className={styles.title}>
                Weaviate <span>Partners</span>
              </p>
              <p className={styles.text}>
                At Weaviate, we believe in the power of collaboration and shared
                success. That's why we've developed a Partner Program that aims
                to bring together innovative minds and cutting-edge AI
                technologies to drive transformational solutions for businesses
                worldwide.
              </p>
              <div className={styles.buttons}>
                <Link
                  className={styles.buttonGradient}
                  to="https://console.weaviate.cloud"
                >
                  Become a Partner
                </Link>
                <Link
                  className={styles.buttonOutline}
                  to="https://weaviate.io/developers/weaviate"
                >
                  Register a Deal
                </Link>
              </div>
            </div>
            <div className={styles.rightGrid}>
              <div className={styles.img} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
