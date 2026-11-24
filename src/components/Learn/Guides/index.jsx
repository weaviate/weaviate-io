import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';

export default function Guides() {
  return (
    <section className={styles.bgCol} id="events">
      <div className="container" id="guided-courses">
        <div className={styles.header}>
          <h2>Live &amp; on-demand events</h2>
          <p>Learn from experts and connect with other teams through webinars and workshops.</p>
        </div>
        <Link to="/community/events" className={styles.button}>See events</Link>
      </div>
    </section>
  );
}
