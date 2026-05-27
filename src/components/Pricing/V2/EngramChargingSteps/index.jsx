import React from "react";
import styles from "./styles.module.scss";

const steps = [
  {
    title: "You send data",
    text: (
      <>
        Each <code>POST /memories</code> call is one pipeline run, no matter how
        long the conversation.
      </>
    ),
  },
  {
    title: "Engram processes it",
    text: "The pipeline extracts facts, reconciles against existing memories, and commits — all in the background.",
  },
  {
    title: "You're billed per run",
    text: "Flat per-run rate. Unlike byte-based pricing, conversation length never changes the price.",
  },
  {
    title: "Overage auto-tops up",
    text: "Past your monthly runs, Starter & Team auto-topup at the per-run rate — the service never stops.",
  },
];

export default function EngramChargingSteps() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <p>How charging works</p>
          <h2>One run, one charge — no payload surcharge</h2>
        </div>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <article className={styles.step} key={step.title}>
              <div className={styles.number}>{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
