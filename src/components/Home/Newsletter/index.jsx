import React from 'react';
import styles from './styles.module.scss';

export default function HomepageNewsletter() {
  return (
    <div className="container">
      <div className={styles.box}>
        <div className={styles.text}>
          <h2>Stay updated</h2>
          <span>Subscribe to our newsletter</span>
        </div>
        <div className={styles.iframe}>
          <iframe
            src="https://embeds.beehiiv.com/15b21ebd-decd-433b-ada8-2d405e345f2e?slim=true"
            data-test-id="beehiiv-embed"
            frameBorder="0"
            scrolling="no"
            style={{
              margin: 0,
              borderRadius: '0px',
              backgroundColor: 'transparent',
              width: '100%',
              important: false,
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
