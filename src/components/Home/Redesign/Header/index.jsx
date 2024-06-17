import React, { useState, useEffect } from 'react';
import { ButtonContainer } from '../../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function HomepageHeader() {
  return (
    <>
      <header className={styles.headerHome}>
        <video
          id="headerVideo"
          className={styles.headerVideo}
          muted="muted"
          autoplay="autoplay"
          playsinline="playsinline"
          loop="loop"
        >
          <source
            src="/img/site/3d-weaviate-bubble-white-light-loop-sml.mp4"
            poster="/img/site/3d-weaviate-bubble-white-light.jpg"
            type="video/mp4"
          />
          <source
            src="/img/site/3d-weaviate-bubble-white-light-loop-sml.mov"
            poster="/img/site/3d-weaviate-bubble-white-light.jpg"
            type="video/mov"
          />
          <source
            src="/img/site/3d-weaviate-bubble-white-light-loop-sml.webm"
            poster="/img/site/3d-weaviate-bubble-white-light.jpg"
            type="video/webm"
          />
        </video>
        <div className={styles.headerContent}>
          <div className="container">
            <div className={styles.grid}>
              <div className={styles.box}>
                <h1>
                  The AI-native database<br></br> for a new generation of
                  <br></br> software
                </h1>
                <p>
                  Bring intuitive applications to life with less <br></br>{' '}
                  hallucination, data leakage, and vendor lock-in
                </p>
              </div>

              <div className={styles.buttons}>
                <Link
                  className={styles.buttonGradient}
                  to="https://console.weaviate.cloud"
                >
                  Start Free
                </Link>
                <Link className={styles.buttonOutline} to="/platform">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={styles.homeIcon}></div>
                <h2>Hybrid Search</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Improve search experiences by merging vector and keyword
                  techniques. Deliver contextual, precise results across all of
                  your data in any modality, with less effort.
                </p>
                <Link to="/hybrid-search">Learn more</Link>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={styles.homeIcon}></div>
                <h2>RAG</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Build trustworthy generative AI applications using your own
                  data, with privacy and security top-of-mind. Surface relevant
                  and accurate answers using your favorite LLMs.
                </p>
                <Link to="/rag">Learn more</Link>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={styles.homeIcon}></div>
                <h2>
                  Generative<br></br>Feedback Loops
                </h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Make your dataset smarter by enriching it with AI-generated
                  answers. Improve personalization and spend less time on manual
                  data cleaning.
                </p>
                <Link to="/gen-feedback-loops">Learn more</Link>
              </div>
            </div>
          </div>
          <div className={styles.serviceBox}>
            <div className={styles.serviceText}>
              <h2>Empower every developer to build AI-native applications</h2>
              <span>With flexible, reliable, open source foundations.</span>
              <p>
                Software development is changing. Our open source vector
                database and surrounding offerings are designed to support
                developers and teams of all sizes on their AI journey.
              </p>
              <div className={styles.buttons}>
                <Link
                  className={styles.buttonGradient}
                  to="https://console.weaviate.cloud"
                >
                  Start Free
                </Link>
                <Link className={styles.buttonOutline} to="/services">
                  Learn More
                </Link>
              </div>
            </div>

            <div className={styles.serviceImage}></div>
          </div>
        </div>
      </header>
      <div className={styles.bottomBg}>
        <div className="container">
          <div className={styles.bottomBar}>
            <h2 className={styles.text}>
              With over 1M monthly downloads, Weaviate is a core piece<br></br>{' '}
              of the AI-native stack for developers and enterprises alike.
            </h2>
            <div className={styles.innerBar}>
              <div className={styles.logoSection}>
                <div
                  className={`${styles.customerLogo} ${styles.stackoverflowLogo}`}
                />
                <div
                  className={`${styles.customerLogo} ${styles.instabaseLogo}`}
                />
                <div
                  className={`${styles.customerLogo} ${styles.redhatLogo}`}
                />
                <div
                  className={`${styles.customerLogo} ${styles.netappLogo}`}
                />
                <div
                  className={`${styles.customerLogo} ${styles.shippoLogo}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
