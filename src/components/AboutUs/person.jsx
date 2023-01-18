import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function Person(props) {
  const { details } = props;
  return (
    <div className={styles.person}>
      <img src={"/img/people/team/" + details.photo} />
      <h3>{details.name}</h3>
      <span>{details.title}</span>
      <div className={styles.personLinks}>
        {details.linkedin != null && 
          <Link to={"https://linkedin.com/in/" + details.linkedin}>
            <i className="fab fa-xl fa-linkedin"></i>
          </Link>
        }

        {details.twitter != null && 
          <Link to={"https://twitter.com/" + details.twitter}>
            <i className="fab fa-xl fa-twitter"></i>
          </Link>
        }

        {details.github != null &&
          <Link to={"https://github.com/" + details.github}>
            <i className="fab fa-xl fa-github"></i>
          </Link>
        }
      </div>
    </div>
  );
}
