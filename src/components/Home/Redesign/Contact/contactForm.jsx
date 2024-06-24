import React from 'react';
import { useEffect } from 'react';
import styles from './styles.module.scss';

export default function ContactForm() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      // @TS-ignore
      if (window.hbspt) {
        // @TS-ignore
        window.hbspt.forms.create({
          portalId: '8738733',
          formId: 'c722587c-7ef8-414b-a64e-e33a71bcf02c',
          target: '#hubspotForm',
        });
      }
    });
  }, []);
  return (
    <div className={styles.contactBackground} id="contact-us">
      <div className="container">
        <div className={styles.contactContainer}>
          <div className={styles.contactSection}>
            <form className={styles.formContact}>
              <h2 className={styles.title}>Contact us </h2>
              <div className={styles.links}></div>
              <div id="hubspotForm"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
