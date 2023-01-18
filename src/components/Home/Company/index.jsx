import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function HomepageCompany() {
  return (
    <div className="container">
      <h2>
        We believe in open-source
      </h2>
      <p>
      Weaviate is open-source and available for anybody to use wherever they want. Our services are created around SaaS, Hybrid-SaaS, and industry-standard service-level agreements.
      </p>
      <div className={styles.links}>
        <Link to="/company/about-us#our_company_values">
          Our Values {'>'}
        </Link>
        <Link href="https://careers.weaviate.io/">Careers {'>'}</Link>
        <Link to="/company/playbook">
          How we work - Playbook {'>'}
        </Link>
        <Link to="/company/about-us#meet_the_team">
          Meet the team {'>'}
        </Link>
        <Link to="/company/investors">
          Investors {'>'}
        </Link>
        <Link to="mailto:hello@weaviate.io">Get in touch {'>'}</Link>
      </div>
    </div>
  );
}
