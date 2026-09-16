import React from 'react';
import events from '/data/events.json';
import styles from './styles.module.scss';

export default function WorkshopSection() {
  const featuredWebinar =
    events.find((event) => event.featured) || events[0];

  if (!featuredWebinar) {
    return null;
  }

  const registrationLink =
    featuredWebinar.link || '#upcoming-webinars';

  return (
    <section className={styles.container} aria-labelledby="featured-webinar">
      <div className={styles.featuredCard}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            {featuredWebinar.eyebrow || 'Featured upcoming webinar'}
          </p>
          <p className={styles.date}>{featuredWebinar.date}</p>
          <h2 id="featured-webinar">{featuredWebinar.title}</h2>
          <p className={styles.description}>{featuredWebinar.description}</p>
          <a className={styles.button} href={registrationLink}>
            {featuredWebinar.buttonLabel || 'Register for the webinar'}
          </a>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <span className={styles.visualLabel}>
            {featuredWebinar.visualLabel || 'Live webinar'}
          </span>
          <span className={styles.mcp}>
            {featuredWebinar.visualText || 'Live'}
          </span>
          <div className={styles.nodes}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
