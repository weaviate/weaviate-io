import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function ContactForm() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js-eu1.hsforms.net/forms/embed/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      // @TS-ignore
      if (window.hbspt) {
        // @TS-ignore
        window.hbspt.forms.create({
          portalId: '143457533',
          formId: '9f950fe9-da45-40dd-87fc-cfebf4b1a5e2',
          target: '#hubspotForm',
        });
      }
    });
  }, []);

  return (
    <div className={styles.contactBackground} id="meetingForm">
      <div className="container">
        <div className={styles.contactContainer}>
          <div className={styles.contactSection}>
            <h2 className={styles.title}>Book a meeting with the team</h2>
            <div id="hubspotForm"></div>
            {/*  <form
              className={styles.formContact}
              action="https://formcarry.com/s/FZwYB5WwuG"
              method="POST"
            >
              <h2 className={styles.title}>Contact us </h2>
              <div className={styles.links}>
                <p>
                  Do you have any questions? Let’s get this conversation
                  started.
                </p>
              </div>

              <input
                type="input"
                name="formName"
                placeholder="First Name"
              ></input>
              <span></span>
              <input
                type="email"
                name="formEmail"
                placeholder="Work Email Address"
              ></input>
              <span></span>

              <textarea
                type="text"
                name="formMessage"
                className={styles.formMessage}
                placeholder="Message"
              ></textarea>
              <button type="submit" name="formSumbit">
                Send
              </button>
            </form> */}
          </div>
        </div>
      </div>
    </div>
  );
}
