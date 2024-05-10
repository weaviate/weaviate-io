import React from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../../theme/Buttons';
import Image from 'react';
import Link from '@docusaurus/Link';

export default function Resources() {
  return (
    <div className={styles.bgContain}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Developer Resources</h2>
          <p className={styles.subtitle}>
            Learn and explore the latest insights and trends in the AI world.
          </p>
        </div>
        <div className={styles.latestModule}>
          <div className={styles.resourceBox}>
            <div className={styles.resourceIcon}></div>
            <h3>Learning Centre</h3>
            <p> Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
          </div>
          <div className={styles.resourceBox}>
            <div className={styles.resourceIcon}></div>
            <h3>Build with Weaviate</h3>
            <p> Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
          </div>
          <div className={styles.resourceBox}>
            <div className={styles.resourceIcon}></div>
            <h3>Knowledge Cards</h3>
            <p> Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
          </div>
        </div>
        <div className={styles.latestModule}>
          <div className={styles.resourceBox}>
            <div className={styles.resourceIcon}></div>
            <h3>Events & Webinars</h3>
            <p> Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
          </div>
          <div className={styles.resourceBox}>
            <div className={styles.resourceIcon}></div>
            <h3>Blogs</h3>
            <p> Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
          </div>
          <div className={styles.resourceBox}>
            <div className={styles.resourceIcon}></div>
            <h3>Docs</h3>
            <p> Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
          </div>
        </div>
      </div>
    </div>
  );
}
