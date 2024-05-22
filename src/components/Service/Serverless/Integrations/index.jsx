import React from 'react';
import { ButtonContainer } from '../../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Integrations() {
  return (
    <div className={styles.integrationsSection}>
      <div className="container">
        <div className={styles.teamContainer}>
          <div className={styles.parentGrid}>
            <div className={styles.imageGrid1}> </div>
            <div className={styles.imageGrid2}> </div>
            <div className={styles.imageGrid3}> </div>
          </div>
          <div className={styles.right}>
            <h3>Start building today</h3>
            <p>
              Our developer-approved resources will help you get started quickly
              Weaviate Serverless. And our team and community are here for
              support as you need us.
            </p>
            <div className={styles.iconsContainer}>
              <div className={`${styles.iconText} ${styles.community}`}>
                <Link href="https://forum.weaviate.io/">
                  Join the Community
                </Link>
              </div>
              <div className={`${styles.iconText} ${styles.docs}`}>
                <Link href="/developers/weaviate">Read the Docs</Link>
              </div>
              <div className={`${styles.iconText} ${styles.console}`}>
                <Link href="https://console.weaviate.cloud/">
                  Explore WCS Console
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
