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
        <Link to="#">Our Values {'>'}</Link>
        <Link to="#">Careers {'>'}</Link>
        <Link to="#">How we work - meta {'>'}</Link>
        <Link to="#">Meet the team {'>'}</Link>
        <Link to="#">Investors {'>'}</Link>
        <Link to="#">Get in touch {'>'}</Link>
      </div>
    </div>
  );
}
