import React from "react";
import styles from "./styles.module.scss";
import databasePlans from "../data/databasePlans";
import engramPlans from "../data/engramPlans";

function TierCard({ plan }) {
  const {
    variant,
    featured,
    badge,
    badgeType,
    title,
    price,
    priceStrike,
    priceSuffix,
    eyebrow,
    meta,
    blurb,
    ctaLabel,
    ctaHref,
    ctaVariant,
    offer,
    features = [],
  } = plan;

  return (
    <article
      className={[
        styles.tier,
        featured && styles.feature,
        variant && styles[`v_${variant}`],
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {badge && (
        <span
          className={[
            styles.badge,
            badgeType === "green" ? styles.badgeGreen : styles.badgePurple,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          ✦ {badge}
        </span>
      )}

      <h3>{title}</h3>

      <div className={styles.price}>
        {eyebrow && <span className={styles.from}>{eyebrow}</span>}
        {priceStrike && (
          <s style={{ opacity: 0.5, fontWeight: 400, marginRight: "6px" }}>
            {priceStrike}
          </s>
        )}
        {price}
        {priceSuffix && <small> {priceSuffix}</small>}
      </div>

      {meta && <div className={styles.meta}>{meta}</div>}

      <p className={styles.blurb}>{blurb}</p>

      <a
        href={ctaHref}
        className={[
          styles.btn,
          ctaVariant === "primary" ? styles.btnPrimary : styles.btnGhost,
        ].join(" ")}
      >
        {ctaLabel}
      </a>

      {offer && (
        <div className={styles.offer}>
          <strong>{offer.title}</strong>
          <span>{offer.text}</span>
        </div>
      )}

      <hr />

      <ul className={styles.features}>
        {features.map((feature) => (
          <li key={feature}>
            <span className={styles.check}>✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function PricingTiers({ product = "serverless" }) {
  const isEngram = product === "engram";
  const plans = isEngram ? engramPlans : databasePlans;

  return (
    <section className={styles.section}>
      <div className={styles.tiers}>
        {plans.map((plan) => (
          <TierCard key={plan.title} plan={plan} />
        ))}
      </div>
    </section>
  );
}
