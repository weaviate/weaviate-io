import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function ServiceHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>Bring Your Own Cloud (BYOC)</h1>
          <div className={styles.headerBox}>
            <p>
              Weaviate hosts and manages our database within your existing cloud
              environment, leveraging your cloud's native services. Our solution
              integrates seamlessly with AWS, GCP, and Azure, ensuring optimized
              performance and security.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link className={styles.buttonGradient} to="#contact-sales">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
