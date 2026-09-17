import Link from '@docusaurus/Link';
import React from 'react';
import events from '/data/events.json';
import styles from './styles.module.scss';

export default function CalendarSection() {
  return (
    <section className={styles.container} id="upcoming-webinars">
      <div className={styles.headerBox}>
        <p className={styles.eyebrow}>Save your seat</p>
        <h2>Upcoming webinars</h2>
        <p>
          Browse the schedule and register for the sessions you want to join.
          Your confirmation and calendar details will follow after signup.
        </p>
      </div>
      <div className={styles.workshopWrapper}>
        <div className={styles.workshopContainer}>
          {events.length > 0 ? (
            <div className={styles.timeline}>
              {events.map((event) => (
                <article className={styles.timelineItem} key={event.title}>
                  <div className={styles.dateColumn}>
                    <span className={styles.timelineDot} aria-hidden="true" />
                    <p className={styles.dateLabel}>{event.dateLabel}</p>
                    {event.weekday && (
                      <p className={styles.weekday}>{event.weekday}</p>
                    )}
                  </div>

                  <Link
                    className={styles.eventCard}
                    to={event.link || '#upcoming-webinars'}
                    aria-label={`${event.buttonLabel || 'Register for'} ${event.title}`}
                  >
                    <div className={styles.eventContent}>
                      {event.time && (
                        <p className={styles.time}>{event.time}</p>
                      )}
                      <h3>{event.title}</h3>
                      {event.hosts && (
                        <p className={styles.hosts}>
                          <span aria-hidden="true">●</span> By {event.hosts}
                        </p>
                      )}
                      {event.platform && (
                        <p className={styles.platform}>
                          <svg
                            className={styles.platformIcon}
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <rect
                              x="3"
                              y="6"
                              width="12"
                              height="12"
                              rx="2"
                              fill="currentColor"
                            />
                            <path
                              d="M15 10.2 20.1 7.4A.6.6 0 0 1 21 8v8a.6.6 0 0 1-.9.52L15 13.8v-3.6Z"
                              fill="currentColor"
                            />
                          </svg>
                          {event.platform}
                        </p>
                      )}
                      <span className={styles.registerLink}>
                        {event.buttonLabel || 'Register now'}
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>

                    {event.image && (
                      <img
                        className={styles.eventImage}
                        src={event.image}
                        alt=""
                        loading="lazy"
                      />
                    )}
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.emptyState}>
              New webinar dates are coming soon. Check back for updates.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
