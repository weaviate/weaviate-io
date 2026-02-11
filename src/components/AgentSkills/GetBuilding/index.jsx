import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';

export default function AgentSkillsGetBuilding() {
  return (
    <section className={styles.wrap} id="get-building">
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.header}>
            <h2>Get building in minutes</h2>
            <p>
              Choose a starting path—spin up a Cloud cluster, install skills
              locally, or jump straight into a cookbook workflow.
            </p>
          </div>

          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.step}>01</span>
                <h3>Create a Weaviate Cloud cluster</h3>
              </div>

              <p>
                Start fast with a managed cluster so you can focus on your agent
                workflow—not setup and operations.
              </p>

              <div className={styles.actions}>
                <Link
                  className={styles.buttonGradient}
                  to="https://console.weaviate.cloud/signup"
                >
                  Start free on Cloud
                </Link>
                <Link className={styles.link} to="/pricing">
                  View plans
                </Link>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.step}>02</span>
                <h3>Install skills locally</h3>
              </div>

              <p>
                Use the CLI to add skills quickly during development. Great for
                testing, demos, and repeatable local setup.
              </p>

              <div className={styles.codeChip}>
                <code>npx add skills</code>
              </div>

              <div className={styles.actions}>
                <Link
                  className={styles.buttonOutline}
                  to="https://github.com/weaviate/weaviate-cli"
                >
                  View Weaviate CLI
                </Link>
                <Link
                  className={styles.link}
                  to="https://github.com/weaviate/agent-skills"
                >
                  View Agent Skills repo
                </Link>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.step}>03</span>
                <h3>Pick a cookbook</h3>
              </div>

              <p>
                Copy end-to-end workflows for real apps—like a Query Agent App
                or extreme PDF ingestion. Keep prompts small, then customize the
                frontend.
              </p>

              <div className={styles.actions}>
                <Link className={styles.buttonOutline} to="#cookbook">
                  Explore cookbooks
                </Link>
                <Link
                  className={styles.link}
                  to="https://github.com/weaviate/weaviate-prompts"
                >
                  Browse prompt library
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.footerRow}>
            <div className={styles.footerCopy}>
              <h4>Want the short-form walkthroughs?</h4>
              <p>
                We’re publishing companion blog posts with copy-ready prompts,
                architecture notes, and deployment demos.
              </p>
            </div>

            <div className={styles.footerActions}>
              <Link className={styles.buttonOutline} to="/blog">
                Read the blog
              </Link>
              <Link className={styles.buttonOutline} to="#cookbook">
                Browse recipes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
