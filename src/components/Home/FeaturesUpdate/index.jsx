import React from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function HomePage() {
  return (
    <div className={styles.benefits}>
      <div className="container">
        <div className={styles.header}>
          <h2>Unlock the full potential of your data</h2>
        </div>
        <div className={styles.features}>
          <div className={styles.box}>
            <p className={styles.icon1}></p>
            <h4 className={styles.title}>Rich Vector Search</h4>
            <p className={styles.subTitle}>
              Similarity, Hybrid, Generative<br></br>
              Object filtering<br></br>
              Any object type or ML model
            </p>
          </div>
          <div className={styles.box}>
            <p className={styles.icon2}></p>
            <h4 className={styles.title}>Easy Development</h4>
            <p className={styles.subTitle}>
              Just load and search<br></br>
              Automatic vectorization<br></br>
              Extensible search plug-ins
            </p>
          </div>
          <div className={styles.box}>
            <p className={styles.icon3}></p>
            <h4 className={styles.title}>High Performance</h4>
            <p className={styles.subTitle}>
              Parallel processing<br></br>
              Highly available<br></br>
              Scales to billions of objects
            </p>
          </div>
          <div className={styles.box}>
            <p className={styles.icon4}></p>
            <h4 className={styles.title}>Flexible Deployment</h4>
            <p className={styles.subTitle}>
              Weaviate Cloud<br></br>
              Open Source<br></br>
              Embeddable
            </p>
          </div>
        </div>

        <div className={styles.bottomFeatures}>
          <Link
            className={styles.linkBox}
            href="https://github.com/weaviate/weaviate"
          >
            <div className={styles.bottomBox}>
              <h3 className={styles.title}>Open Source</h3>
              <p className={styles.subTitle}>
                Try our open-source vector database technology and build your
                AI-native apps easier.
              </p>
              <p className={styles.boxLink}>Github {'>'} </p>
            </div>
          </Link>
          <Link to="https://console.weaviate.cloud/">
            <div className={styles.cloudBox}>
              <h3 className={styles.title}>Cloud Services</h3>
              <p className={styles.subTitle}>
                Simplify your cloud management with our Cloud solutions and
                scale seamlessly as your needs grow.
              </p>

              <p className={styles.boxLink}>Try it now {'>'} </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
