import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function Study() {
  return (
    <div className={styles.bgColor}>
      <div className={styles.studyContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.studyContent}>
            <h2>Summary</h2>
            <p className={styles.boldText}>
              MetaBuddy partnered with Weaviate to power its personalized health
              and fitness platform, enabling natural-language coaching, unified
              wellness data, and proactive insights. By combining Weaviate
              vector database with Query Agent, MetaBuddy accelerated feature
              delivery, increased user engagement, and freed trainers from
              manual analysis—without adding infrastructure complexity.
            </p>
            <h2>Challenge</h2>

            <strong>MetaBuddy needed to:</strong>
            <ul>
              <li>
                <strong>Unify fragmented data</strong> spread across nutrition,
                workouts, sleep, and activity systems.
              </li>
              <li>
                <strong>Move beyond a static UX</strong> of filters, dashboards,
                and dropdowns.
              </li>
              <li>
                <strong>Reduce manual analysis</strong> that consumed trainers’
                time.
              </li>
              <li>
                <strong>Trigger truly personalized guidance</strong> based on
                dynamic thresholds and evolving user context.
              </li>
            </ul>
            <h2>Solution: Weaviate Vector Database + Query Agent</h2>
            <p>
              MetaBuddy integrated a Weaviate vector database with Query Agent
              to deliver semantic search and LLM-powered reasoning over
              structured health data.
            </p>
            <strong>Key implementations</strong>
            <ul>
              <li>
                <strong>Nutrition & food image scanning</strong>
              </li>

              <li>
                <strong>Workout & progress tracking</strong>
              </li>
              <li>
                <strong>Natural-language interface</strong> for AI-driven
                coaching
              </li>
              <li>
                <strong>Proactive health monitoring </strong>with
                threshold-based alerts and insights
              </li>
            </ul>
            <h2>Why MetaBuddy chose Weaviate</h2>
            <ul>
              <li>
                <strong>Out-of-the-box semantic search</strong> across
                structured health data
              </li>
              <li>
                <strong>Multimodal support</strong> (text, images, metrics)
              </li>
              <li>
                <strong>Seamless LLM integration</strong> for reasoning and
                summaries
              </li>
              <li>
                <strong>Performance & scalability</strong> for thousands of
                users
              </li>
              <li>
                <strong>Flexibility</strong> to build custom AI agents on top of
                the same data foundation
              </li>
            </ul>

            <h2>What's Next?</h2>
            <p>
              With Weaviate handling semantic retrieval and Query Agent
              orchestrating intelligent queries, MetaBuddy can continue
              expanding coaching features and data sources while maintaining a
              responsive, conversational experience for a growing user base.
            </p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topSection}>
            <h2 className={styles.white}>Results</h2>
            <h2>🚀 Increased engagement</h2>
            <p>
              Users interact <strong>3×</strong> more often through
              conversational queries than with the traditional UI.
            </p>
            <h2>⏱️ Trainer efficiency</h2>
            <p>
              Analysis time reduced by <strong>60%</strong>, letting trainers
              focus on high-value coaching.
            </p>
            <h2>🧠 Smarter guidance</h2>
            <p>
              Personalized insights are triggered automatically from real-time
              thresholds.
            </p>
            <h2>🔍 Unified data intelligence</h2>
            <p>
              Nutrition, workout, sleep, and other metrics are integrated into a
              single semantic system.
            </p>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.logo}></div>

            <p>
              <Link to="https://metabuddy.app/">MetaBuddy</Link> is a unified,
              end-to-end fitness ecosystem for people, teams, and companies.
              Connect your wearables, track progress in real time, and chat with
              an AI Nutrition Assistant. Run events and competitions with
              automated registration, scheduling, and leaderboards. Empower
              certified trainers with a free portal to build programs and
              monitor clients. A corporate wellness hub fosters engagement and
              healthier workforces, plus vibrant communities for shared
              motivation.
            </p>
          </div>
          <div className={`${styles.bottomSection} ${styles.navy}`}>
            <div className={styles.avatar}></div>
            <p className={styles.quote}>
              “Weaviate’s Query Agent allowed us to unify our users’ wellness
              data into a single intelligent interface. Our users love the
              natural language interactions, and our trainers now have a
              powerful tool to personalize coaching at scale.”
            </p>
            <p className={styles.name}>Waseem Sarwar,</p>
            <span>Product Lead, MetaBuddy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
