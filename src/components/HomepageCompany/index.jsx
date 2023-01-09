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
        <Link to="https://www.semi.technology/#our_company_values">
          Our Values {'>'}
        </Link>
        <Link to="https://www.semi.technology/careers.html">Careers {'>'}</Link>
        <Link to="https://www.semi.technology/#how_we_do">
          How we work - meta {'>'}
        </Link>
        <Link to="https://www.semi.technology/#meet_the_team">
          Meet the team {'>'}
        </Link>
        <Link to="https://www.semi.technology/investors.html">
          Investors {'>'}
        </Link>
        <Link to="mailto:hello@semi.technology">Get in touch {'>'}</Link>
      </div>
    </div>
  );
}
