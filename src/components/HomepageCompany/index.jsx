import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function HomepageCompany() {
  return (
    <div className="container">
      <h2>
        Weaviate is developed and supported <br /> by SeMI Technologies
      </h2>
      <p>
        We believe open source is the best way to develop and deliver software.{' '}
        <br />
        We provide guidance, support and professional services for Weaviate.
      </p>
      <div className={styles.links}>
        <Link to="/company#our_company_values">
          Our Values {'>'}
        </Link>
        <Link to="/company/careers">Careers {'>'}</Link>
        <Link to="/company/playbook">
          How we work - Playbook {'>'}
        </Link>
        <Link to="/company#meet_the_team">
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
