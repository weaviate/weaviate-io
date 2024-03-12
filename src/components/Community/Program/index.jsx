import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function Program() {
  return (
    <div className={styles.introBg}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.textGrid}>
            <h2 className={styles.head}>Weaviate Hero Program at a Glance</h2>
            <p>
              The Weaviate Hero Program was brought to life to appreciate,
              recognize & celebrate members in our Community who contribute and
              engage in ways that make our Community{' '}
              <strong>
                “a great and safe place where people can learn, make friends,
                and grow. A place for giving and receiving.”
              </strong>
            </p>{' '}
            <p>
              And who ultimately develop and share practices that help
              individuals in the group thrive. With this global program, we
              enable members to accelerate their knowledge, skills, and growth
              in the areas of Vector Databases, Search, and AI-native
              applications and become thought leaders through their activities
              and initiatives across the Weaviate Ecosystem.
            </p>
            <h2>The Why</h2>
            <p>
              By introducing a company-wide program we adhere to our open-source
              nature of being transparent, open, and supportive of knowledge
              sharing. We believe that a culture of giving and sharing leads to
              better and open innovation and contributes to a great AI landscape
              and ecosystem.
            </p>
            <h2>A Fun Fact</h2>
            <p>
              This program actually started with our internal Weaviate Hero
              initiative - where our employees can give shout-outs to co-workers
              who helped them strive and be successful. We believe that
              community starts inside the company and we would love to give some
              of this great experience back to our community!
            </p>
            <div className={styles.buttonContainer}>
              <Link to="https://forms.gle/FHwhfPYwCVKkzw5h6">
                <button className={styles.buttonGradient}>Become a Hero</button>
              </Link>
            </div>
          </div>
          <div className={styles.imgGridMiddle}>
            <div className={styles.img1} />
            <div className={styles.img2} />
          </div>
          <div>
            <div className={styles.img3} />
            <div className={styles.img4} />
          </div>
        </div>
      </div>
    </div>
  );
}
