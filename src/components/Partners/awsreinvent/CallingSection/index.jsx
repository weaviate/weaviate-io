import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.scss';

export default function CallingSection() {
  const gift = 'Item name';
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>Calling all engineers and developers</h2>
          <p>
            Meet with our leadership team to see what’s ahead for vector
            databases, explore hands-on<br></br> demos and learn more about the
            power of Weaviate on AWS. 
          </p>
        </div>
        <div className={styles.features}>
          <div className={styles.box}>
            <div className={styles.icon1}></div>
            <h4 className={styles.title}>Attend our lightning talk</h4>
            <p className={styles.subTitle}>
              Vector databases are an emerging piece of the modern data stack,
              purpose-built for vector embeddings, that give generative models
              access to unique, personal, or proprietary data. Hear our CEO Bob
              van Luijt share the benefits of using an open source vector
              database.
            </p>
          </div>
          <div className={styles.box}>
            <div className={styles.icon2}></div>
            <h4 className={styles.title}>Meet with us, get a gift</h4>
            <p className={styles.subTitle}>
              Book a meeting at BRERA Osteria or right in our booth to learn
              about Weaviate and explore our product roadmap. Get exclusive
              gifts like {gift} when you attend a 1:1 meeting with one of our
              team members. Request a time to meet and we’ll get back to you to
              confirm your attendance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
