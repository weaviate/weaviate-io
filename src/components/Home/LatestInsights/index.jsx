import React from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../theme/Buttons';
import Image from 'react';

export default function HomepageLatestInsights() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2 className={styles.title}>Latest Insights</h2>
        <p className={styles.subtitle}>
        Blog, podcast and more.<br></br>
eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className={styles.latestModule}>
<div className={styles.latestBox}>

  <div className={styles.insideBox}></div>
  <div className={styles.textBox}>
<h3>Blog</h3>
<p>Combining LangChain and Weaviate</p>
</div>
<div className={styles.bottomBox}>
<img src = '/img/site/avatar_erika.png'></img>
  <p className={styles.smallText}>Erika Cardena<br></br>
  Developer Advocate</p>
  <span className={styles.smallText}>Jun 22, 2023</span>
</div>
</div>
<div className={styles.latestBox}>

  <div className={styles.insideBox}></div>
  <div className={styles.textBox}>
<h3>Blog</h3>
<p>Combining LangChain and Weaviate</p>
</div>
<div className={styles.bottomBox}>
<img src = '/img/site/avatar_erika.png'></img>
  <p className={styles.smallText}>Erika Cardena<br></br>
  Developer Advocate</p>
  <span className={styles.smallText}>Jun 22, 2023</span>
</div>
</div>
<div className={styles.latestBox}>

  <div className={styles.insideBox}></div>
  <div className={styles.textBox}>
<h3>Blog</h3>
<p>Combining LangChain and Weaviate</p>
</div>
<div className={styles.bottomBox}>
<img src = '/img/site/avatar_erika.png'></img>
  <p className={styles.smallText}>Erika Cardena<br></br>
  Developer Advocate</p>
  <span className={styles.smallText}>Jun 22, 2023</span>
</div>
</div>
      </div>
    </div>
  );
}
