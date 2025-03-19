import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function PartnersHeader() {
  const handleTabClick = (tab) => {
    window.history.pushState(null, '', `#request-form?tab=${tab}`);

    document.getElementById('request-form').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <header>
      <div className={styles.partnersHead}>
        <div className="container">
          <div className={styles.grid}>
            <p className={styles.title}>
              Company <span>Partners</span>
            </p>
            <p className={styles.text}>
              Grow with Weaviate! We bring together cutting-edge AI technologies
              and service providers to deliver transformational solutions for
              organizations worldwide.
            </p>
            <div className={styles.buttons}>
              <Link
                className={styles.buttonOutline}
                onClick={() => handleTabClick('partner')}
              >
                Become a Partner
              </Link>
              <Link
                className={styles.buttonOutline}
                onClick={() => handleTabClick('deal')}
              >
                Register a Deal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
