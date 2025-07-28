import React from 'react';
import styles from './styles.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.socials}>
          <a
            href="https://github.com/weaviate/weaviate"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href="https://weaviate.io/slack"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Slack"
          >
            <i className="fa-brands fa-slack"></i>
          </a>
          <a
            href="https://x.com/weaviate_io"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
          </a>
          <a
            href="https://instagram.com/weaviate.io"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://youtube.com/@Weaviate"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/weaviate-io"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>

        <div className={styles.copy}>
          © {new Date().getFullYear()} Weaviate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
