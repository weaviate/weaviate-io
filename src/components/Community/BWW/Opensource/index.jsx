import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function Opensource() {
  return (
    <div className={styles.bg}>
      <div className="container">
        <div className={styles.title}>
          <h2>Spread the open source love 💚</h2>
          <p>
            Have a great project to share? Let us help you to spread the word
            and the love for open source! Whether you're a project owner looking
            to maximize visibility or a showcase client aiming to stand out on
            social media, our program provides the tools and support you need to
            succeed. Let’s make sure people see the amazing work you’re doing!
          </p>
        </div>
        <div className={styles.box}></div>
      </div>
    </div>
  );
}
