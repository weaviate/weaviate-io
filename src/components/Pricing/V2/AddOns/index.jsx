import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';

function AddonCard({
  variant = 'green',
  title,
  blurb,
  bulletItems,
  priceItems,
  cta,
}) {
  return (
    <article className={`${styles.card} ${styles[`v_${variant}`]}`}>
      <div className={styles.cardInner}>
        <header className={styles.cardHeader}>
          <h3>{title}</h3>
          {blurb && <p className={styles.blurb}>{blurb}</p>}
        </header>

        {priceItems?.length ? (
          <ul className={styles.priceList}>
            {priceItems.map((it, i) => (
              <li key={i}>
                <div className={styles.priceLabel}>{it.label}</div>
                <div className={styles.priceValue}>
                  <strong>{it.price}</strong>{' '}
                  <span className={styles.unit}>{it.unit}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        {bulletItems?.length ? (
          <ul className={styles.bullets}>
            {bulletItems.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        ) : null}

        {cta?.href && (
          <div className={styles.ctaRow}>
            <Link className={styles.cta} to={cta.href}>
              {cta.label ?? 'Learn more'}
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

export default function AddOnsSection() {
  return (
    <section className={styles.section} aria-labelledby="addons-heading">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 id="addons-heading" className={styles.title}>
            Explore Add-ons
          </h2>
        </div>

        <div className={styles.grid}>
          <AddonCard
            variant="green"
            title="Weaviate Embeddings"
            blurb="Access various embedding models hosted in Weaviate Cloud."
            priceItems={[
              {
                label: 'SNOWFLAKE ARCTIC-EMBED-M-V1.5',
                price: '$0.025',
                unit: '/ 1M tokens',
              },
              {
                label: 'SNOWFLAKE ARCTIC-EMBED-M-V2.0',
                price: '$0.040',
                unit: '/ 1M tokens',
              },
            ]}
            cta={{ href: '/embeddings', label: 'Learn more' }}
          />

          <AddonCard
            variant="lilac"
            title="Weaviate Agents"
            blurb="Empower AI agents with the context and adaptability they need."
            priceItems={[
              {
                label: 'SNOWFLAKE ARCTIC-EMBED-M-V1.5',
                price: '$0.025',
                unit: '/ 1M tokens',
              },
              {
                label: 'SNOWFLAKE ARCTIC-EMBED-M-V2.0',
                price: '$0.040',
                unit: '/ 1M tokens',
              },
            ]}
            cta={{ href: '/agents', label: 'Learn more' }}
          />

          <AddonCard
            variant="teal"
            title="Training & Enablement"
            blurb="Get courses, resources, and support for builders of all levels."
            bulletItems={[
              'Onboarding packages',
              'Enterprise support',
              'Free on-demand learning',
              'Live training',
            ]}
            cta={{ href: '/training', label: 'Learn more' }}
          />
        </div>
      </div>
    </section>
  );
}
