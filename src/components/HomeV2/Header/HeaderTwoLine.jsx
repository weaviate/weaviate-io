import Link from '@docusaurus/Link';
import React, { useEffect, useState } from 'react';
import styles from './stylesTwoLine.module.scss';

const hpLogos = [
  'answear_logo.svg',
  'akamai-logo.svg',
  'alexi-logo.svg',
  'asksage-logo.png',
  'avara-logo.svg',
  'booking-logo.svg',
  'bosch-logo.svg',
  'build_logo_Kapa_AI.svg',
  'build_logo_point72.svg',
  'build-ltk-logo.svg',
  'build-trc-logo.svg',
  'build-vw-logo.svg',
  'bumble_logo.svg',
  'deel-logo.svg',
  'cisco.svg',
  'deacero-logo.svg',
  'factset.svg',
  'finster-logo.svg',
  'givingcompass-logo.svg',
  'globo-logo.png',
  'gloo-logo.svg',
  'Intel-logo.svg',
  'intuit-logo.svg',
  'inveniam-logo.svg',
  'Kantar-logo.svg',
  'Kuhnelo-logo.svg',
  'loti-white.svg',
  'MBH-bank-logo.svg',
  'medengine-logo.svg',
  'mednet-logo.svg',
  'MTG-logo.svg',
  'nato.svg',
  'netapp.svg',
  'oliver-logo.svg',
  'PA-Logo.svg',
  'Patronus-Logo.svg',
  'Perceptyx-logo.svg',
  'predori-logo.svg',
  'proposal-logo.svg',
  'prm_logo.svg',
  'scribd.svg',
  'Sing-Tao-logo.svg',
  'stack.svg',
  'thales-logo.svg',
  'toric-logo.svg',
  'Vecflow-august.svg',
  'yabble-logo.svg',
  'wearmedicine_logo.svg',
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function StudyHeaderTwoLine() {
  const midInit = Math.ceil(hpLogos.length / 2);
  const [logosTop, setLogosTop] = useState(hpLogos.slice(0, midInit));
  const [logosBottom, setLogosBottom] = useState(hpLogos.slice(midInit));

  useEffect(() => {
    const shuffled = shuffle(hpLogos);
    const mid = Math.ceil(shuffled.length / 2);
    setLogosTop(shuffled.slice(0, mid));
    setLogosBottom(shuffled.slice(mid));
  }, []);

  return (
    <header className={styles.headerBG}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.left}>
            <h1>
              FOR AI ENGINEERS
              <br />
              <span>turning ideas into products</span>
            </h1>
            <p>
              Design, build, and ship complete AI experiences with Weaviate{' '}
            </p>
            <div className={styles.headerBox}>
              <div className={styles.buttons}>
                <Link to="/go/console" className={styles.buttonLight}>
                  Get Started
                </Link>
                <Link
                  to="/blog/building-core-of-ai-native-stack"
                  className={styles.buttonDark}
                >
                  How we empower
                  <br /> AI builders →
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
        <div className={`${styles.logoWrapper} ${styles.logoWrapperOffset}`}>
          {[...logosTop, ...logosTop, ...logosTop].map((file, i) => (
            <div
              key={`line1-${i}`}
              className={styles.logo}
              style={{ backgroundImage: `url('/img/site/HP-logos/${file}')` }}
              aria-label={file}
              role="img"
            />
          ))}
        </div>

        <div className={`${styles.logoWrapper} ${styles.logoWrapperReverse}`}>
          {[...logosBottom, ...logosBottom, ...logosBottom].map((file, i) => (
            <div
              key={`line2-${i}`}
              className={styles.logo}
              style={{ backgroundImage: `url('/img/site/HP-logos/${file}')` }}
              aria-label={file}
              role="img"
            />
          ))}
        </div>
      </div>
    </header>
  );
}
