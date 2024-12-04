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
          <h3>
            Our team and community are here to support you at every stage of
            your AI journey.
          </h3>
          <div className={styles.buttons}>
            <Link className={styles.buttonGradient} to="#contact-sales">
              Get in Touch
            </Link>
            <Link className={styles.buttonOutline} to="/services">
              Check our Services
            </Link>
          </div>
          <div className={styles.parentGrid}>
            <div className={styles.imageGrid1}> </div>
            <div className={styles.imageGrid2}> </div>
            <div className={styles.imageGrid3}> </div>
            <div className={styles.imageGrid4}> </div>
            <div className={styles.imageGrid5}> </div>
            <div className={styles.imageGrid6}> </div>
          </div>
          <div className={styles.mobileImage}></div>
        </div>
      </div>
    </div>
  );
}
