import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function BuildWith() {
  return (
    <div className="container">
      <div className={styles.Container}>
        <div className={styles.headerContainer}>
          <h2>Build with Weaviate</h2>
          <p>Look at how developers are building with Weaviate.</p>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.largeBox}>
            <div className={styles.boxTop}>
              <div className={styles.boxLogo}></div>
              <Link
                to="/community/build-with-weaviate"
                className={styles.boxButton}
              >
                {'See the showcase >'}
              </Link>
            </div>
            <h3>
              Using Weaviate to Build the Foundation for AI-First App
              Development
            </h3>
            <div className={styles.boxImage}></div>
          </div>
          <div className={styles.innerContainer}>
            <div className={`${styles.smallBox} ${styles.light}`}>
              <h3>RicAI</h3>
              <p>
                An Autonomous AI Agent for automating software testing,
                generating test cases and performing various tests.
              </p>

              <Link
                to="/community/build-with-weaviate"
                className={styles.boxButton}
              >
                {'See the showcase >'}
              </Link>
            </div>
            <div className={`${styles.smallBox} ${styles.dark}`}>
              <h3>Internship Finder</h3>
              <p>
                An interactive web application to help you discover internship
                opportunities tailored to your resume!
              </p>

              <Link
                to="/community/build-with-weaviate"
                className={styles.boxButton}
              >
                {'See the showcase >'}
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Link to="/community/build-with-weaviate" className={styles.button}>
            See all Showcases
          </Link>
        </div>
      </div>
    </div>
  );
}
