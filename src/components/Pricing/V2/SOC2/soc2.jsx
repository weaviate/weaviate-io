import React from "react";
import styles from "./styles.module.scss";

function TrustCard({ badge, title, text, link }) {
  return (
    <article className={styles.card}>
      <div className={styles.badge}>{badge}</div>

      <div className={styles.content}>
        <h3>{title}</h3>

        <p>
          {text}

          {link && (
            <>
              {" "}
              <a href={link.href}>{link.label}</a>
            </>
          )}
        </p>
      </div>
    </article>
  );
}

export default function SecurityCompliance() {
  return (
    <section className={styles.section} aria-labelledby="trust-heading">
      <div className="container">
        <div className={styles.header}>
          <h2 id="trust-heading">Built for trust</h2>
        </div>

        <div className={styles.grid}>
          <TrustCard
            badge="SOC2"
            title="SOC 2 Type II"
            text="Independently audited via Drata. See our"
            link={{
              href: "https://trust.weaviate.io/",
              label: "Trust Portal.",
            }}
          />

          <TrustCard
            badge="HIPAA"
            title="HIPAA compliant"
            text="Available on Enterprise Cloud (AWS) for regulated healthcare workloads."
          />
        </div>
      </div>
    </section>
  );
}
