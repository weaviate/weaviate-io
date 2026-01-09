import React, { useState } from "react";
import { ButtonContainer } from "../../../theme/Buttons";
import styles from "./styles.module.scss";
import { LinkButton } from "/src/theme/Buttons";
import Link from "@docusaurus/Link";

export default function Ebooks() {
  return (
    <div className={styles.bgCol} id="ebooks">
      <div className="container">
        <div className={styles.header}>
          <h2>Ebooks</h2>
          <p>
            In-depth resources to help you deepen your Weaviate knowledge and AI
            concepts.
          </p>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.typeContainer}>
            <Link to="/ebooks/the-context-engineering-guide">
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <div className={`${styles.homeIcon} ${styles.papers}`}></div>
                  <h2>The Context Engineering Guide</h2>
                </div>
                <div className={styles.typeText}>
                  <p>
                    This guide to mastering Context Engineering, the act of
                    designing AI systems that leverage context to enhance
                    performance and reliability.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/ebooks/advanced-rag-techniques">
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <div className={`${styles.homeIcon} ${styles.papers}`}></div>
                  <h2>Advanced RAG Techniques</h2>
                </div>
                <div className={styles.typeText}>
                  <p>
                    A guide on different techniques to improve the performance
                    of your Retrieval-Augmented Generation applications.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/ebooks/agentic-architectures">
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <div className={`${styles.homeIcon} ${styles.papers}`}></div>
                  <h2>
                    Agentic Architectures for Retrieval-intensive Applications
                  </h2>
                </div>
                <div className={styles.typeText}>
                  <p>
                    A comprehensive guide to mastering fundamentals, patterns,
                    and examples of agentic architectures.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/ebooks/choosing-the-right-database-for-AI">
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <div className={`${styles.homeIcon} ${styles.papers}`}></div>
                  <h2>Choosing the Right Database For AI</h2>
                </div>
                <div className={styles.typeText}>
                  <p>
                    Practical tips for indexing, hybrid search, and seamless
                    integration with AI models.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/ebooks/the-ai-strategy-playbook">
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <div className={`${styles.homeIcon} ${styles.papers}`}></div>
                  <h2>The AI Strategy Playbook</h2>
                </div>
                <div className={styles.typeText}>
                  <p>
                    This guide provides a comprehensive framework for developing
                    and implementing AI strategies within organizations.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
