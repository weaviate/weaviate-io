import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

export default function CalendarSection() {
  return (
    <div className={styles.container}>
      <div className={styles.headerBox}>
        <h2>More Events & Workshops</h2>
        <p>
          A selection of more events and workshops to attend in-person or
          online.{' '}
        </p>
      </div>
      <div className={styles.workshopWrapper}>
        <div className={styles.workshopContainer}>
          <iframe
            className={styles.lumaCalendar}
            src="https://lu.ma/embed/calendar/cal-S7gDcd9Akzu62RD/events"
            style={{
              width: '1200px',
              height: '450px',
              border: '1px solid #bfcbda88',
              borderRadius: '8px',
              maxWidth: '100%',
            }}
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
