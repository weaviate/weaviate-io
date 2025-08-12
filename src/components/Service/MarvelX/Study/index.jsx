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
              MarvelX AI agents, powered by Weaviate, handle high-volume,
              high-stakes insurance workflows, delivering rapid claims
              processing with better-than-human accuracy. This enables their
              customers to scale efficiently while maintaining control over data
              security.
            </p>
            <h2>Challenge</h2>
            <p>
              Insurance and related financial institutions struggle with manual,
              repetitive workflows that slow down service, impair the customer
              experience, and limit scalability. Many still rely on tools like
              spreadsheets and outdated software, resulting in process
              bottlenecks and human error, especially as scale increases. For
              these businesses, high accuracy, speed, and reliability are
              non-negotiable, as any slip in performance directly affects
              customer satisfaction and operational costs.
            </p>

            <h2>Why Weaviate</h2>
            <p>MarvelX had the following requirements for a vector database:</p>
            <ul>
              <li>
                <strong>Speed and scalability:</strong> Their system needed to
                process large volumes of claims in real time, with Weaviate’s
                speed significantly outperforming competitors.
              </li>
              <li>
                <strong>Multi-tenant security:</strong> With roots in digital
                banking and strict enterprise requirements, trust in data
                integrity and security was critical.
              </li>
              <li>
                <strong>Multimodal search:</strong> They needed to store and
                search across multiple data types–like policies, invoices,
                attachments–to support advanced similarity checks and contextual
                matching.
              </li>
              <li>
                <strong>Support and partnership:</strong> Positive interactions
                and ongoing innovation with the Weaviate team supported
                MarvelX’s fast-moving product development.
              </li>
            </ul>
            <p>
              “Before MarvelX, I implemented Weaviate in banking where security
              was really important. Being able to have trust in something battle
              tested is very important. We also benchmarked multiple options and
              Weaviate’s speed blew the others out of the water. It wasn’t even
              close. As both our workload and customer base grew, the benefits
              just compounded,” notes el Hassouni.
            </p>

            <h2>Solution</h2>
            <p>
              Marvel AI uses Weaviate as a foundation for their autonomous agent
              platform, allowing them to deliver:
            </p>

            <ul>
              <li>
                <strong>AI-driven claims automation:</strong> Deployed agents
                accurately handle claims end-to-end with accuracy comparable or
                superior to scaled human operations.
              </li>
              <li>
                <strong>Superior speed:</strong> Weaviate allowed MarvelX to
                process claims in seconds.
              </li>
              <li>
                <strong>Longtail coverage:</strong> Through iterative feedback
                loops with subject matter experts (SMEs), MarvelX’s AI agents
                address rare and nuanced use cases, allowing more of the
                workflow to be reliably automated over time.
              </li>
              <li>
                <strong>Enterprise-grade security:</strong> Each client is
                hosted as a separate tenant, deployed on either their own or
                MarvelX’s cloud, ensuring rigorous data separation and
                compliance.
              </li>
            </ul>

            <h2>What will MarvelX do next?</h2>
            <p>
              MarvelX’s platform is evolving to deliver even more agentic
              workflows, enable advanced customization for customers, and
              further improve automation rates. As industry requirements shift,
              MarvelX relies on Weaviate’s rich feature set and responsive
              support to remain agile and innovative.
            </p>
            <p>
              “Our approach is intentionally collaborative. By involving our
              customers in refining agent workflows, we not only build trust,
              but also help them generate their own unique AI Agents. Weaviate’s
              flexibility lets us tailor every deployment to evolving needs,”
              said el Hassouni.
            </p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topSection}>
            <h2 className={styles.white}>Results</h2>
            <h2>90%+ accuracy</h2>
            <p>Achieved via automated end-to-end claims processing.</p>
            <h2>99.9% faster turnaround</h2>
            <p>
              Compared to manual claims processing, which can take days to
              weeks, Weaviate helps MarvelX deliver accurate results in seconds.
            </p>
            <h2>Scaling client operations 10X</h2>
            <p>
              Clients can drastically increase their claims throughput with the
              same team size, having human specialists shift from manual entry
              to orchestration and quality control.
            </p>
            <h2>Trust and building customer IP</h2>
            <p>
              Customers’ SMEs participate in training and refining agents,
              building internal expertise for customer organizations.
            </p>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.logo}></div>

            <p>
              The <Link to="https://marvelx.ai/">startup</Link> was founded by
              Ali el Hassouni, former Head of Data and AI at bunq and a PhD in
              reinforcement learning and generative AI. MarvelX focuses on
              solving operational inefficiencies in insurance and adjacent
              financial services industries. While demand to incorporate more
              efficient AI processes is high, most organizations struggle to
              take their ideas into production. After mapping out workflows and
              identifying large, underserved markets, the company set out to
              build AI agents specifically for high-volume insurance processes.
              The result is a precise and intentional use of AI to transition
              from repetitive, manual work to reliable, intelligent operations
              that scale.
            </p>
          </div>
          <div className={`${styles.bottomSection} ${styles.navy}`}>
            <div className={styles.avatar}></div>
            <p className={styles.quote}>
              “Before MarvelX, I implemented Weaviate in banking where security
              was really important. Being able to have trust in something battle
              tested is very important.”
            </p>
            <p className={styles.name}>Ali el Hassouni</p>
            <span>Founder MarvelX</span>
          </div>
        </div>
      </div>
    </div>
  );
}
