import React from "react";
import styles from "./styles.module.scss";

const SESSIONS = [
  {
    id: "rag",
    pill: "RETRIEVAL AUGMENTED GENERATION",
    graphic: "/img/site/book-rag-graphic.svg",
    title: "Build a Production-Ready RAG Application",
    blurb:
      "Go from theory to a functioning RAG pipeline. We’ll help you structure your data, choose the right modules, including Weaviate Embeddings and build a search application that delivers accurate, relevant results.",
    bullets: [
      "Actionable feedback on your schema design.",
      "Best practices for your data chunking and vectorization approach.",
      "Guidance on implementing hybrid search to improve accuracy.",
      "Methods for structuring queries to reduce hallucinations.",
    ],
    roles: ["Developer", "ML engineer"],
    minutes: 30,
  },
  {
    id: "scale",
    pill: "SCALING VECTOR DATABASES",
    graphic: "/img/site/book-scale-graphic.svg",
    title: "Optimize Your Architecture for Scale, Performance & Cost",
    blurb:
      "Ensure your data architecture is built to last. A 30-minute review with our experts can save you weeks of refactoring, performance headaches and unnecessary cost as you scale to millions or billions of objects.",
    bullets: [
      "A live review of your schema with recommendations for scaling.",
      "Guidance on choosing the right sharding and replication strategy.",
      "Recommendations for index and compression settings (HNSW, HFresh, RQ) to balance speed and cost.",
      "Methods for identifying and resolving common scaling anti-patterns.",
    ],
    roles: ["Developer", "ML engineer", "Architect"],
    minutes: 30,
  },
  {
    id: "agentic",
    pill: "BUILDING AGENTIC ARCHITECTURES",
    graphic: "/img/site/book-agentic-graphic.svg",
    title: "Build Agents with Weaviate",
    blurb:
      "Give your AI agents reliable access to your data. We'll help you decide how your agents work with Weaviate, from the built-in Query Agent to connecting agents and AI coding assistants through MCP, so they find the right context for each step. What you'll leave with:",
    bullets: [
      "Guidance on when to use Weaviate's Query Agent and when to build your own retrieval.",
      "How to connect your agents and AI coding assistants to Weaviate through MCP and agent skills.",
      "Data modeling for agents: collections, metadata and filters that keep context accurate.",
      "Best practices for reliable context retrieval in multi-step agent workflows.",
    ],
    roles: ["Developer", "AI engineer"],
    minutes: 30,
  },
];

export default function SessionsGrid() {
  return (
    <section id="sessions" className={styles.wrap}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>Choose Your Expert Session</h2>
          <p>
            Choose your challenge, pick a time that works for you, and solve it
            one-on-one with a Weaviate expert.
          </p>
        </header>

        <div className={styles.grid}>
          {SESSIONS.map((s) => (
            <article key={s.id} id={`session-${s.id}`} className={styles.card}>
              <div className={styles.pill}>{s.pill}</div>

              <div className={styles.graphic}>
                <img src={s.graphic} alt="" role="presentation" />
              </div>

              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.blurb}>{s.blurb}</p>

              <div className={styles.subhead}>What you’ll leave with:</div>
              <ul className={styles.list}>
                {s.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>

              <div className={styles.footerBlock}>
                <div className={styles.roles}>
                  {s.roles.map((r) => (
                    <span key={r} className={styles.roleBadge}>
                      {r}
                    </span>
                  ))}
                </div>

                <div className={styles.time}>
                  <div className={styles.clock} aria-hidden="true"></div>
                  {s.minutes} min
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
