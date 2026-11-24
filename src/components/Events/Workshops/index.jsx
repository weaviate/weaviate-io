import React from "react";
import events from "/data/events.json";
import calendarStyles from "../Calendar/styles.module.scss";
import styles from "./styles.module.scss";

export default function WorkshopSection() {
  const featuredWebinar = events.find((event) => event.featured) || events[0];

  if (!featuredWebinar) {
    return null;
  }

  if (featuredWebinar.featured == false) {
    return null;
  }

  const registrationLink = featuredWebinar.link || "#past-webinars";

  return (
    <section className={styles.container} id="upcoming-webinars" aria-labelledby="upcoming-webinars-heading">
      <div className={calendarStyles.headerBox}>
        <p className={calendarStyles.eyebrow}>Join us live</p>
        <h2 id="upcoming-webinars-heading">Upcoming webinars</h2>
        <p>Join upcoming sessions with Weaviate engineers and partners.</p>
      </div>
      <div className={styles.featuredCard}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            {featuredWebinar.eyebrow || "Featured upcoming webinar"}
          </p>
          <p className={styles.date}>{featuredWebinar.date}</p>
          <h3>{featuredWebinar.title}</h3>
          <p className={styles.description}>{featuredWebinar.description}</p>
          {featuredWebinar.speakers && (
            <p className={styles.people}>Speakers: {featuredWebinar.speakers}</p>
          )}
          {featuredWebinar.hosts && (
            <p className={styles.people}>Host: {featuredWebinar.hosts}</p>
          )}
          <a className={styles.button} href={registrationLink}>
            {featuredWebinar.buttonLabel || "Register for the webinar"}
          </a>
        </div>
        <div className={styles.visual}>
          <img
            src={featuredWebinar.featuredImage || featuredWebinar.image}
            alt={`${featuredWebinar.title} webinar artwork`}
          />
        </div>
      </div>
    </section>
  );
}
