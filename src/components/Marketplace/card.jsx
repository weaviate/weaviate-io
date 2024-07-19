import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export default function AppCard({ app }) {
  return (
    <div className={styles.appCard}>
      {/* <img src={`/img/apps/${app.image}`} alt={app.name} /> */}
      <h3>{app.name}</h3>
      <p>{app.description}</p>
      <span>{app.price}</span>
      <span>{app.rating} ★</span>
      <Link to={app.url}>Learn More</Link>
    </div>
  );
}
