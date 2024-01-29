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
            <p className={styles.title}>
              Weaviate <span>Partners</span>
            </p>
            <p className={styles.text}>
              Grow with Weaviate! We bring together cutting-edge AI technologies
              and service providers to deliver transformational solutions for
              organizations worldwide.
            </p>
            <div className={styles.buttons}>
              <Link className={styles.buttonGradient} to="#request-form">
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
