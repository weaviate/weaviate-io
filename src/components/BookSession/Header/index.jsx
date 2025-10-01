import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

export default function Header() {
  const formRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!formRef.current) return;

    const SCRIPT_ID = 'hs-forms-v2';
    const SRC = 'https://js.hsforms.net/forms/embed/v2.js';

    const createForm = () => {
      if (!window.hbspt || !window.hbspt.forms) return;
      // Avoid double-initializing on fast refresh / route changes:
      if (formRef.current.dataset.rendered === 'true') return;

      window.hbspt.forms.create({
        portalId: '8738733',
        formId: 'd9b2ccc2-f6cf-446f-ae09-33dfff557a29',
        region: 'na1',
        target: '#hs-form-expert-session',
      });
      formRef.current.dataset.rendered = 'true';
    };

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      if (window.hbspt?.forms) createForm();
      else existing.addEventListener('load', createForm, { once: true });
      return;
    }

    const s = document.createElement('script');
    s.id = SCRIPT_ID;
    s.type = 'text/javascript';
    s.async = true;
    s.src = SRC;
    s.onload = createForm;
    document.body.appendChild(s);
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
                <a href="#session-rag" className={styles.item}>
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
                <a href="#session-scale" className={styles.item}>
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
                <a href="#session-agentic" className={styles.item}>
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
              id="hs-form-expert-session"
              ref={formRef}
              className={styles.hsFormContainer}
              aria-live="polite"
            />
            <noscript>
              <p>
                Please enable JavaScript to load the booking form. You can also{' '}
                <a href="https://share.hsforms.com/12bLMwvbPRG-uCTPf_1V6KQ57aul">
                  book directly here
                </a>
                .
              </p>
            </noscript>
          </div>
        </div>
      </div>
    </section>
  );
}
