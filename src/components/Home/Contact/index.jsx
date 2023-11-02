import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function HomepageReady() {
  return (
    <div className={styles.contactBackground}>
      <div className="container">
        <div className={styles.contactContainer}>
          <div className={styles.contactSection}>
            <form
              className={styles.formContact}
              action="https://formspree.io/f/meqbgaao"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
