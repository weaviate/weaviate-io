import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function ContactForm() {
  return (
    <>
      <div id="request-form"></div>
      <div className={styles.contactBackground}>
        <div className="container">
          <div className={styles.contactContainer}>
            <div className={styles.contactSection}>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSeuqqnMPQsiJl_mgoX6yY3DYcroEspHBrkeyZt7dWp_AfCLRw/viewform?embedded=true"
                width="600"
                height="1500"
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
    </>
  );
}
