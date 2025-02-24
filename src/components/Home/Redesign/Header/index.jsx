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
                <h2>
                  Bring intuitive AI-native applications to life with the open
                  source vector database developers love.
                </h2>
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
                  your data, with less effort.
                </p>
                <Link to="/hybrid-search">Learn more</Link>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={` ${styles.homeIcon} ${styles.ragIcon}`}></div>
                <h2>
                  Retrieval-Augmented<br></br>Generation
                </h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Build trustworthy generative AI applications using your own
                  data. Surface relevant and accurate answers using your
                  favorite LLMs.
                </p>
                <Link to="/rag">Learn more</Link>
              </div>
            </div>

            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div
                  className={` ${styles.homeIcon} ${styles.infraIcon}`}
                ></div>
                <h2>Agentic AI</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Fuel enterprise intelligence with agentic workflows. Build
                  scalable, context-aware AI agents that can learn and adapt on
                  the fly.
                </p>
                <Link to="/agentic-ai">Learn more</Link>
              </div>
            </div>
          </div>
          <div className={styles.serviceBox}>
            <div className={styles.serviceText}>
              <h2>
                More than just a vector database—a launchpad for AI innovation
              </h2>
              <span>With flexible, reliable, open source foundations.</span>

              <div className={`${styles.buttons} ${styles.vertical}`}>
                <Link
                  className={styles.buttonGradient}
                  to="https://console.weaviate.cloud"
                >
                  Get Started
                </Link>
                <Link className={styles.buttonDark} to="/workbench">
                  Products Overview
                </Link>
              </div>
            </div>

            <div className={styles.serviceImage}></div>
          </div>

          <div className={styles.tempBox}>
            <div className={styles.tempText}>
              <h2>AI infrastructure tailored to your use case </h2>

              <p>
                From real-time results to data isolation and cost management,
                optimize for what you need.
              </p>
              <div className={styles.tempContainer}>
                <div className={styles.hotImage}></div>
                <div className={styles.warmImage}></div>
                <div className={styles.coldImage}></div>
              </div>
              <div className={styles.buttons}>
                <Link
                  className={styles.buttonGradient}
                  to="/cost-performance-optimization"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={styles.bottomBg}>
        <div className="container">
          <div className={styles.bottomBar}>
            <h2 className={styles.text}>
              With over 1M monthly downloads, our open source vector database is
              a core piece of the AI-native stack for developers and enterprises
              alike.
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
                  className={`${styles.customerLogo} ${styles.mulinyLogo}`}
                />
                <div
                  className={`${styles.customerLogo} ${styles.shippoLogo}`}
                />
              </div>
            </div>

            <div className={`${styles.innerBar} ${styles.secondLine}`}>
              <div className={styles.logoSection}>
                <div className={`${styles.customerLogo} ${styles.redbull}`} />
                <div className={`${styles.customerLogo} ${styles.ms}`} />
                <div
                  className={`${styles.customerLogo} ${styles.netappLogo}`}
                />
                <div className={`${styles.customerLogo} ${styles.bunqLogo}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
