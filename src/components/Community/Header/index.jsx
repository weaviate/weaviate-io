import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <div className="container">
      <div className={styles.box}>
        <h1>Welcome to our Community</h1>
        <img src="/img/site/weaviate-logo-light.png"></img>
        <p>
          join our great community of AI practitioners<br></br> and experts to
          lorum ipsum blaabkaaa
        </p>
      </div>

      <div className={styles.headerBar}>
        <div className={styles.headerNav}>
          <p>Slack</p>
        </div>
        <div className={styles.headerNav}>
          <p>Slack</p>
        </div>
        <div className={styles.headerNav}>
          <p>Slack</p>
        </div>
        <div className={styles.headerNav}>
          <p>Slack</p>
        </div>
        <div className={styles.headerNav}>
          <p>Slack</p>
        </div>
        <div className={styles.headerNav}>
          <p>Slack</p>
        </div>
      </div>
    </div>
  );
}
