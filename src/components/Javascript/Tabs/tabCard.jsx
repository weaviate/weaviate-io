import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function BlogItem(props) {
  const { details } = props;
  return (
    <Link to={details.link} className={styles.latestLink}>
      <div className={styles.latestBox}>
        <div
          className={styles.insideBox}
          style={{
            backgroundImage: `url(${details.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <div className={styles.textBox}>
          <h3>{details.name}</h3>
          <p>{details.tagline}</p>
        </div>
      </div>
    </Link>
  );
}
