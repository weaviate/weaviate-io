import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';

function TierCard({
  iconClass,
  title,
  priceLine,
  blurb,
  ctaLabel,
  ctaVariant = 'default', // 'default' | 'premium' | 'trial'
  ctaHref,
  features = [],
  variant, // 'free' | 'flex' | 'plus' | 'premium'
}) {
  const btnClass = [
    styles.primaryBtn,
    ctaVariant && styles[`btn_${ctaVariant}`],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={[styles.card, variant && styles[`v_${variant}`]]
        .filter(Boolean)
        .join(' ')}
    >
      <header className={styles.cardHeader}>
        {/* <span className={[styles.icon, iconClass].filter(Boolean).join(' ')} aria-hidden="true" /> */}
        <h3>{title}</h3>
        {priceLine ? <div className={styles.priceLine}>{priceLine}</div> : null}
      </header>

      <div className={styles.cardBody}>
        {blurb && <p className={styles.blurb}>{blurb}</p>}

        <Link className={btnClass} to={ctaHref}>
          {ctaLabel}
        </Link>
      </div>

      <hr className={styles.divider} />

      <ul className={styles.features}>
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </article>
  );
}

export default function PricingTiers() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={`${styles.grid} ${styles.grouped}`}>
          {/* Free Trial */}
          <TierCard
            variant="free"
            iconClass={styles.iconTrial}
            title="Free Trial"
            priceLine={null}
            blurb="Fully managed Vector Database in shared cloud. The easiest way to get started with Weaviate."
            ctaLabel="Try Free"
            ctaVariant="trial"
            ctaHref="/go/console"
            features={[
              <>
                <strong>Free 14-day trial</strong>, then{' '}
                {'pay\u2011as\u2011you\u2011go'}, monthly instant,{' '}
                {'no\u2011commit'} entry point.
              </>,
              <>
                <strong>Sandbox cluster</strong> that delivers Weaviate’s full
                core DB toolkit (hybrid search, dynamic index, compression,
                multi-tenancy).
              </>,
              <>
                <strong>Baseline security</strong> with RBAC.
              </>,
              <>
                <strong>Various compression techniques.</strong>
              </>,
              <>
                <strong>Compression by default.</strong>
              </>,
              <>
                <strong>Support</strong> via Community Slack and Weaviate Forum.
              </>,
            ]}
          />

          {/* Flex */}
          <TierCard
            variant="flex"
            iconClass={styles.iconFlex}
            title="Flex"
            priceLine={
              <>
                <span>Starts at</span> <strong>$45</strong> <span>/mo</span>
              </>
            }
            blurb="Zero-commitment entry point to experiment and ship quickly. Ideal for prototypes, pilots, and small use cases."
            ctaLabel="Get started"
            ctaHref="/go/console"
            ctaVariant="flex"
            features={[
              <>
                <strong>{'Pay\u2011as\u2011you\u2011go'}</strong>, monthly
                instant, {'no\u2011commit'} entry point.
              </>,
              <>
                <strong>Shared cloud cluster</strong> that delivers Weaviate’s
                full core DB toolkit (hybrid search, replication, dynamic index,
                compression, multi-tenancy).
              </>,
              <>
                <strong>Baseline security</strong> with RBAC.
              </>,
              <>Various compression techniques.</>,
              <>
                <strong>Highly available clusters</strong> – 99.5% uptime.
              </>,
              <>
                <strong>Compression by default.</strong>
              </>,
              <>
                <strong>Email support</strong>, next-business-day Severity 1
                response.
              </>,
            ]}
          />

          {/* Plus */}
          <TierCard
            variant="plus"
            iconClass={styles.iconPlus}
            title="Plus"
            priceLine={
              <>
                <span>Starts at</span> <strong>$280</strong> <span>/mo</span>
              </>
            }
            blurb="For teams scaling AI in production who need predictable pricing, enterprise security, and enhanced reliability."
            ctaLabel="Contact Sales"
            ctaVariant="plus"
            ctaHref="#contact-sales"
            features={[
              <>
                <strong>Prepaid contract</strong> with predictable spend.
              </>,
              <>
                <strong>Choice of shared or dedicated deployment</strong> for
                high performance &amp; compliance.
              </>,
              <>
                <strong>Enhanced security:</strong> SSO/SAML (bring-your-own IdP
                is available), HIPAA compliant.
              </>,
              <>
                <strong>Trusted reliability</strong> - 99.9% uptime.
              </>,
              <>
                <strong>Various compression techniques.</strong>
              </>,
              <>
                <strong>Metrics endpoint</strong> for external monitoring.
              </>,
              <>
                <strong>Global coverage</strong> on AWS &amp; GCP (plus Azure
                for dedicated deployments).
              </>,
              <>
                <strong>Enterprise support:</strong> 4-hour Severity 1 response.
              </>,
            ]}
          />

          {/* Premium */}
          <TierCard
            variant="premium"
            iconClass={styles.iconPremium}
            title="Premium"
            priceLine={null}
            blurb="For teams running mission-critical workloads that require dedicated infra, advanced compliance, and white-glove support."
            ctaLabel="Contact Sales"
            ctaVariant="premium"
            ctaHref="#contact-sales"
            features={[
              <>
                <strong>Prepaid contract</strong> with predictable spend.
              </>,
              <>
                <strong>Fully dedicated infrastructure</strong> for
                mission-critical workloads and strict compliance needs.
              </>,
              <>
                <strong>Premium security:</strong> RBAC, SSO/SAML, PrivateLink
                (AWS), Bring Your Own Key, bring-your-own IdP, HIPAA compliant.
              </>,
              <>
                <strong>Highest reliability</strong> – 99.95% uptime.
              </>,
              <>
                <strong>Various compression techniques.</strong>
              </>,
              <>
                <strong>Metrics endpoint</strong> for external monitoring.
              </>,
              <>
                <strong>Any region</strong> on AWS, GCP or Azure.
              </>,
              <>
                <strong>White-glove support:</strong> 1-hour Severity 1
                response, Technical Account Team, and access to training and
                experts.
              </>,
            ]}
          />
        </div>
      </div>
    </section>
  );
}
