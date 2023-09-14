import React from 'react';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';
('/src/components/AboutUsUpdate/person');
import Person from '/src/components/AboutUsUpdate/person';
import people from '/static/data/people.json';
import { ButtonContainer } from '../../../theme/Buttons';

export default function Press() {
  return (
    <div className={styles.teamBG}>
      <div className="container" id="meet_the_team">
        <div className={styles.box}>
          <h1>Press</h1>
          <p className="text-center">
            Latest news, updates, and press releases.
          </p>
        </div>
        <div className={styles.parent}>
          <div className={styles.div1}> </div>
          <div className={styles.div2}> </div>
          <div className={styles.div3}> </div>
        </div>
        <div className={styles.buttonsContainer}>
          <Link className={styles.buttonOutline} to="/company/careers">
            Go to Playbook
          </Link>
        </div>
      </div>
    </div>
  );
}
