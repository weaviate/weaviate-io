import Link from "@docusaurus/Link";
import React from "react";
import TrustedBy from "/src/components/HomeNext/sections/TrustedBy";
import styles from "./styles.module.scss";

const benefits = [
  {
    icon: "/img/site/2026/build.svg",
    title: "Take search to new heights",
    description:
      "Use built-in vector and keyword search for contextual, precise results across any type of data—at scale.",
  },
  {
    icon: "/img/site/2026/extract.svg",
    title: "Accelerate RAG and Gen AI projects",
    description:
      "Create embeddings with Weaviate Embeddings, or connect the models and frameworks you already use.",
  },
  {
    icon: "/img/site/2026/secure.svg",
    title: "Deploy quickly, securely, and confidently",
    description:
      "Run on Shared Cloud, or on Dedicated Cloud for your own dedicated infrastructure.",
  },
];

export default function Introduction({
  heading = "Fully managed, AI-native vector database",
}) {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logoBox}>
            <img src="/img/site/weaviate-logo-flat.svg" alt="" />
            <span>Weaviate Cloud</span>
          </div>
          <h1>{heading}</h1>
          <p className={styles.intro}>
            All the power of our open-source vector database, without the burden
            of self-hosting.
          </p>

          <div className={styles.benefits}>
            {benefits.map((benefit) => (
              <div className={styles.benefit} key={benefit.title}>
                <img src={benefit.icon} alt="" />
                <div>
                  <h2>{benefit.title}</h2>
                  <p>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.signup}>
          <p className={styles.eyebrow}>Weaviate Cloud</p>
          <h2>The AI database for a new generation of software</h2>
          <p>Get started for free</p>
          <Link to="/go/console" className={styles.button}>
            Try Now
          </Link>
          <p className={styles.contact}>
            Have questions about pricing? <Link to="/contact">Contact us</Link>
          </p>
        </div>
      </div>
      <TrustedBy />
    </main>
  );
}
