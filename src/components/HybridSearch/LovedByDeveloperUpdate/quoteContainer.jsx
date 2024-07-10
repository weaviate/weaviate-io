import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function Quotecontainer(props) {
  const { details } = props;
  return (
    <div className={styles.xbox}>
      <div className={styles.quoteBox}>
        <p>{details.statement}</p>
        {details.logo ? (
          <span>
            <strong>{details.name}</strong>
            <br></br>
            <img src={details.logo} alt={details.name}></img>
          </span>
        ) : (
          <span>
            <strong>{details.name}</strong>
            <br></br>
            {details.company}
          </span>
        )}
      </div>
    </div>
  );
}
