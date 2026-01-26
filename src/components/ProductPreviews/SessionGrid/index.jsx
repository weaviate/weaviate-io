import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';

const PREVIEWS = [
  {
    id: 'engram',
    label: 'PREVIEW',
    title: 'Engram - Memory and Context Management for Agents',
    description:
      'A fully managed API for building agents that remember, learn, and continually improve over time.',
    graphic: '/img/site/book-rag-graphic.svg',
    learnMoreHref: '',
  },
  {
    id: 'model-eval',
    label: 'PREVIEW',
    title: 'Model Evaluation Tool',
    description:
      'Evaluate and compare embedding models using your own data and queries in Weaviate Cloud.',
    graphic: '/img/site/book-scale-graphic.svg',
    learnMoreHref: '',
  },
  {
    id: 'hfresh',
    label: 'PREVIEW',
    title: 'HFresh Vector Index',
    description:
      'Deliver high-recall retrieval and dramatically lower memory requirements with innovative indexing algorithm.',
    graphic: '/img/site/book-agentic-graphic.svg',
    learnMoreHref: '',
  },
];

const ABOUT_ITEMS = [
  'Previews are early-access features and may change based on feedback.',
  'Previews do not include SLAs and may have limited support while we iterate.',
  'We may contact preview users for feedback or short check-ins.',
];

export default function SessionsGrid() {
  return (
    <section id="previews" className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {PREVIEWS.map((p) => (
            <article key={p.id} id={`preview-${p.id}`} className={styles.card}>
              <div className={styles.previewHeader}>
                <div className={styles.pill}>{p.label}</div>
              </div>

              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.blurb}>{p.description}</p>

              <div className={styles.actions}>
                <Link
                  className={styles.requestButton}
                  to="#register-interest"
                  onClick={(e) => {
                    e.preventDefault();

                    const url = new URL(window.location.href);
                    url.searchParams.set('preview', p.id);
                    url.hash = 'register-interest';
                    window.history.pushState({}, '', url.toString());

                    requestAnimationFrame(() => {
                      document
                        .getElementById('register-interest')
                        ?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                    });

                    window.dispatchEvent(new Event('previewchange'));
                  }}
                >
                  Request early access
                </Link>

                {p.learnMoreHref ? (
                  <Link className={styles.learnMore} to={p.learnMoreHref}>
                    Learn more
                  </Link>
                ) : null}
              </div>

              {p.graphic ? (
                <div className={styles.graphic}>
                  <img src={p.graphic} alt="" role="presentation" />
                </div>
              ) : null}
            </article>
          ))}
        </div>
        <div className={styles.aboutPanel} aria-label="About product previews">
          <h3 className={styles.aboutTitle}>About product previews</h3>
          <ul className={styles.aboutList}>
            {ABOUT_ITEMS.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
