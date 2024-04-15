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
            <h3>
              Our team of experts will manage everything for you in a dedicated
              instance in Weaviate Cloud Services.
            </h3>
            <p>
              We help you run large-scale production workloads, without the
              complexities of self-management.
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
