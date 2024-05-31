import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function ContactForm() {
  return (
    <div className={styles.contactBackground} id="meetingForm">
      <div className="container">
        <div className={styles.contactContainer}>
          <div className={styles.contactSection}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfMe-hDVsY9x-uYK8_CqWMPYQgFC6yu9eYNDVSr6SCflHiJ2A/viewform?embedded=true"
              width="700"
              height="2200"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
