import React from "react";
import styles from "./styles.module.scss";

function AddonCard({
  variant = "green",
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
            {priceItems.map((it) => (
              <li key={it.label}>
                <div className={styles.priceLabel}>{it.label}</div>
                <div className={styles.priceValue}>
                  <strong>{it.price}</strong>{" "}
                  <span className={styles.unit}>{it.unit}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        {bulletItems?.length ? (
          <ul className={styles.bullets}>
            {bulletItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : null}

        {cta?.href && (
          <a className={styles.cta} href={cta.href}>
            {cta.label ?? "Learn more"}
          </a>
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
          <h2 id="addons-heading">Database AI Services</h2>
          <p>
            Native services that run inside Weaviate Cloud — included on every
            plan, billed by usage.
          </p>
        </div>

        <div className={styles.grid}>
          <AddonCard
            variant="green"
            title="Weaviate Embeddings"
            blurb="Access embedding models hosted in Weaviate Cloud. Simple, pay-as-you-go, GPU-powered."
            priceItems={[
              {
                label: "SNOWFLAKE ARCTIC-EMBED-M-V1.5",
                price: "$0.025",
                unit: "/ 1M tokens",
              },
              {
                label: "SNOWFLAKE ARCTIC-EMBED-M-V2.0",
                price: "$0.040",
                unit: "/ 1M tokens",
              },
              {
                label: "MODERNVBERT COLMODERNVBERT",
                price: "$0.065",
                unit: "/ 1M tokens",
              },
            ]}
            cta={{ href: "/product/embeddings", label: "Learn more" }}
          />

          <AddonCard
            variant="purple"
            title="Weaviate Query Agent"
            blurb="Turn natural-language questions into precise Weaviate database operations."
            bulletItems={[
              <>
                <strong>Free to try</strong> — 1,000 requests / month
              </>,
              <>
                <strong>$30</strong> / organization · monthly plan
              </>,
              <>
                <strong>4,000 requests</strong> included
              </>,
              <>Unlimited additional requests, usage-based</>,
            ]}
            cta={{ href: "/product/query-agent", label: "Learn more" }}
          />
        </div>
      </div>
    </section>
  );
}
