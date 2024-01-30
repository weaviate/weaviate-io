import Link from '@docusaurus/Link';
import React from 'react';
import logosData from './logos.json';
import styles from './styles.module.scss';

export default function TechnologyPartners() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>Technology Partners</h2>
        </div>
        <div className={styles.techContainer}>
          <div className={styles.techList}>
            {logosData.logos.map((logo) => (
              <div className={styles.techBox} key={logo.companyName}>
                <Link to={logo.link}>
                  <span className={styles[logo.cssClass]} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
