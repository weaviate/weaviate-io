import React from 'react';
import styles from './styles.module.scss';

const STEPS = [
  {
    title: 'Create or log in to Weaviate Console',
    body: 'Use the email you want the deal applied to.',
    cta: { label: 'Open Console', href: 'https://console.weaviate.cloud' },
  },
  {
    title: 'Complete your account settings',
    body: 'Ensure your organization and relevant details are filled out.',
  },
  {
    title: 'Submit the redemption form',
    body: 'Use the same email address as your Weaviate Console account.',
    scrollToForm: true,
  },
  {
    title: 'We activate your deal',
    body: 'Our team will validate the request and apply the deal to your account.',
  },
];

export default function HowItWorks() {
  const handleScrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('redemptionForm');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={styles.wrap}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2>How it works</h2>
          <p>
            Follow these steps to redeem your startup deal for Weaviate Cloud.
          </p>
        </div>

        <ol className={styles.steps}>
          {STEPS.map((s, idx) => (
            <li className={styles.step} key={s.title}>
              <div className={styles.index}>{idx + 1}</div>

              <div className={styles.content}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>

                {s.cta?.href && (
                  <a
                    className={styles.link}
                    href={s.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.cta.label} →
                  </a>
                )}

                {s.scrollToForm && (
                  <a
                    href="#redemptionForm"
                    className={styles.link}
                    onClick={handleScrollToForm}
                  >
                    Submit the redemption form →
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
