import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function Testimonials() {
  return (
    <div className={styles.headerTestimonials}>
      <div className="container">
        <div className={styles.bentoGrid}>
          <div className={styles.bento05}>
            <div className={styles.bentoText}>
              <div className={styles.bentoImage}></div>
              <div className={styles.innerText}>
                <h3>
                  “Through our Corpus API connected to Weaviate, users can build
                  very powerful, low latency search engines in minutes with
                  little to no code.”
                </h3>
                <p>Aisis Julian</p>
                <span>Senior Software Engineer, Morningstar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
