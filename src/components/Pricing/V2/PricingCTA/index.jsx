import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";

const copy = {
  database: {
    title: "Start building on Weaviate Cloud today",
    logo: null,
  },
  engram: {
    title: "Give your agents memory that works in production",
    logo: "/img/site/2026/engram-cta-logo.svg",
  },
};

export default function PricingCTA({ product = "database" }) {
  const cta = copy[product] || copy.database;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.veil} />

          <div
            className={`${styles.inner} ${
              cta.logo ? styles.withLogo : styles.noLogo
            }`}
          >
            {cta.logo && (
              <div className={styles.logoBox}>
                <img src={cta.logo} alt="Engram logo" />
              </div>
            )}

            <h2>{cta.title}</h2>

            <Link to="https://console.weaviate.io" className={styles.button}>
              Get started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
