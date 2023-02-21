import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export function LinkButton({children, link, color='main', newTab=true}) {
  let style = styles.btn;
  switch(color) {
    case 'accent':
      style += ' ' + styles.btnAccent;
      break;
      case 'outlined':
        style += ' ' + styles.btnOutlined;
        break;
    default:
      style += ' ' + styles.btnMain;
  }

  return (
    <Link className={style}
      to={link}
      target={newTab ? '_blank' : '_self'}
    >{children}</Link>
  );
}

export function DownloadButton({children, link, color='main', newTab=true}) {
  let style = styles.btn;
  switch(color) {
    case 'accent':
      style += ' ' + styles.btnAccent;
      break;
    default:
      style += ' ' + styles.btnMain;
  }

  return (
    <a className={style} href={link} download>{children}</a>
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