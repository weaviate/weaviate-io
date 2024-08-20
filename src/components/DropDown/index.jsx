import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

const removedLink = document.getElementById('removedLink');

export default function DropDown() {
  <Link to="/platform">
    <div className={styles.dropDown}>
      <span className={styles.dropDownLabel}>
        The AI-Native Vector Database
      </span>
      <div className={styles.dropDownThumbnail}></div>
      <span className={styles.dropDownText}>
        Build powerful, production-ready AI applications that scale. 
      </span>
    </div>
  </Link>;
}
