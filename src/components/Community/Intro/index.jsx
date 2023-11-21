import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function Intro() {
  return (
    <div className={styles.introBg}>
      <div className="container">
        <div className={styles.title}>
          <h2>Check out our video tutorials, workshops and news on Youtube</h2>
        </div>
        <div className={styles.grid}>
          <iframe
            width="460"
            height="300"
            src="https://www.youtube.com/embed/C-UQwvO8Koc?si=cse2jwc0tiQtq0hA"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <iframe
            width="460"
            height="300"
            src="https://www.youtube.com/embed/MQgm126pKkU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <iframe
            width="460"
            height="300"
            src="https://www.youtube.com/embed/IiNDCPwmqF8"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div className={styles.buttons}>
          <Link className={styles.buttonGradient} href="#">
            Explore Youtube Archive
          </Link>
        </div>
      </div>
    </div>
  );
}
