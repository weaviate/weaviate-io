import Link from '@docusaurus/Link';
import React, { useEffect } from 'react';
import styles from './styles.module.scss';

export default function introduction() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/embed/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      // @TS-ignore
      if (window.hbspt) {
        // @TS-ignore
        window.hbspt.forms.create({
          portalId: '8738733',
          formId: 'df09b2ec-ecbb-48ee-8c1e-f307049fc0bf',
          target: '#hubspotForm',
        });
      }
    });
  }, []);
  return (
    <div className={styles.investorsContainer}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.investorBox}>
            <img
              src="/img/site/aws-marketplace.svg"
              alt="AWS Marketplace Logo"
            />
            <h1>We’re here to help!</h1>

            <p>
              Need support getting started with Weaviate on AWS? We’ve got your
              back.
            </p>
            <p className={styles.smallText}>
              Fill out the form to get access to the Weaviate Vector database
              deployed via the AWS Marketplace free for 30 days. AWS
              infrastructure charges will be extra and not included. If you have
              already subscribed, we will send you an additional private offer
              that you can use any time during the next six months.
            </p>
            <ul className={styles.smallText}>
              <li>Get access to office hours to help you:</li>
              <li>Get started with Weaviate</li>
              <li>Learn best practices</li>
              <li>Work through setup issues</li>
            </ul>
          </div>
          <div className={styles.investorLogos}>
            <h2>Contact Us</h2>
            <div id="hubspotForm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
