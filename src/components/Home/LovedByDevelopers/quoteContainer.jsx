import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function Quotecontainer(props) {
  const { details } = props;
  return (
    <div className={styles.xbox}>
      <div className={styles.quoteBox}>
        <p>{details.statement}</p>
        <span>
          <strong>{details.name}</strong>
          <br></br>
          {details.company}
          <img src={details.logo}></img>
        </span>
      </div>
    </div>
  );
}
