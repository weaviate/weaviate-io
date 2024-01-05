import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function AboutUsHeader() {
  return (
    <header>
      <div className="container">
        <div className={styles.box}>
          <h1>
            We create open source,
            <br />
            AI-first infrastructure.
          </h1>
          <div className={styles.headerBox}>
            <p className="text-center">
              We believe that the next wave of software infrastructure is
              AI-first and that a strong open-source community is a basis for
              creating
              <br></br>
              high-quality software.
            </p>
          </div>
        </div>

        <div className={styles.buttons}>
          <Link className={styles.buttonGradient} to="#meet_the_team">
            Meet the team
          </Link>
          <Link className={styles.buttonOutline} to="#our_company_values">
            How we work
          </Link>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.innerBar}>
          <div className={styles.barText}>
            4,000,000+<br></br>
            <span>Downloads</span>
          </div>
          <div className={styles.barText}>
            8,500+<br></br>
            <span>GitHub stars</span>
          </div>
          <div className={styles.barText}>
            10,000+<br></br>
            <span>Twitter followers</span>
          </div>
          <div className={styles.barText}>
            4,000+<br></br>
            <span>Community members</span>
          </div>
        </div>
      </div>
    </header>
  );
}
