import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.scss';

export default function CallingSection() {
  const gift = 'GIFT';
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>
            Calling all developers, data scientists, and AI builders of all
            levels
          </h2>
          <p>
            Meet with our leadership team to hear what’s ahead for AI-native
            applications, explore hands-on<br></br> demos and learn more about
            the power of Weaviate on AWS. 
          </p>
        </div>
        <div className={styles.features}>
          <div className={styles.box}>
            <div className={styles.icon1}></div>
            <h4 className={styles.title}>Attend our lightning talk</h4>
            <p className={styles.subTitle}>
              Vector databases are an emerging piece of the modern data stack,
              purpose-built for AI, that empower use cases like semantic search,
              retrieval augmented generation (RAG), and generative feedback
              loops. Hear our CEO Bob van Luijt share the benefits of using an
              open source vector database as the foundation of your AI-native
              stack.
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
