import Link from '@docusaurus/Link';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const HUBSPOT = {
  portalId: '8738733',
  formId: '5bcb8eca-d759-42f3-93f0-343ff958911a',
  shareUrl: 'https://share.hsforms.com/1W8uOytdZQvOT8DQ_-ViRGg57aul',
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
      // mark as loaded so future mounts don’t re-wait
      const s = document.querySelector(scriptSelector);
      if (s) s.setAttribute('data-loaded', 'true');
      ensureCreate();
    };
    const onError = () => setFallback(true);

    if (existing) {
      existing.addEventListener('load', onLoad, { once: true });
      existing.addEventListener('error', onError, { once: true });
      // If already loaded earlier:
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
      // ensure consent tools don’t block this tag itself (we gate UX via fallback)
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
                aria-label="The AI Strategy Playbook cover image"
                role="img"
              ></div>
            </div>

            <div className={styles.contentSideB}>
              <span>GUIDE</span>
              <h1 className={styles.headerTag}>The AI Strategy Playbook</h1>
              <span className={styles.subTitle}>
                The AI Leader’s Guide to Operationalizing AI
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
                        title="Download The AI Strategy Playbook"
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
            Whether you’re a startup founder, a technical leader at a large
            enterprise, or an individual who wants to bring AI to your
            workplace, this e-book is here to help you navigate the complexities
            of AI adoption.
          </p>
          <p>
            You'll learn how to clearly define and articulate the business value
            of your AI project, navigate strategic conversations, and secure the
            necessary backing and resources to launch and scale your project.
          </p>
          <br />
          <ul>
            <p className={styles.listHeader}>
              The AI Strategy Playbook covers:
            </p>
            <li>Defining your business problem</li>
            <li>Organizational readiness</li>
            <li>Calculating return on investment (ROI)</li>
            <li>Data assessment</li>
            <li>Technical readiness</li>
            <li>Scalability and growth</li>
          </ul>

          <h3>About the author</h3>
          <div className={styles.authorBox}>
            <div className={styles.authorImage}></div>
            <div className={styles.authorInfo}>
              <h4>Byron Voorbach</h4>
              <h5>Field CTO at Weaviate</h5>
            </div>
          </div>
          <p>
            Byron Voorbach has spent over a decade in the search domain,
            consulting hundreds of companies and aiding in implementing
            large-scale search systems. As the Field CTO at Weaviate, he
            collaborates with customers globally to harness the power of
            semantic search in their operations.
          </p>
          <p>
            He’s also a regular conference speaker and active contributor to
            open-source projects. When he’s not helping companies build and
            scale their AI projects, he enjoys spending time with his two cats,
            scuba diving, and traveling the world.
          </p>
          <p>
            Connect with him on{' '}
            <Link to="https://www.linkedin.com/in/byronvoorbach/">
              LinkedIn
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
