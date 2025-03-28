import React, { useEffect, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import styles from './styles.module.scss';

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`${styles['sticky-header']} ${
        scrolled ? styles.scrolled : ''
      }`}
    >
      <div className={styles['header-inner']}>
        <img
          src="/img/site/weaviate-logo-horizontal-dark-1.svg"
          alt="Logo"
          className={styles.logo}
          onClick={() => history.push('/')}
        />
        <button
          onClick={() => history.push('#contact')}
          className={styles['cta-button']}
        >
          Contact
        </button>
      </div>
    </header>
  );
}
