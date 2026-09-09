import React from "react";
import styles from "./styles.module.scss";

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
          <iframe
            className={styles.lumaCalendar}
            src="https://lu.ma/embed/calendar/cal-S7gDcd9Akzu62RD/events"
            style={{
              width: "1200px",
              height: "520px",
              border: "1px solid rgba(185, 200, 222, 0.18)",
              borderRadius: "16px",
              maxWidth: "100%",
            }}
            title="Upcoming Weaviate webinars"
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
