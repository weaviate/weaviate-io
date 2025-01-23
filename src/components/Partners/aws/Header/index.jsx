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
              <p className={styles.title}>Weaviate on AWS</p>
              <p className={styles.text}>
                Powerful AI-native vector database. Simple, secure deployment on
                AWS.
              </p>
              <div className={styles.buttons}>
                <Link
                  className={styles.buttonGradient}
                  to="https://aws.amazon.com/marketplace/pp/prodview-ng2dfhb4yjoic?sr=0-3&ref_=beagle&applicationId=AWSMPContessa&utm_source=website&utm_medium=button&utm_campaign=AWSMarketplace"
                >
                  Try free on AWS Marketplace
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
