import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function Opensource() {
  return (
    <div className={styles.bg}>
      <div className="container">
        <div className={styles.teamContainer}>
          <div className={styles.title}>
            <h2>Spread the open source love 💚</h2>
            <p>Have a great project to share?</p>
            <p>
              Check out our community projects page to find out how to submit
              your project, or find other examples from our communtiy!
            </p>

            <div className={styles.buttons}>
              <Link
                className={styles.buttonGradient}
                to="/community/build-with-weaviate"
              >
                Community Showcases
              </Link>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.parentGrid}>
              <div className={styles.imageGrid1}> </div>
              <div className={styles.imageGrid2}> </div>
              <div className={styles.imageGrid3}> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
