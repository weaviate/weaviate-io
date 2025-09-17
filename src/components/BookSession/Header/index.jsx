import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

export default function Header() {
  const meetingsRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return; // avoid SSR
    if (!meetingsRef.current) return;

    const SCRIPT_ID = 'hs-meetings-embed';
    if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement('script');
      s.src =
        'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
      s.async = true;
      s.type = 'text/javascript';
      s.id = SCRIPT_ID;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.leftInner}>
            <h1>
              Book a free 1-on-1 technical deep dive
              <br /> with a Weaviate expert
            </h1>
            <p className={styles.sub}>
              In a free 30-minute session, we’ll review your architecture and
              help you solve your specific RAG, scaling, or agent architecture
              challenges.
            </p>

            <ul className={styles.actionList}>
              <li>
                <a href="#sessions" className={styles.item}>
                  <span
                    className={`${styles.icon} ${styles.rag}`}
                    aria-hidden="true"
                  />
                  <span className={styles.label}>
                    Build a Production-Ready RAG Application {'>'}
                  </span>
                </a>
              </li>
              <li>
                <a href="#sessions" className={styles.item}>
                  <span
                    className={`${styles.icon} ${styles.optimize}`}
                    aria-hidden="true"
                  />
                  <span className={styles.label}>
                    Optimize for Scale &amp; Performance {'>'}
                  </span>
                </a>
              </li>
              <li>
                <a href="#sessions" className={styles.item}>
                  <span
                    className={`${styles.icon} ${styles.agent}`}
                    aria-hidden="true"
                  />
                  <span className={styles.label}>
                    Architecting Long-Term Memory for AI Agents {'>'}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.right} id="top-scheduler">
          <div className={styles.rightInner}>
            <div
              ref={meetingsRef}
              className={`meetings-iframe-container ${styles.meetingsContainer}`}
              data-src="https://meetings.hubspot.com/bob-van-luijt/expert-session?embed=true"
            />
            <noscript>
              <iframe
                title="Book a session"
                src="https://meetings.hubspot.com/bob-van-luijt/expert-session?embed=true"
                className={styles.schedulerFrame}
              />
            </noscript>
          </div>
        </div>
      </div>
    </section>
  );
}
