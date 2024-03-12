import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

const socLight = 'dark';

export default function quoteBox(props) {
  const { socLight } = props;
  return (
    <div className={styles[socLight]}>
      <div className={styles.soc2Container}>
        <div className={`${styles.card} ${styles.longCard}`}>
          <div className={styles.contentDiv}>
            <h3 className={styles.cTextColor}>
              "I've never encountered a course that could pack so much
              information into such a concise format while still distinctly
              highlighting each critical point. The instructor is undoubtedly
              one of the best I've had the privilege of learning from"
            </h3>
            <p>Attendee, DeepLearning.AI course</p>
          </div>
        </div>
      </div>
    </div>
  );
}
