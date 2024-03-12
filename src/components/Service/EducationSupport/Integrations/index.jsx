import React from 'react';
import { ButtonContainer } from '../../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Integrations() {
  return (
    <div className={styles.integrationsSection}>
      <div className="container">
        <div className={styles.header}>
          <h2>Courses & Training</h2>
          <p>
            We've built these courses to help you build amazing things with
            Weaviate, faster.
          </p>
        </div>
        <div className={styles.learningContainer}>
          <div className={styles.learningRow}>
            <div className={styles.educationImage}></div>

            <div className={styles.right}>
              <h3>Introduction to AI-Native Vector Databases</h3>
              <p>LinkedIn Learning</p>
              <p>
                Zain Hasan's course offers an in-depth look at vector databases,
                highlighting their use in enhancing search accuracy and managing
                complex data through AI, with practical coding labs for
                real-world applications in sectors like e-commerce and social
                media.
              </p>
              <div className={styles.iconsContainer}>
                <div className={styles.iconText}>
                  <Link href="https://www.linkedin.com/learning/introduction-to-ai-native-vector-databases">
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.learningRow}>
            <div className={styles.right}>
              <h3>Vector Databases: from Embeddings to Applications</h3>
              <p>DeepLearning.AI</p>
              <p>
                In this course Sebastian Witalec dives into vector databases'
                essential to help you leverage embeddings for similarity
                searches and develop applications, from Retrieval Augmented
                Generation to multilingual searches, through hands-on labs and
                exploration of fast search algorithms.
              </p>
              <div className={styles.iconsContainer}>
                <div className={styles.iconText}>
                  <Link href="https://www.deeplearning.ai/short-courses/vector-databases-embeddings-applications/">
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
            <div className={`${styles.educationImage} ${styles.seb} `}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
