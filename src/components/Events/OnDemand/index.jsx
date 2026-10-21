import React from "react";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";
import webinars from "/data/on-demand-webinars.json";

export default function OnDemand() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.marketTitle} id="on-demand-webinars">
          <h2 className={styles.marketText}>On-demand webinars</h2>
        </div>
        <div className={styles.buttons}>
          {webinars.map((webinar) => (
            <div className={styles.marketBox} key={webinar.link}>
              <p>{webinar.title}</p>
              <Link to={webinar.link}>{"Watch now >"}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
