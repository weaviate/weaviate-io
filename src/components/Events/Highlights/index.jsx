import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import EventBox from './eventItem';
import eventData from './events.json';

export default function HighlightPanel() {
  return (
    <div className={styles.bottomBar}>
      <p className={styles.topHeader}>
        Join us at conferences, meetups, webinars or workshops
      </p>
      <div className={styles.innerBar}>
        {eventData.map((event, index) => (
          <EventBox key={index} {...event} />
        ))}
      </div>
    </div>
  );
}
