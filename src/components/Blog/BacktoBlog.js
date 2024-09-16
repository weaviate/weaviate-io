// src/components/Blog/BacktoBlog.js
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';


const BackToBlogHub = () => (

    <Link to="/blog" className={styles.blogHome}>
      ← Back to Blogs
    </Link>

);

export default BackToBlogHub;
