import React from "react";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";

function formatTitleForUrl(title) {
  return title
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export default function Card({ details }) {
  const typeClass = details.type.toLowerCase();

  const cardUrl =
    details.slug ||
    details.url ||
    `/learn/knowledgecards/${formatTitleForUrl(details.title)}`;

  return (
    <Link className={styles.linkCard} to={cardUrl}>
      <article className={`${styles.knowledgeCard} ${styles[typeClass] || ""}`}>
        <div className={styles.cardHeader}>
          <span className={styles.cardType}>{details.category}</span>
        </div>

        <div className={styles.innerCard}>
          {details.photo && (
            <img src={`/img/site/${details.photo}`} alt={details.title} />
          )}

          <h3>{details.title}</h3>
          <span className={styles.cardText}>{details.text}</span>
        </div>
      </article>
    </Link>
  );
}
