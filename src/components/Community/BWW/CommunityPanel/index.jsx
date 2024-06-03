import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function CommunityPanel() {
  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.title}>
          <h2>Weaviate picks</h2>
          <p>
            Check out our favorite Weaviate projects! We've hand picked the best
            to showcase AI innovation and creativity.
          </p>
        </div>
        <div className={styles.box}>
          <div className={styles.card}>
            <div className={styles.cardHeader}></div>
            <div className={styles.contentDiv}>
              <div className={styles.textCardContent}>
                <h3>RicAI</h3>
                <p>
                  The goal was to create an Autonomous AI Agent for automating
                  software testing, generating test cases, performing various
                  tests, and more.
                </p>
                <Link to="https://github.com/liskovich/RicAI_Autonomous_Agents_Hackathon">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={`${styles.cardHeader} ${styles.example2}`}></div>
            <div className={styles.contentDiv}>
              <div className={styles.textCardContent}>
                <h3>Internship Finder</h3>
                <p>
                  An interactive web app helps users find customized internships
                  by uploading their resume, extracting key details and matching
                  relevant opportunities to apply.
                </p>
                <Link to="https://github.com/desaianm/internship_finder">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.cardHeader} ${styles.example3}`}></div>
            <div className={styles.contentDiv}>
              <div className={styles.textCardContent}>
                <h3>Unbody.io</h3>
                <p>
                  Learn how Unbody migrated to Weaviate, becoming the first
                  vector database headless CMS and accelerating the shift to a
                  comprehensive AI API platform.
                </p>
                <Link to="https://weaviate.io/blog/unbody-weaviate">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
