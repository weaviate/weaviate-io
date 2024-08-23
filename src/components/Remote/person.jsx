import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function Person(props) {
  const { details } = props;
  return (
    <div className={`${styles.person} ${details.team}`}>
      <img src={'/img/people/team/' + details.photo} />
      <h3>{details.name}</h3>
      <span>{details.title}</span>
      <br></br>
      <div className={styles.personLinks}>
        {details.linkedin != null && (
          <Link to={'https://linkedin.com/in/' + details.linkedin}>
            <i className="fab fa-lg fa-linkedin-in"></i>
          </Link>
        )}

        {details.twitter != null && (
          <Link to={'https://twitter.com/' + details.twitter}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
          </Link>
        )}

        {details.github != null && (
          <Link to={'https://github.com/' + details.github}>
            <i className="fab fa-lg fa-github"></i>
          </Link>
        )}
      </div>
    </div>
  );
}
