import Link from "@docusaurus/Link";
import React from "react";
import styles from "./styles.module.scss";

export default function quoteBox() {
  return (
    <section className={styles.quoteSection}>
      <div className="container">
        <div className={styles.quoteCard}>
          <div className={styles.quoteInner}>
            <h3>
              "I've never encountered a course that could pack so much
              information into such a concise format while still distinctly
              highlighting each critical point. The instructor is undoubtedly
              one of the best I've had the privilege of learning from"
            </h3>

            <p>Attendee, DeepLearning.AI course</p>

            <Link className={styles.buttonGradient} to="#contact-sales">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
