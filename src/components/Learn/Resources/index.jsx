import React from "react";
import styles from "./styles.module.scss";

export default function Resources() {
  return (
    <div className={styles.bgCol}>
      <div className={styles.container}>
        <div className={styles.boxContainer}>
          <ul>
            <a href="#learning-paths">Learning paths</a>
          </ul>
          <ul>
            <a href="#ebooks">Featured guides</a>
          </ul>
          <ul>
            <a href="#whats-new">What's new</a>
          </ul>
          <ul>
            <a href="#events">Events</a>
          </ul>
          <ul>
            <a href="#developer-resources">Developer resources</a>
          </ul>
          <ul>
            <a href="#go-further">Go further</a>
          </ul>
        </div>
      </div>
    </div>
  );
}
