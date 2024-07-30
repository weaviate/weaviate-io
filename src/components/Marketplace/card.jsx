import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export default function AppCard({ app }) {
  return (
    <div className={styles.appCard}>
      <div className={styles.topCard}>
        <img src={'/img/site/' + app.image} alt={app.name} />
        <div className={styles.innerTop}>
          <h3>{app.name}</h3>
        </div>
      </div>
      <p>{app.description}</p>
      <div className={styles.bottomCard}>
        {app.released === 'no' ? (
          <>
            <div className={styles.comingSoon}>Coming Soon</div>
            <Link to={app.url}>Learn More</Link>
          </>
        ) : (
          <>
            {/*   <span>{app.price}</span>
            <div className={styles.heart}>
              {' '}
              <span>{app.rating}</span>
            </div> */}

            <Link to={app.url}>Learn More</Link>
          </>
        )}
      </div>
    </div>
  );
}
