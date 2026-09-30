import React from "react";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";

export default function Study() {
  return (
    <div className={styles.bgColor}>
      <div className={styles.studyContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.studyContent}>
            <h2>Summary</h2>
            <p>
              <strong>
                Delegance Brokerage is replacing the career insurance broker
                with agentic AI that reads, remembers, and acts on a client's
                entire policy history. Founder Alex Ledbetter built the platform
                on Weaviate in nine months and has grown it to $20M in premium
                under management in under a year, as a team of one.
              </strong>
            </p>
            <h2>The Challenge</h2>
            <p>
              Commercial insurance brokerages are often aging, paperwork-heavy
              businesses built on slow, manual workflows. Alex Ledbetter saw the
              gap while studying economics and English and interning at a global
              commercial insurance brokerage, where he underwrote political risk
              and credit. He set out to build Delegance, an agentic AI system
              that could act as a customer's broker of record by sourcing
              coverage, handling renewals, and answering client questions, while
              passing the cost savings on to customers by cutting broker
              commissions 60%.
            </p>
            <p>
              The catch: Ledbetter is not an engineer, and he would be building
              it alone. After raising $200K from angel investors in February
              2025 and obtaining 190 state insurance licenses in 30 days, he
              spent the next nine months standing up his first backend,
              database, and DevOps pipeline. He chose AWS and learned largely by
              feeding console screenshots to ChatGPT because the coding agents
              he used seemed to know it best.
            </p>
            <p>
              His solution needed to classify, extract, and structure dozens of
              documents from an insurance binder in seconds; maintain a single,
              conversational memory of every client across an MCP server, web,
              mobile, Slack, voice, email, and text; run autonomous workflows
              for policy changes, quote generation, and portfolio reviews; and
              remain buildable and operable by a solo, non-technical founder
              working with AI coding agents.
            </p>
            <h2>Why Weaviate?</h2>
            <p>
              Developers Ledbetter trusted steered him toward a vector database
              for Delegance's agentic and RAG backend. He looked at AWS
              OpenSearch first but found it a nightmare to work with, and chose
              Weaviate for the developer experience it offered his AI coding
              agents.
            </p>
            <ul className={styles.whyWeaviate}>
              <li>
                <strong>Self-serve signup:</strong> Ledbetter could stand up a
                cluster on a startup budget without navigating a sales process.
              </li>
              <li>
                <strong>Headless-first workflow:</strong> He could do everything
                through the API, MCP, and coding agents like Cursor, Claude
                Code, and Codex rather than digging around in consoles.
              </li>
              <li>
                <strong>Schema flexibility:</strong> Weaviate let him capture
                the same relational structure a knowledge graph would, on top of
                vectorized insurance binders.
              </li>
            </ul>
            <h2>What's Next?</h2>
            <p>
              Delegance's next phase is distribution: embedding its AI
              broker-of-record service inside other financial services
              businesses. Ledbetter is targeting banks with in-house brokerages,
              private-equity portfolio companies, and fintech platforms as
              partners, with a goal of surpassing $100M in annual premium and 10
              live distribution partnerships within 18 months. Weaviate stays
              the memory layer underneath as that footprint grows.
            </p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topSection}>
            <h2>Results</h2>
            <h3>Solo Build, Fast</h3>
            <p>
              Delegance went from an idea in February 2025 to a live system with
              customers that November: an eight-month build, completed solo on
              top of Weaviate.
            </p>
            <h3>$20M Under Management, Zero Engineers</h3>
            <p>
              Less than a year after launch, Delegance holds $20M in premium
              under management across 40 accounts, including eight clients with
              more than $500K in annual premium, all run by a team of one.
            </p>
            <h3>Document Intelligence at Human-Beating Speed</h3>
            <p>
              Weaviate powers a document pipeline that classifies, extracts, and
              vectorizes an entire insurance binder in the time it takes a human
              broker to read the cover page.
            </p>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.logo}></div>

            <p>
              <Link to="https://www.delegancebrokerage.com/">
                Delegance Brokerage
              </Link>{" "}
              is an AI-native commercial insurance brokerage founded by Alex
              Ledbetter in September 2023. It acts as a customer's broker of
              record by sourcing coverage, handling renewals, and answering
              client questions while passing its speed and cost savings on to
              customers. Ledbetter raised $200K from angel investors in February
              2025 and secured 190 state insurance licenses in 30 days before
              building the entire platform himself.
            </p>
            <br></br>
            <p className={styles.quote}>
              "Enabling the development and launch of Delegance, from idea to
              first customers, in just a few months and on a start-up budget has
              been incredibly valuable to us. And looking forward, I'm
              completely confident it will scale to meet our rapid growth
              plans."
            </p>
            <br></br>
            <p>
              <strong>- Alex Ledbetter, Founder &amp; CEO, Delegance</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
