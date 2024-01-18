import React from 'react';

import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../theme/Buttons';
import CodeSnippet from './CodeSnippet';

export default function HomepageWhatYouCanDo() {
  const codeExample = `{
    Get {
      Publication(
        nearText: {
          concepts: ["fashion"]
           limit: 1
     ) {
        name
        _additional {
           certainty
           distance
            vector
        }
     }
   }
  }
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
    <div className="container">
      <div className={styles.header}>
        <h2 className={styles.title}>クイックスタート</h2>
        <p className={styles.subtitle}></p>
      </div>

      <div className={styles.module}>
        <div className={`${styles.codeImage} ${styles.code1}`} />
      </div>
      <div className={styles.buttons}>
        <Link className={styles.buttonGradient} to="/platform">
          Learn More
        </Link>
        <Link className={styles.buttonOutline} to="/pricing">
          Pricing
        </Link>
      </div>
    </div>
  );
}
