import React from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../theme/Buttons';
import Image from 'react';
import Link from '@docusaurus/Link';
import posts from '/data/blogposts.json';
import PlayItem from './playitem';

export default function Playbook() {
  const option2Data = posts.playbook;
  return (
    <div className="container">
      <div className={styles.header}>
        <h2 className={styles.title}>Playbook</h2>
        <p className={styles.subtitle}>
          In order to stay true to the open-source spirit as we grow, in this
          blog we want to share our company vision, culture and insights.
        </p>
      </div>
      <div className={styles.latestModule}>
        {option2Data.map((post) => {
          return <PlayItem key={post.tagline} details={post} />;
        })}
      </div>
      <div className={styles.buttons}>
        <Link className={styles.buttonOutline} to="/company/playbook">
          Go to Playbook
        </Link>
      </div>
    </div>
  );
}
