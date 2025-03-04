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
        {app.released === 'no' && (
          <>
            {app.url && <Link to={app.url}>Learn More</Link>}
            {app.earlyAccess ? (
              <div className={styles.comingSoon}>Request Early Access</div>
            ) : app.comingSoon ? (
              <div className={styles.comingSoon}>Private Beta</div>
            ) : app.privatePreview ? (
              <div className={styles.comingSoon}>Public Preview</div>
            ) : (
              <div className={styles.tba}>Coming Soon</div>
            )}
          </>
        )}
        {app.released === 'yes' && app.url && (
          <Link to={app.url}>Learn More</Link>
        )}
      </div>
    </div>
  );
}
