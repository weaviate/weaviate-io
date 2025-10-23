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
      if (window.hbspt && window.hbspt.forms && window.hbspt.forms.create) {
        try {
          window.hbspt.forms.create({
            portalId: HUBSPOT.portalId,
            formId: HUBSPOT.formId,
            target: '#hs-form',
          });
          done = true;
          clearTimeout(timer);
        } catch (e) {
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
      <div className={styles.demoContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.demoTitle}>
            <div className={styles.demoLogo}></div>
          </div>

          <div className={styles.content}>
            <div className={styles.contentSideA}>
              <div
                className={styles.reportImage}
                aria-label="The Context Engineering Guide cover image"
                role="img"
              ></div>
            </div>

            <div className={styles.contentSideB}>
              <span>GUIDE</span>
              <h1 className={styles.headerTag}>
                The Context Engineering Guide
              </h1>
              <span className={styles.subTitle}>
                Master the architectural patterns for building reliable,
                production-ready AI applications that think with real-world
                context.
              </span>

              <div className={styles.signUp}>
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
                        title="Download The Context Engineering Guide"
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
                        shared link.
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentBottom}>
        <div>
          <h3>About the guide</h3>
          <p>
            A powerful Large Language Model is not enough. The smartest models
            still hallucinate, lack real-world knowledge, and can't remember
            your last conversation. The solution isn't a better prompt. It's a
            better system.
          </p>
          <p>
            This e-book is your guide to mastering Context Engineering: the act
            of selecting, organizing, and managing the information fed into a
            large language model during inference (i.e. the “context” tokens) to
            optimize its performance and behavior. You'll learn the
            architectural patterns required to move beyond simple demos and
            build reliable, production-ready AI applications that think with
            real-world context, not just their training data.
          </p>
          <br />
          <ul>
            <p className={styles.listHeader}>
              The Context Engineering Guide covers:
            </p>
            <li>
              How to<strong> architect an Agent</strong> to act as the system's
              decision-making brain.
            </li>
            <li>
              How to<strong> apply Query Augmentation</strong> to translate
              messy user requests into precise, actionable intent.
            </li>
            <li>
              The principles of effective<strong> Retrieval</strong> to connect
              your model to the right external information at the right time.
            </li>
            <li>
              How to design a<strong> Memory</strong> architecture that gives
              your system a sense of history and the power to learn.
            </li>
            <li>
              The strategies for integrating<strong> Tools</strong> to give your
              application hands to interact with live data and APIs.
            </li>
          </ul>
          <hr></hr>
        </div>
      </div>
    </>
  );
}
