import React from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../theme/Buttons';
import Image from 'react';
import Link from '@docusaurus/Link';

export default function Playbook() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2 className={styles.title}>Playbook</h2>
        <p className={styles.subtitle}>
          In order to stay true to the open-source spirit as we grow, in this
          blog we want to share our company vision, culture and insights.
        </p>
      </div>
      <div className={styles.latestModule}>
        <Link to="/blog/distance-metrics-in-vector-search">
          <div className={styles.latestBox}>
            <div className={`${styles.insideBox} ${styles.playbook1}`}></div>
            <div className={styles.textBox}>
              <h3>Blog</h3>
              <p>Weaviate celebrates a fourth birthday!</p>
            </div>
            <div className={styles.bottomBox}>
              <img src="/img/site/avatar_erika.png"></img>
              <p className={styles.smallText}>
                Erika Cardena<br></br>
                Developer Advocate
              </p>
              <span className={styles.smallText}>Jun 22, 2023</span>
            </div>
          </div>
        </Link>
        <Link to="/blog/what-is-a-vector-database">
          <div className={styles.latestBox}>
            <div className={`${styles.insideBox} ${styles.playbook2}`}></div>
            <div className={styles.textBox}>
              <h3>Blog</h3>
              <p>Hiring at Weaviate - finding our perfect matches!</p>
            </div>
            <div className={styles.bottomBox}>
              <img src="/img/site/avatar_connor.png"></img>
              <p className={styles.smallText}>
                Connor Shorten<br></br>
                Developer Advocate
              </p>
              <span className={styles.smallText}>Aug 01, 2023</span>
            </div>
          </div>
        </Link>
        <Link to="/learn/workshops">
          <div className={styles.latestBox}>
            <div className={`${styles.insideBox} ${styles.playbook3}`}></div>
            <div className={styles.textBox}>
              <h3>Blog</h3>
              <p>Cell Theory - Planning for organic growth</p>
            </div>
            <div className={styles.bottomBox}>
              <img src="/img/site/avatar_erika.png"></img>
              <p className={styles.smallText}>
                Erika Cardena<br></br>
                Developer Advocate
              </p>
              <span className={styles.smallText}>Sept 14, 2023</span>
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.buttons}>
        <Link className={styles.buttonOutline} to="/company/playbook">
          Go to Playbook
        </Link>
      </div>
    </div>
  );
}
