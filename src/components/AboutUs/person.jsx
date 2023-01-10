import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

import TwitterIcon from '@site/static/icons/twitter.svg';
import GitHubIcon from '@site/static/icons/github.svg';
import LinkedInIcon from '@site/static/icons/linkedin.svg';

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
            <LinkedInIcon title="LinkedIn" className={styles.icon} />
          </Link>
        }

        {details.twitter != null && 
          <Link to={"https://twitter.com/" + details.twitter}>
            <TwitterIcon title="Twitter" className={styles.icon} />
          </Link>
        }

        {details.github != null &&
          <Link to={"https://github.com/" + details.github}>
            <GitHubIcon title="GitHub" className={styles.icon} />
          </Link>
        }
      </div>
    </div>
  );
}
