import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function HomepageLearn() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2>Learn & get inspired</h2>
        <p>
          The sky is the limit to what you can do with Weaviate. Learn how to
          use Weaviate and see what people are building with it.
        </p>
      </div>
      <div className={styles.cards}>
        <div className={styles.left}>
          <Link to="https://weaviate.io/podcast.html">
            <h3 className={styles.title}>
              Podcast:
              <br /> Neural Magic in Weaviate
            </h3>
          </Link>
          <div className={styles.links}>
            <Link to="https://www.youtube.com/playlist?list=PLTL2JUbrY6tW-KOQfOek8dtUmPgGQj3F0">
              Watch on YouTube {'>'}{' '}
            </Link>
            <Link to="https://open.spotify.com/show/4TlG6dnrWYdgN2YHpoSnM7">
              Listen on Spotify {'>'}{' '}
            </Link>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.smallUp}>
            <h3 className={styles.title}>
              Vector Library versus Vector Database
            </h3>
            <div className={styles.linksSmall}>
              <Link to="https://weaviate.io/blog/2022/12/vector-library-vs-vector-database.html">
                Read the blog {'>'}{' '}
              </Link>
            </div>
          </div>
          <div className={styles.smallDown}>
            <h3 className={styles.title}>
              Weaviate + Jina AI for image search
            </h3>
            <div className={styles.linksSmall}>
              <Link to="https://www.youtube.com/watch?v=rBKvoIGihnY">
                Watch the tutorial {'>'}{' '}
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.smallUp}>
            <h3 className={styles.title}>Backup and Restore in Weaviate</h3>
            <div className={styles.linksSmall}>
              <Link to="https://weaviate.io/blog/2022/11/tutorial-backup-and-restore-in-weaviate.html">
                Read the tutorial {'>'}{' '}
              </Link>
            </div>
          </div>
          <div className={styles.smallDown}>
            <h3 className={styles.title}>Why is Vector Search so fast?</h3>
            <div className={styles.linksSmall}>
              <Link to="https://weaviate.io/blog/2022/09/Why-is-Vector-Search-so-fast.html">
                Read the blog {'>'}{' '}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
