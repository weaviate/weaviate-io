import React from "react";
import styles from "./styles.module.scss";

export default function PricingHeader({ selectedType, onSelect }) {
  return (
    <header className={styles.header} role="banner">
      <div className="container">
        <div className={styles.box}>
          <h1 className={styles.title}>
            Weaviate Pricing
          </h1>

          <p className={styles.subtitle}>
            {selectedType === "self-managed" ? "Run Weaviate on your own infrastructure. Start free and explore the edition that fits your needs." : "All the power your AI needs, without the overhead."}
          </p>

          <div className={styles.toggle} role="group" aria-label="Deployment pricing">
            {[['managed', 'Fully managed Cloud'], ['self-managed', 'Self-managed']].map(([id,label]) => (
              <button key={id} type="button" aria-pressed={selectedType === id} className={selectedType === id ? styles.active : ''} onClick={() => onSelect(id)}>{label}</button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
