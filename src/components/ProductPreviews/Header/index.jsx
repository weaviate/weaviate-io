import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function ProductPreviewsHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>Product Previews</h1>

          <div className={styles.headerBox}>
            <p className="text-center">
              Get early access to upcoming Weaviate features and products.
              Request access, share feedback, and help shape what we build next.
            </p>
          </div>

          <div className={styles.buttons}>
            <Link className={styles.buttonOutline} to="/blog">
              Read our Blog
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
