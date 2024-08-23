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
            <p>
              Have a great project to share? Let us help you to spread the word
              and the love for open source!{' '}
            </p>
            <p>
              Whether you're a project owner looking to maximize visibility or a
              showcase client aiming to stand out on social media, our program
              provides the tools and support you need to succeed.{' '}
            </p>
            <p>Let’s make sure people see the amazing work you’re doing!</p>

            <div className={styles.buttons}>
              <Link
                className={styles.buttonGradient}
                to="/community/share-the-weaviate-love"
              >
                Submit your project
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
