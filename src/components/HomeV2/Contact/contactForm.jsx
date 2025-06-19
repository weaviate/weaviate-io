import React, { useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';

export default function ContactForm() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.setAttribute('data-cookieconsent', 'ignore');
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: '8738733',
          formId: 'c722587c-7ef8-414b-a64e-e33a71bcf02c',
          target: '#hubspotForm',
        });
      }
    });

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.contactBackground} id="contact-us">
      <div className="container">
        {/* Newsletter top bar */}
        <div className={styles.newsletterBar}>
          <h3>Stay updated and subscribe to our newsletter</h3>
          <iframe
            src="https://embeds.beehiiv.com/15b21ebd-decd-433b-ada8-2d405e345f2e?slim=true"
            data-test-id="beehiiv-embed"
            frameBorder="0"
            scrolling="no"
            style={{
              margin: 0,
              borderRadius: '0px',
              width: '100%',
              height: '53px',
              backgroundColor: 'transparent',
            }}
          ></iframe>
        </div>

        {/* Main contact area */}
        <div className={styles.contactSplit}>
          {/* Left Side */}
          <div className={styles.leftContent}>
            <h2>Ready to get started?</h2>
            <p>
              Try Weaviate Cloud today, or get in touch with our team to discuss
              your needs. We can’t wait to meet you.
            </p>
            <Link
              className={styles.tryButton}
              to="https://console.weaviate.cloud"
            >
              Try Weaviate Cloud
            </Link>
            <ul className={styles.linkList}>
              <li>
                <Link to="/products">Weaviate Products</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/partners">Partners</Link>
              </li>
            </ul>
          </div>

          {/* Right Side - HubSpot Form */}
          <div className={styles.rightForm}>
            <div id="hubspotForm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
