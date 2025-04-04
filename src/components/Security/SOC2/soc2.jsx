import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

const socLight = 'dark';

export default function Soc2(props) {
  const { socLight } = props;
  return (
    <div className={styles[socLight]}>
      <div className={styles.soc2Container}>
        <div className="container">
          <div className={styles.box}>
            <div className={styles.soc2Box}>
              <h2>We’re with you on your security and compliance journey </h2>

              <p>
                Weaviate is built on an extensible framework with flexible
                deployment options that can adapt to the needs of your business
                as they evolve. We’re committed to offering the capabilities our
                enterprise customers need to meet security and compliance
                requirements.
                <p>
                  {' '}
                  Access our trust portal to review our compliance documentation
                  and white papers describing our practices to keep your data
                  safe <Link to="https://trust.weaviate.io"> here.</Link>
                </p>
              </p>
            </div>
            <div className={styles.soc2Logos}>
              <div className={styles.drataLogo}></div>
              <div className={styles.soc2Logo}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
