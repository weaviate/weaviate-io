import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function Investors({ selectedType, handleSelected }) {
  return (
    <div className={styles.investorsContainer}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.investorBox}>
            <h2>Our investors</h2>

            <p>
              Thanks for your interest in our journey to bring AI Native vector
              database infrastructure to developers and operators (DevOps /
              MLOps) all over the world.
            </p>
            <p>
              We are a company backed by{' '}
              <Link to="https://www.indexventures.com/">Index Ventures</Link>,{' '}
              <Link to="https://www.battery.com/">Battery Ventures</Link>,{' '}
              <Link to="https://www.nea.com/">New Enterprise Associates</Link>,{' '}
              <Link to="https://cortical.vc/">Cortical Ventures</Link>,{' '}
              <Link to="https://www.zettavp.com/">Zetta Venture Partners</Link>,{' '}
              <Link to="https://www.ingwb.com/en/corporate-investments/ing-ventures">
                ING Ventures
              </Link>
              , <Link to="https://www.gtmfund.com/">GTM-fund</Link>,{' '}
              <Link to="https://www.sav.vc/">Scale Asia Ventures</Link>, and{' '}
              <Link to="https://www.alexvanleeuwen.co">Alex van Leeuwen</Link>.
            </p>
            <p>
              <strong>Find more information about us:</strong>
            </p>
            <div className={styles.investorButton}>
              <Link
                className={styles.pricingButton}
                to="https://www.crunchbase.com/organization/weaviate"
              >
                Crunchbase
              </Link>
              <Link
                className={styles.boardButton}
                to="https://theorg.com/org/weaviate/teams/board-and-advisors"
              >
                Board & Advisors
              </Link>
            </div>
          </div>
          <div className={styles.investorLogos}>
            <div className={styles.investorDiagram}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
