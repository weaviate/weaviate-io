import React from 'react';
import styles from './stylesv2.module.scss';
import Link from '@docusaurus/Link';
import JoinCommunity from '../JoinCommunityUpdate';
import partners from '/data/partners.json';

export default function HomepageIntegrations() {
  const featuredPartners = partners.filter((partner) => partner.featured);

  return (
    <div className={styles.integrationsSection}>
      <div className={styles.topImage}></div>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.right}>
            <h2>Integrations</h2>
            <p>
              With Weaviate, you can bring your own vectors or choose one of our
              out-of-the-box modules with support for vectorization. You can
              also easily connect to a wide variety of well-known language model
              frameworks.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.integrationsLogos} id="interLogos">
        <div className={styles.inside}>
          {featuredPartners.map((partner) => (
            <Link key={partner.name} to={partner.link}>
              <div className={styles.logoBg}>
                <img
                  src={partner.image}
                  alt={`${partner.name} logo`}
                  className={styles.logoImage}
                />
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <Link to="/product/integrations" className={styles.buttonDark}>
            View all integrations
          </Link>
        </div>
      </div>

      <JoinCommunity />
    </div>
  );
}
