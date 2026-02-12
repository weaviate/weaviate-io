import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function AgentSkillsHeader() {
  const youtubeId = 'PhCrlpUwEhU'; //
  const youtubeSrc = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&fs=0&disablekb=1`;

  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.heroGrid}>
          {/* Left */}
          <div className={styles.heroCopy}>
            <h1>Agent Skills</h1>

            <div className={styles.headerBox}>
              <p>
                Build production-ready agent workflows with Weaviate. Reusable
                skills for querying, retrieval, and guided setup — plus an
                end-to-end cookbook.
              </p>
            </div>

            <div className={styles.buttonsLeft}>
              <Link
                className={styles.buttonGradient}
                to="https://github.com/weaviate/agent-skills"
              >
                View on GitHub
              </Link>
              <Link className={styles.buttonOutline} to="#cookbook">
                Explore Cookbook
              </Link>
            </div>
          </div>

          {/* Right */}
          <div
            className={styles.heroMedia}
            aria-label="Agent Skills demo video"
          >
            <div className={styles.videoCard}>
              <div className={styles.videoFrame}>
                <iframe
                  src={youtubeSrc}
                  title="Agent Skills demo"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
