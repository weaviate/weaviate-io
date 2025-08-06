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
              Loti AI partnered with Weaviate to power their digital identity
              protection platform, resulting in significant time savings for
              their data science team, reliable performance at multi-billion
              vector scale, and the ability to focus on ambitious growth plans
              rather than managing infrastructure.
            </p>
            <h2>Challenge</h2>
            <p>
              Loti AI faces the challenge of scanning massive amounts of digital
              content to identify and remove unauthorized materials featuring
              their clients, which include public figures and high profile
              celebrities. "Simply put, the more internet we scan, the better we
              can protect our customers," explains Dr. Hirak Chhatbar,
              Co-founder and CTO at Loti AI.
            </p>

            <p>
              The team initially built the platform using another vector
              database. They discovered that their Director of Data Science had
              to perform routine maintenance to ensure platform stability,
              taking away valuable time from his core job function. To make sure
              this work did not pile up as Loti AI continued to grow, a change
              was required. “I need peace of mind. When we are scaling our
              systems, I don't want to worry about our vector database as it
              serves as a core foundation supporting all our services,” noted
              Chhatbar.
            </p>
            <strong>Their key requirements included:</strong>
            <ul>
              <li>
                A scalable solution that could handle tens of billions of
                vectors
              </li>
              <li>
                Minimal maintenance overhead to free up their data science team
              </li>
              <li>
                Reliability for their critical operations of finding and
                removing unauthorized content
              </li>
              <li>
                Cost-effective pricing that would support their growing
                operations
              </li>
            </ul>
            <h2>Why Loti chose Weaviate</h2>
            <p>
              {' '}
              After evaluating their options, Loti AI chose Weaviate for several
              reasons:
            </p>
            <ul>
              <li>
                No longer slowed down by database maintenance, the team could
                focus on expanding product functionality.
              </li>
              <li>
                Weaviate’s scalability supports their massive, growing dataset.
              </li>
              <li>
                Loti AI experiences reliable performance even as they process
                120 - 140 million images daily.
              </li>
              <li>
                Weaviate’s team mitigated migration risks and quickly resolved
                initial challenges.
              </li>
              <li>
                Loti AI can focus on performance, massive scale and the customer
                experience, knowing they have a predictable, cost-effective
                solution in hand.
              </li>
            </ul>
            <p>
              “Weaviate's team was really great and solved every bottleneck we
              faced during our migration. Now, I never worry about our vector
              database, even with 9 billion vectors. They've delivered
              maintenance and cost advantages, allowing us to focus on scaling
              our systems without concern,” said Chhatbar.
            </p>

            <h2>What's Next?</h2>
            <p>
              Loti AI continues to expand their operations with plans to
              increase their daily scanning capacity to 150 million images and
              videos per day. With Weaviate handling their vector database
              needs, they can focus on this growth without worrying about
              database scalability or maintenance.
            </p>
            <p>
              The company is also strengthening its existing partnerships with
              social media platforms like TikTok, Meta, and Pinterest to
              expedite takedown requests, making their service even more
              effective for their high-profile clients.
            </p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topSection}>
            <h2 className={styles.white}>Results</h2>
            <h2>200+ hours saved per year</h2>
            <p>
              By switching to Weaviate, their Director of Data Science unlocked
              bandwidth previously spent on vector database maintenance,
              allowing him to focus on core data science strategy.
            </p>
            <h2>One of the world’s largest deployments in production</h2>
            <p>
              Loti AI now manages 9 billion facial vectors, supporting their
              scanning of 120 - 140 million images and videos daily.
            </p>
            <h2>Infrastructure optimization</h2>
            <p>
              With 3.5 petabytes of storage on AWS S3 and extensive use of AWS
              services and GPUs, Loti AI benefits from Weaviate's seamless
              integration with their existing cloud infrastructure.
            </p>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.logo}></div>

            <p>
              Loti AI is a sophisticated AI-powered system dedicated to
              protecting digital identities by finding and automatically
              removing unauthorized content across the internet. To accomplish
              this, their platform scans hundreds of millions of images and
              videos per day from the public internet. Their advanced facial
              recognition technology finds deepfakes, fake endorsements,
              impersonation accounts and unlicensed distribution and automates
              the removal of that content in compliance with the Take It Down
              Act (2025).
            </p>
          </div>
          <div className={`${styles.bottomSection} ${styles.navy}`}>
            <div className={styles.avatar}></div>
            <p className={styles.quote}>
              “I need peace of mind. When we are scaling our systems, I don't
              want to worry about scalability and uptime of our vector database
              as it serves as a core foundation supporting all our services.”
            </p>
            <p className={styles.name}>Dr. Hirak Chhatbar,</p>
            <span>Co-founder and CTO, Loti AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
