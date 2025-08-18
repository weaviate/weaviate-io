import Link from '@docusaurus/Link';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

const hpLogos = [
  'akamai-logo.svg',
  'alexi-logo.svg',
  'asksage-logo.png',
  'avara-logo.svg',
  'build_logo_Kapa_AI.svg',
  'build_logo_point72.svg',
  'build-ltk-logo.svg',
  'build-trc-logo.svg',
  'build-vw-logo.svg',
  'bumble_logo.svg',
  'bunq.svg',
  'cisco.svg',
  'deacero-logo.svg',
  'factset.svg',
  'finster-logo.svg',
  'givingcompass-logo.svg',
  'globo-logo.svg',
  'gloo-logo.svg',
  'instabase.svg',
  'Intel-logo.svg',
  'intuit-logo.svg',
  'inveniam-logo.svg',
  'Kantar-logo.svg',
  'Kuhnelo-logo.png',
  'loti-white.svg',
  'MBH-bank-logo.svg',
  'medengine-logo.png',
  'mednet-logo.svg',
  'MTG-logo.svg',
  'nato.svg',
  'netapp.svg',
  'oliver-logo.png',
  'PA-Logo.svg',
  'Patronus-Logo.svg',
  'Perceptyx-logo.svg',
  'predori-logo.svg',
  'proposal-logo.svg',
  'rohirrim-logo.svg',
  'scribd.svg',
  'Sing-Tao-logo.svg',
  'stack.svg',
  'thales-logo.svg',
  'toric-logo.svg',
  'Vecflow-august.svg',
  'yabble-logo.svg',
];

export default function StudyHeader() {
  // Shuffle only once per page load
  const shuffledLogos = useMemo(() => {
    const arr = [...hpLogos];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  return (
    <header className={styles.headerBG}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.left}>
            <h1>
              FOR AI ENGINEERS
              <br />
              <span>WHO THINK BIG</span>
            </h1>
            <p>
              Start fast, scale to billions with a feature-rich vector database
              trusted by AI innovators{' '}
            </p>
            <div className={styles.headerBox}>
              <div className={styles.buttons}>
                <Link
                  to="https://console.weaviate.cloud/"
                  className={styles.buttonLight}
                >
                  Get Started
                </Link>
                <Link
                  to="/blog/building-core-of-ai-native-stack"
                  className={styles.buttonDark}
                >
                  How we empower
                  <br /> AI-native builders →
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.image}></div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.logoWrapper}>
          {[...shuffledLogos, ...shuffledLogos].map((file, i) => (
            <div
              key={i}
              className={styles.logo}
              style={{ backgroundImage: `url('/img/site/HP-logos/${file}')` }}
              aria-label={file.replace(/\.(svg|png)$/i, '')}
              role="img"
            />
          ))}
        </div>
      </div>
    </header>
  );
}
