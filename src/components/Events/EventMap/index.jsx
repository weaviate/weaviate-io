import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function EventSection() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <h2>Community Events</h2>
          <div className={styles.headerBox}>
            <p>
              We believe technology needs to put the people first. We love to
              meet you where you are. Find out when we will be in your area and
              join us for an upcoming community event or meetup.
            </p>
          </div>
          <div className="eventContainer">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1OYecQaCQoKSVsHwgT4sg_tnpNnjS09Q&ehbc=2E312F"
              width="720"
              height="560"
            ></iframe>
          </div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.eventType} to="#">
            <img src="/img/site/event-team-photo.png" alt="arrow" />
            <span>Conferences</span>
          </div>
          <div className={styles.eventType} to="#">
            <img src="/img/site/Zain-workshop.jpg" alt="arrow" />
            <span>Workshops</span>
          </div>
          <div className={styles.eventType} to="#">
            <img src="/img/company/careers/team.png" alt="arrow" />
            <span>Meetups</span>
          </div>
          <div className={styles.eventType} to="#">
            <img src="/img/site/resource-image-02.png" alt="arrow" />
            <span>Webinars</span>
          </div>
        </div>
        <div className={styles.buttons}>
          <Link className={styles.buttonGradient} to="#">
            See all events
          </Link>
        </div>
      </div>
    </>
  );
}
