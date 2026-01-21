import Link from '@docusaurus/Link';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const HUBSPOT = {
  portalId: '8738733',
  formId: '8a94ed64-9db6-4ab0-a087-8c2123bc0ea1',
  shareUrl: 'https://share.hsforms.com/1ipTtZJ22SrCgh4whI7wOoQ57aul',
};

export default function Introduction() {
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    let done = false;
    const timer = setTimeout(() => {
      if (!done) setFallback(true);
    }, 2500);

    const scriptSelector =
      'script[src="https://js.hsforms.net/forms/embed/v2.js"]';
    const existing = document.querySelector(scriptSelector);

    const ensureCreate = () => {
      if (window.hbspt?.forms?.create) {
        try {
          window.hbspt.forms.create({
            portalId: HUBSPOT.portalId,
            formId: HUBSPOT.formId,
            target: '#hs-form',
          });
          done = true;
          clearTimeout(timer);
        } catch {
          setFallback(true);
        }
      } else {
        setFallback(true);
      }
    };

    const onLoad = () => {
      const s = document.querySelector(scriptSelector);
      if (s) s.setAttribute('data-loaded', 'true');
      ensureCreate();
    };
    const onError = () => setFallback(true);

    if (existing) {
      existing.addEventListener('load', onLoad, { once: true });
      existing.addEventListener('error', onError, { once: true });

      if (
        existing.getAttribute('data-loaded') === 'true' &&
        window.hbspt?.forms?.create
      ) {
        ensureCreate();
      }
    } else {
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/embed/v2.js';
      script.async = true;
      script.setAttribute('data-cookieconsent', 'ignore');
      script.addEventListener('load', onLoad);
      script.addEventListener('error', onError);
      document.body.appendChild(script);
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />

        <div className={styles.heroInner}>
          <div className={styles.logoRow}>
            <div
              className={styles.logoStackAI}
              aria-label="StackAI"
              role="img"
            />
            <div
              className={styles.logoWeaviate}
              aria-label="Weaviate"
              role="img"
            />
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.coverWrap}>
              <div
                className={styles.reportImage}
                aria-label="Building Reliable Enterprise AI with Agentic RAG cover image"
                role="img"
              />
            </div>

            <div className={styles.formSide}>
              <span className={styles.kicker}>E-BOOK</span>

              <h1 className={styles.headerTag}>
                Building Reliable Enterprise AI with Agentic RAG
              </h1>

              <p className={styles.subTitle}>
                Design architectures for building grounded, autonomous RAG
                agents at scale in production with StackAI and Weaviate.
              </p>

              <div className={styles.signUpBox}>
                <div className={styles.formWrapper}>
                  {!fallback ? (
                    <div
                      id="hs-form"
                      className={styles.ebookForm}
                      aria-live="polite"
                    />
                  ) : (
                    <iframe
                      title="Download Building Reliable Enterprise AI with Agentic RAG"
                      className={styles.hsIframe}
                      src={HUBSPOT.shareUrl}
                      loading="lazy"
                      sandbox="allow-forms allow-scripts allow-same-origin"
                    />
                  )}
                </div>

                {fallback && (
                  <p className={styles.fallbackNote}>
                    Having trouble loading the form? Here is a{' '}
                    <a
                      href={HUBSPOT.shareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      shared link
                    </a>
                    .
                  </p>
                )}
              </div>

              <div className={styles.smallPrint}>
                <span>By downloading, you agree to our </span>
                <Link to="/privacy">Privacy Policy</Link>
                <span>.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contentBottom}>
        <div className={styles.bottomInner}>
          <h3>About the e-book</h3>

          <p className={styles.lead}>
            Enterprise AI has gone from novelty to inevitability — but the leap
            from “interesting” prototypes to truly operational systems is still
            surprisingly difficult.
          </p>

          <p>
            Many teams can build a RAG demo that works. The harder part is
            answering the questions that matter in production: safety, security,
            permissions, auditing, and whether the system is actually
            trustworthy for real enterprise use.
          </p>

          <p>
            This e-book introduces{' '}
            <strong>Retrieval-Augmented Generation (RAG)</strong>, the industry
            standard for building reliable, scalable AI systems. RAG grounds AI
            agents in real-world data so they can safely interact with internal
            documents, retrieve key information, and provide up-to-date,
            verifiable responses.
          </p>

          <hr className={styles.rule} />

          <h4 className={styles.subhead}>What you’ll learn</h4>
          <ul className={styles.bullets}>
            <li>
              Why enterprise pilots often stall — and what it takes to move from
              prototype to production.
            </li>
            <li>
              How RAG reduces risk by grounding responses in internal knowledge,
              policies, and regulations.
            </li>
            <li>
              Practical architecture patterns for agentic RAG systems that scale
              with real workloads.
            </li>
            <li>
              Best practices for safety, monitoring, and evaluation so
              stakeholders can trust the output.
            </li>
          </ul>

          <aside className={styles.callout}>
            <p className={styles.calloutKicker}>A practical reality check</p>

            <p>
              <strong>StackAI</strong> handles orchestration — enabling teams to
              build AI agents visually with drag-and-drop workflows that connect
              to enterprise systems.
            </p>
            <p>
              <strong>Weaviate</strong> powers retrieval — indexing internal
              documents and knowledge bases with hybrid search and metadata
              filtering, then retrieving the right context in milliseconds.
            </p>

            <ul className={styles.calloutBullets}>
              <li>Secure by design (SOC 2 / HIPAA / GDPR aligned)</li>
              <li>Granular permissions and access controls</li>
              <li>Fast and accurate at enterprise scale</li>
              <li>Auditable and traceable workflows</li>
            </ul>

            <p className={styles.calloutFooter}>
              The full guide covers advanced RAG techniques, real workflow
              architectures, and best practices for safety and monitoring.
            </p>
          </aside>

          <hr className={styles.rule} />
        </div>
      </section>
    </>
  );
}
