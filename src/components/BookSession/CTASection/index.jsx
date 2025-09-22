import React from 'react';
import styles from './styles.module.scss';

export default function CTASection({
  title = 'Ready to Solve Your Challenge?',
  subtitle = 'Find a time that works for you. Sessions are free and confidential.',
  ctaLabel = 'Book Your Free Session',
  ctaHref = '#top-scheduler',
  bullets = [
    'Direct access to a Weaviate engineer who works on the product.',
    'We’ll dive into your specific use case, schema, and queries.',
    'Leave with a clear plan to solve your technical problem.',
    'This is a 100% technical consultation, not a sales call.',
  ],
}) {
  return (
    <section className={styles.wrap} aria-labelledby="cta-title">
      <div className={styles.inner}>
        <div className={styles.left}>
          <h3 id="cta-title">{title}</h3>
          <p className={styles.sub}>{subtitle}</p>
          <a className={styles.button} href={ctaHref}>
            {ctaLabel}
          </a>
        </div>

        <ul className={styles.list}>
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
