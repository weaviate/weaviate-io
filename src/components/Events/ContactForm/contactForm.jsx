import React from 'react';
import { useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

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
          formId: '2573dc63-a3d4-4cff-9229-79a366f2f26f',
          target: '#hubspotForm',
        });
      }
    });
  }, []);
  return (
    <div className={styles.contactBackground}>
      <div className="container">
        <div className={styles.contactContainer}>
          <div className={styles.contactSection}>
            <form className={styles.formContact}>
              <h2 className={styles.title}>Contact us </h2>
              <div className={styles.links}>
                <p>
                  Do you have any questions? Like to team-up or speak?<br></br>{' '}
                  Let’s get this conversation started.
                </p>
              </div>
              <div id="hubspotForm"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
