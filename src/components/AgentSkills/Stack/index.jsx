import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';

export default function AgentSkillsStack() {
  return (
    <section className={styles.bgColor} id="agent-stack">
      <div className="container">
        <div className={styles.diagramBox}>
          <div className={styles.header}>
            <span className={styles.kicker}>How it fits together</span>
            <h2>The agent development stack</h2>
            <p>
              Agent Skills are platform-agnostic. Use them in Claude Code,
              Cursor, Cloud Code, or any compatible agent runtime. Cookbooks
              stay focused on core Weaviate logic—frontends are separate so
              prompts remain small and customizable.
            </p>
          </div>

          <div className={styles.content}>
            <div className={styles.leftContent}>
              <div className={styles.item}>
                <span>Prompt Library</span>
                <p>
                  A single source of truth for prompts that can be referenced by
                  docs, cloud console, cookbooks, and agent skills.
                </p>
                <Link
                  className={styles.inlineLink}
                  to="https://github.com/weaviate/weaviate-prompts"
                >
                  View weaviate-prompts →
                </Link>
              </div>

              <div className={styles.item}>
                <span>Cookbooks (End-to-End)</span>
                <p>
                  Practical workflows built on proven Weaviate
                  patterns—uploading, chunking, embedding, and querying.
                </p>
                <Link className={styles.inlineLink} to="#cookbook">
                  Explore cookbooks →
                </Link>
              </div>

              <div className={styles.item}>
                <span>Skills</span>
                <p>Install and run skills quickly during development.</p>
                <div className={styles.miniCode}>
                  <code>npx add skills</code>
                </div>
              </div>

              <div className={styles.item}>
                <span>Frontend (Optional)</span>
                <p>
                  Frontends are intentionally separate. Start with a standard
                  UI, then let the agent scaffold and customize it for your use
                  case.
                </p>
              </div>
            </div>

            <div className={styles.rightContent} aria-hidden="true">
              {/* Swap this to your final diagram whenever ready */}
              <div className={styles.diagram} />
              <div className={styles.diagramCaption}>
                Prompts → Cookbooks → Skills → Your App
              </div>
            </div>

            <div className={styles.bottomContent}>
              <h3 className={styles.getStarted}>
                Ready to build? Start with the cookbook, then install skills
                locally.
              </h3>

              <div className={styles.buttons}>
                <Link className={styles.buttonGradient} to="#get-building">
                  Install Skills
                </Link>
                <Link
                  className={styles.buttonOutline}
                  to="https://github.com/weaviate/weaviate-prompts"
                >
                  Prompt library
                </Link>
                <Link className={styles.buttonOutline} to="#cookbook">
                  Explore cookbooks
                </Link>
              </div>

              <p className={styles.subtext}>
                Works with Claude Code, Cursor, Cloud Code, and other agent
                runtimes that support the Agent Skills format.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
