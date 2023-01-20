import Link from '@docusaurus/Link';
import { stubArray } from 'lodash';
import React from 'react';
import styles from './styles.module.scss';

export function LinkButton({children, link, newTab=true}) {
  return (
    <div className={styles.buttons}>
      <Link className={styles.btn}
        to={link}
        target={newTab ? '_blank' : '_self'}
      >{children}</Link>
    </div>
  );
}

export function LinkButtonAccent({children, link, newTab=true}) {
  return (
    <div className={styles.buttons}>
      <Link className={styles.btnAccent}
        to={link}
        target={newTab ? '_blank' : '_self'}
      >{children}</Link>
    </div>
  );
}

export function DownloadButton({children, link, newTab=true}) {
  return (
    <a className={styles.btn} href={link} download>{children}</a>
  );
}

export function ButtonContainer({children, position="center"}) {
  let style = styles.buttons;
  switch(position) {
    case "left":
      style += " " + styles.left;
      break;
    case "right":
      style += " " + styles.right;
  }

  return (
    <div className={style}>
      {children}
    </div>
  );
}