import Link from '@docusaurus/Link';
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

export function ButtonContainer({children}) {
  return (
    <div className={styles.buttons}>
      {children}
    </div>
  );
}