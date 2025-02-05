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
              <p className={styles.title}>Weaviate on Google Cloud</p>
              <p className={styles.text}>
                Powerful AI-native vector database. Simple, secure deployment on
                GCP.
              </p>
              <div className={styles.buttons}>
                <Link
                  className={styles.buttonGradient}
                  to="https://console.cloud.google.com/marketplace/product/weaviate-gcp-mktplace/weaviate?hl=en&project=clean-pen-427907-c5&invt=AbnfrQ&utm_source=website&utm_medium=button&utm_campaign=GCPMarketplace"
                >
                  Try on Google Cloud Marketplace
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
