import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function GetStarted() {
  return (
    <div className={styles.bgCol} id="get-started">
      <div className="container">
        <div className={styles.header}>
          <h2>Get Started</h2>
          <p>
            See what you can do with Weaviate through demos and hands-on guides.
          </p>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.typeContainer}>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={styles.homeIcon}></div>
                <h2>Quickstart guide</h2>
              </div>
              <div className={styles.typeText}>
                <p>Essential concepts demonstrated (20-30 minutes).</p>
                <ul>
                  <li>
                    <Link
                      className={`${styles.external} ${styles.bold}`}
                      to="/developers/weaviate/quickstart"
                    >
                      Quickstart: cloud
                    </Link>{' '}
                    (Weaviate Cloud & cloud inference API)
                  </li>
                  <li>
                    <Link
                        className={`${styles.external} ${styles.bold}`}
                        to="/developers/weaviate/quickstart/local"
                      >
                        Quickstart: local
                    </Link>{' '}
                    (Docker & Ollama)
                  </li>
                </ul>                        
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={`${styles.homeIcon} ${styles.workshops}`}></div>
                <h2>Live Online Workshops</h2>
              </div>
              <div className={styles.typeText}>
                <p>Instructor-led, live workshops for varying experience levels (60 minutes).</p>
                <ul>
                  <li>                
                    <Link 
                      className={`${styles.external} ${styles.bold}`}
                      to="/community/events"
                    >
                      Register here
                    </Link>{' '}
                    for workshops and other events.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`${styles.typeBox} ${styles.big}`}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.docs}`}></div>
              <h2>Docs: Starter guides</h2>
            </div>
            <div className={`${styles.typeText} ${styles.large}`}>
              <p>Guides for key topics.</p>
                <ul>
                  <li>
                    <Link
                      className={`${styles.external} ${styles.bold}`}
                      to="/developers/weaviate/connections"
                    >
                      Connect to Weaviate
                    </Link>
                  </li>    
                  <li>
                    <Link
                      className={`${styles.external} ${styles.bold}`}
                      to="/developers/weaviate/starter-guides/generative"
                    >
                      Generative search (RAG)
                    </Link>{' '}
                  </li>      
                  <li>
                    <Link
                      className={`${styles.external} ${styles.bold}`}
                      to="/developers/weaviate/starter-guides/which-weaviate"
                    >
                      Which Weaviate is right for me?
                    </Link>{' '}
                  </li>                     
                  <li>
                    <Link
                      className={`${styles.external} ${styles.bold}`}
                      to="/developers/weaviate/starter-guides/schema"
                    >
                      Collection definitions & data schema
                    </Link>{' '}
                  </li>   
                  <li>
                    <Link
                      className={`${styles.external} ${styles.bold}`}
                      to="/developers/weaviate/starter-guides/managing-resources"
                    >
                      Managing resources (hot, warm & cold)
                    </Link>{' '}
                  </li>                                                                                         
                </ul>          
              <Link
                to="/developers/weaviate/starter-guides"
                className={styles.button}
              >
                More <strong>starter guides</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
