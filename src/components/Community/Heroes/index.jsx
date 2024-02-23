import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { TwitterTweetEmbed } from 'react-twitter-embed';

export default function Heroes() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Meet our Heroes</h2>
      </div>
      <div className={styles.box}>
        <div className={styles.card}>
          <img className={styles.profile} src={'/img/people/team/erika.png'} />
          <span>Ron Parker</span>
          <span>Engineer</span>
          <div className={styles.personLinks}>
            <Link to={'https://linkedin.com/in/'}>
              <i className="fab fa-lg fa-linkedin-in"></i>
            </Link>

            <Link to={'https://twitter.com/'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </Link>

            <Link to={'https://github.com/'}>
              <i className="fab fa-lg fa-github"></i>
            </Link>
          </div>
        </div>
        <div className={styles.card}>
          <img className={styles.profile} src={'/img/people/team/erika.png'} />
          <span>Ron Parker</span>
          <span>Engineer</span>
          <div className={styles.personLinks}>
            <Link to={'https://linkedin.com/in/'}>
              <i className="fab fa-lg fa-linkedin-in"></i>
            </Link>

            <Link to={'https://twitter.com/'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </Link>

            <Link to={'https://github.com/'}>
              <i className="fab fa-lg fa-github"></i>
            </Link>
          </div>
        </div>
        <div className={styles.card}>
          <img className={styles.profile} src={'/img/people/team/erika.png'} />
          <span>Ron Parker</span>
          <span>Engineer</span>
          <div className={styles.personLinks}>
            <Link to={'https://linkedin.com/in/'}>
              <i className="fab fa-lg fa-linkedin-in"></i>
            </Link>

            <Link to={'https://twitter.com/'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </Link>

            <Link to={'https://github.com/'}>
              <i className="fab fa-lg fa-github"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
