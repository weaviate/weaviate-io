import React from 'react';
import { useParams } from 'react-router-dom';
import appData from '/data/apps.json';
import styles from './styles.module.scss';
import AppCard from './card';

export default function AppPage() {
  const { id } = useParams();
  const app = appData.find((app) => app.id === id);

  if (!app) return <div>App not found</div>;

  return (
    <div className={styles.appDetailContainer}>
      <div className={styles.appDetailHeader}>
        <img src={'img/site/' + app.image} alt={app.name} />
        <div>
          <h1>{app.name}</h1>
          <p>{app.description}</p>
          <button className={styles.installButton}>Install</button>
        </div>
      </div>
      <div className={styles.appDetailContent}>
        <div className={styles.tabContent}>
          <h2>Overview</h2>
          <img src={'img/site/' + app.image} alt={app.name} />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse...
          </p>
        </div>
        <div className={styles.additionalInfo}>
          <h3>Additional info</h3>
          <p>
            <strong>Pricing:</strong> {app.price}
          </p>
          <p>
            <strong>Version:</strong> 7.3.0
          </p>
          <p>
            <strong>Updated:</strong> January 28, 2023
          </p>
          <p>
            <strong>Size:</strong> 2.09MB
          </p>
          <p>
            <strong>Languages:</strong> See all 4
          </p>
        </div>
      </div>
      <div className={styles.relatedApps}>
        <h3>Related Apps</h3>
        <div className={styles.cardContainer}>
          {appData
            .filter(
              (relatedApp) =>
                relatedApp.category === app.category && relatedApp.id !== app.id
            )
            .map((relatedApp) => (
              <AppCard key={relatedApp.id} app={relatedApp} />
            ))}
        </div>
      </div>
    </div>
  );
}
