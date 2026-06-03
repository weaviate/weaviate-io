import React from "react";
import styles from "./styles.module.scss";
import posts from "/data/blogposts.json";
import BlogItem from "./blogItem";

export default function Blogs() {
  const option2Data = posts.rag;

  return (
    <section className={styles.blogSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Developer Resources</h2>
        </div>

        <div className={styles.latestModule}>
          {option2Data.map((post) => {
            return <BlogItem key={post.tagline} details={post} />;
          })}
        </div>
      </div>
    </section>
  );
}
