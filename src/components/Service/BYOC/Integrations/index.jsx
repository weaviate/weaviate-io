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
            <h3>Run Weaviate within your VPC</h3>
            <p>
              Take advantage of all the best vector search and RAG techniques
              while ensuring your data stays safe within your own cloud
              environment.
            </p>
            <div className={styles.iconsContainer}>
              <div className={`${styles.iconText} ${styles.contact}`}>
                <Link href="#contact-sales">Get in touch</Link>
              </div>
              <div className={`${styles.iconText} ${styles.services}`}>
                <Link href="/services">Check our Services</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
