import React from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Join() {
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
            <h2>Join the team</h2>
            <p>
              At Weaviate we are committed to our values - the foundation of our
              company. They guide our decisions in ways that are better for our
              people, our business, and the future. We are looking for ambitious
              people globally. Join us, so we can expand and grow together.
            </p>
            <div className={styles.buttons}>
              <Link className={styles.buttonOutline} to="/company/about-us">
                See open roles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
