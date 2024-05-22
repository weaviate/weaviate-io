import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import heroes from '/data/heroes.json'; // Assuming this is the correct path to your JSON data

export default function Heroes() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Meet our Heroes</h2>
      </div>
      <div className={styles.box}>
        {heroes.map((person, index) => (
          <div key={index} className={styles.card}>
            <img
              className={styles.profile}
              src={person.image}
              alt={person.name}
            />
            <span className={styles.heroName}>{person.name}</span>
            <span>{person.title}</span>
            <div className={styles.personLinks}>
              {person.socialLinks.linkedin && (
                <Link to={person.socialLinks.linkedin}>
                  <i className="fab fa-lg fa-linkedin-in"></i>
                </Link>
              )}
              {person.socialLinks.twitter && (
                <Link to={person.socialLinks.twitter}>
                  <i className="fab fa-lg fa-twitter"></i>
                </Link>
              )}
              {person.socialLinks.github && (
                <Link to={person.socialLinks.github}>
                  <i className="fab fa-lg fa-github"></i>
                </Link>
              )}
              {person.socialLinks.slack && (
                <Link to={person.socialLinks.slack}>
                  <i className="fab fa-lg fa-slack"></i>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
