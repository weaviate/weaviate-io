import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';
import Typewriter from './typingTitle';
import CodeSnippet from './CodeSnippet';

export default function HomepageHeader() {
  const codeExample = `collection = (    
    client.collections    
    .get("Article")
 )
 
 # Find relevant articles
 # with hybrid search
 response = (    
      collection.query    
      .hybrid(        
          query="Generative AI",        
          limit=2  
        )
 )
`;

  const codeExample2 = `{
    Get {
     Article(
      hybrid: {
        query: "Board games people
        are looking out for"
      }
     limit: 10
   ) {
     summary
     title
     url
     wordCount
    }
  }
  }`;

  const codeExample3 = `{
  Get {
   Article(
    ask: {
      question: "What movie did
      Ravensburger create
      a board game about?"
}
   limit: 1
 ) {
   summary
   title
   url
   wordCount
   _additional{
    answer{
      result
      }
    }
  }
}
}`;

  return (
    <header className={styles.headerHome}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.img} />

          <p className={styles.title}>
            <Typewriter />
          </p>
          <p className={styles.text}>
            Weaviate is an open source, AI-native vector database that helps
            <br></br>
            developers create intuitive and reliable AI-powered applications.
          </p>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonGradient}
              to="https://console.weaviate.cloud"
            >
              Start Free
            </Link>
            <Link
              className={styles.buttonOutline}
              to="https://weaviate.io/developers/weaviate"
            >
              Documentation
            </Link>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.codeBlock}>
            <div className={styles.codeBlockContent}>
              <div className={styles.codeBlockContentLeft}>
                <h2>HYBRID SEARCH</h2>
                <p className={styles.subTitle}>
                  Unlock better insights for your customers
                </p>
                <p>
                  Push the limits of search across unstructured data. Combine
                  the best of keyword and vector search with ML models to
                  deliver fast, relevant, contextual results to your users.
                </p>
              </div>

              <div className={styles.codeBlockContentRight}>
                <div className={styles.codeBlockTitle} />
                <div className={styles.lineBar} />
                <CodeSnippet code={codeExample} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <h2 className={styles.text}>
            Loved by developers and trusted by companies of all sizes<br></br>to
            power search and generative applications
          </h2>
          <div className={styles.innerBar}>
            <div className={styles.logoSection}>
              <div
                className={`${styles.customerLogo} ${styles.stackoverflowLogo}`}
              />
              <div
                className={`${styles.customerLogo} ${styles.instabaseLogo}`}
              />
              <div className={`${styles.customerLogo} ${styles.redhatLogo}`} />
              <div className={`${styles.customerLogo} ${styles.mulinyLogo}`} />
              <div className={`${styles.customerLogo} ${styles.shippoLogo}`} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
