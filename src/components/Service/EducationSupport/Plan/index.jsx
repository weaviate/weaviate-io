import Link from "@docusaurus/Link";
import React from "react";

import styles from "./styles.module.scss";

export default function ServicePlan() {
  return (
    <section className={styles.bgColor}>
      <div className="container">
        <div className={styles.diagramBox}>
          <div className={styles.header}>
            <h2>
              Whether you’re using our cloud services or hosting Weaviate on
              your own, we’re here to help you succeed.
            </h2>
          </div>

          <div className={styles.content}>
            <div className={styles.leftContent}>
              <div className={styles.featureItem}>
                <span>Onboarding packages</span>
                <p>
                  Rolling out a new database can be daunting. With onboarding
                  packages tailored to your needs, we’ll make sure you’re set up
                  for success with Weaviate.
                </p>
              </div>

              <div className={styles.featureItem}>
                <span>Enterprise support</span>
                <p>
                  We offer 24x7 enterprise support options for both Weaviate
                  Cloud Services and open source users. If something goes wrong,
                  we’ll be there to help.
                </p>
              </div>

              <div className={styles.featureItem}>
                <span>Free on-demand learning</span>
                <p>
                  Keep your AI development skills fresh with self-paced courses
                  offered through Weaviate Academy and DeepLearning.AI.
                </p>
              </div>

              <div className={styles.featureItem}>
                <span>Live training</span>
                <p>
                  In addition to our documentation, guides, and on-demand
                  learning, we host live workshops and office hours virtually or
                  in person. Learn more.
                </p>
              </div>
            </div>

            <div className={styles.rightContent}>
              <div className={styles.parentGrid}>
                <div className={styles.imageGrid1}> </div>
                <div className={styles.imageGrid2}> </div>
                <div className={styles.imageGrid3}> </div>
                <div className={styles.imageGrid4}> </div>
                <div className={styles.imageGrid5}> </div>
              </div>
            </div>
          </div>

          <div className={styles.bottomContent}>
            <h2 className={styles.getStarted}>
              Explore our training and support <Link to="/pricing">plans</Link>.
            </h2>

            <p>
              Visit our <Link to="/pricing">pricing page</Link> for package
              details and support options.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
