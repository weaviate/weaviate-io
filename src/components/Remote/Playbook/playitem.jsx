import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function playItem(props) {
  const { details } = props;
  return (
    <Link to={details.link}>
      <div className={styles.latestBox}>
        <div
          className={styles.insideBox}
          style={{
            backgroundImage: `url(${details.backgroundImage})`,
            backgroundSize: '116%',
          }}
        ></div>
        <div className={styles.textBox}>
          <h3>{details.type}</h3>
          <p>{details.tagline}</p>
        </div>
        <div className={styles.bottomBox}>
          <img
            className={styles.smallImage}
            src={`/img/people/icon/${details.photo}`}
            alt={`${details.tagline}`}
          />
          <p className={styles.smallText}>
            {details.name}
            <br></br>
            {details.title}
          </p>
          <span className={styles.smallText}>{details.date}</span>
        </div>
      </div>
    </Link>
  );
}
