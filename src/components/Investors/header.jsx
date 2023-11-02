import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className={styles.box}>
          <h1>Investors</h1>
          <div className={styles.headerBox}>
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
              <Link to="https://www.alexvanleeuwen.co/">Alex van Leeuwen</Link>.
            </p>
            <p>
              You can find more information about us on our{' '}
              <Link to="https://www.crunchbase.com/organization/weaviate">
                Crunchbase
              </Link>{' '}
              page, our{' '}
              <Link to="https://theorg.com/org/weaviate/teams/board-and-advisors">
                board and advisors
              </Link>{' '}
              are listed on our organizational chart.
            </p>
          </div>
        </div>

        <div className={styles.buttons}>
          <Link
            className={styles.buttonGradient}
            to="mailto:investors@weaviate.io"
          >
            Contact Us at investors@weaviate.io
          </Link>
        </div>
      </div>
    </header>
  );
}
