import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

const EventBox = ({ type, title, date, imageClass, url }) => (
  <Link to={url}>
    <div className={styles.eventBox}>
      <div className={`${styles.workshopImage} ${styles[imageClass]}`} />
      <div className={styles.eventText}>
        <p>{type}</p>
        <span>{title}</span>
        <p>{date}</p>
      </div>
    </div>
  </Link>
);

export default EventBox;
