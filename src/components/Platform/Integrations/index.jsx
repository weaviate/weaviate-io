import Link from "@docusaurus/Link";
import React from "react";
import styles from "./styles.module.scss";

const logos = [
  {
    className: "logoGoogle",
    to: "https://docs.weaviate.io/weaviate/model-providers/google",
  },
  {
    className: "logoCo",
    to: "https://docs.weaviate.io/weaviate/model-providers/cohere/embeddings",
  },
  {
    className: "logoAI",
    to: "https://docs.weaviate.io/weaviate/model-providers/openai/embeddings",
  },
  {
    className: "logoH",
    to: "https://docs.weaviate.io/weaviate/model-providers",
  },
  {
    className: "logoHaystack",
    to: "https://haystack.deepset.ai/integrations/weaviate-document-store",
  },
  {
    className: "logoStreamlit",
    to: "https://github.com/weaviate/st-weaviate-connection",
  },
];

const loopedLogos = [...logos, ...logos];

export default function Integrations() {
  return (
    <section className={styles.integrationsSection}>
      <div className="container">
        <div className={styles.heading}>
          <h2>20+ Ecosystem Integrations</h2>
          <p>Move faster with direct integration into the ML ecosystem.</p>
        </div>
      </div>

      <div className={styles.integrationsLogos}>
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />

        <div className={styles.logoTrack}>
          {loopedLogos.map((logo, index) => (
            <Link key={`${logo.className}-${index}`} to={logo.to}>
              <div className={styles.logoBg}>
                <span className={styles[logo.className]} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="container">
        <div className={styles.quoteCard}>
          <div className={styles.quoteInner}>
            <h3>
              “Weaviate&apos;s batteries-included approach, incorporating both
              model serving and multi-tenancy, has helped us quickly prototype
              and build our vector search at Stack.”
            </h3>

            <p>Constantine Kokkinos, Stack Overflow</p>

            <Link className={styles.buttonGradient} to="/go/console">
              Start Building with Weaviate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
