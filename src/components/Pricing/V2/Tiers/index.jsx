import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';
import { PriceCalculator } from '../../PriceCalculator/PriceCalculator';

// Reusable card
function TierCard({
  iconClass,
  title,
  priceLine,
  blurb,
  ctaLabel,
  ctaVariant = 'default', // 'default' | 'premium'
  ctaHref,
  features = [],
}) {
  const btnClass = [
    styles.primaryBtn,
    ctaVariant && styles[`btn_${ctaVariant}`], // maps to .btn_premium, etc.
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        {/* <span
          className={[styles.icon, iconClass].filter(Boolean).join(' ')}
          aria-hidden="true"
        /> */}
        <h3>{title}</h3>
        <div className={styles.priceLine}>{priceLine}</div>
      </header>

      <div className={styles.cardBody}>
        <p className={styles.blurb}>{blurb}</p>

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
        <div className={styles.grid}>
          {/* Flex */}
          <TierCard
            iconClass={styles.iconFlex}
            title="Flex"
            priceLine={
              <>
                <span>Starts at</span> <strong>$75</strong> <span>/mo</span>
              </>
            }
            blurb="Zero-commitment entry point to experiment and ship quickly. Ideal for prototypes, pilots, and small use cases."
            ctaLabel="Get started"
            ctaHref="/go/console"
            features={[
              <>
                {' '}
                <strong>Pay-as-you-go</strong>, monthly.
              </>,
              <>
                {' '}
                <strong>Shared cloud cluster</strong> that delivers Weaviate’s
                full core DB toolkit (hybrid search, replication, dynamic index,
                compression, multi-tenancy).{' '}
              </>,
              <>
                <strong>Baseline security</strong> with RBAC.
              </>,
              <>
                <strong>Various compression techniques</strong>.
              </>,
              <>
                <strong>Highly available clusters</strong> - 99% uptime.
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
            iconClass={styles.iconPlus}
            title="Plus"
            priceLine={
              <>
                <span>Starts at</span> <strong>$XX</strong> <span>/mo</span>
              </>
            }
            blurb="For teams scaling AI in production who need predictable pricing, enterprise security, and enhanced reliability."
            ctaLabel="Get started"
            ctaHref="/go/console"
            features={[
              <>
                <strong>Prepaid contract</strong> with predictable spend.
              </>,
              <>
                <strong>Choice of shared or dedicated deployment</strong> for
                high performance & compliance.
              </>,
              <>
                <strong>Enhanced security:</strong> SSO/SAML (bring-your-own IdP
                is available), HIPAA compliant.
              </>,
              <>
                <strong>Trusted reliability</strong> - 99.5% uptime.
              </>,
              <>
                <strong>Various compression techniques.</strong>
              </>,
              <>
                <strong>Metrics endpoint</strong> for external monitoring.
              </>,
              <>
                <strong>Global coverage</strong> on AWS & GCP (plus Azure for
                dedicated deployments).
              </>,
              <>
                <strong>Enterprise support:</strong> 4-hour Sev-1 response.
              </>,
            ]}
          />

          {/* Premium */}
          <TierCard
            iconClass={styles.iconPremium}
            title="Premium"
            priceLine={null}
            blurb="For teams running mission-critical workloads that require dedicated infra, advanced compliance, and white-glove support."
            ctaLabel="Contact Sales"
            ctaVariant="premium"
            ctaHref="https://www.weaviate.io/contact"
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
                <strong>Highest reliability</strong> - 99.95% uptime.
              </>,
              <>
                <strong>Any region</strong> on AWS, GCP or Azure.
              </>,
              <>
                <strong>White-glove support:</strong> 1-hour Sev-1 response,
                Technical Account Team, and access to training and experts.
              </>,
            ]}
          />
        </div>

        {/* BYOC strip */}
        <div className={styles.byoc}>
          <div className={styles.byocCopy}>
            <h4>Bring Your Own Cloud</h4>
            <p>
              Choose a fully-managed solution or 24/7 support within your VPC
              (BYOC Vector Database).
            </p>
          </div>

          <ul className={styles.byocFeatures}>
            <li>
              <strong>Customer-managed VPC</strong>
            </li>
            <li>
              <strong>Weaviate-managed</strong> control plane
            </li>
            <li>
              <strong>Weaviate agent</strong> for monitoring, support, and
              troubleshooting
            </li>
          </ul>

          <Link className={styles.byocBtn} to="https://www.weaviate.io/contact">
            Contact Sales
          </Link>
        </div>

        <PriceCalculator />
      </div>
    </section>
  );
}
