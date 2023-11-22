import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';
import Typewriter from './typingTitle';
import CodeSnippet from './CodeSnippet';

export default function HomepageHeader() {
  // State variable to toggle the visibility of the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // State variable to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState(0);

  // State variable to keep track of the text in the typeButton
  const [typeButtonText, setTypeButtonText] = useState('Hybrid Search');

  // Toggle dropdown visibility when the button is clicked
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle tab selection
  const handleTabSelect = (index, buttonText) => {
    setSelectedTab(index);
    setTypeButtonText(buttonText);
    setIsDropdownOpen(false); // Close the dropdown
  };

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
    <header>
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
            <div className={styles.codeBlockTitle} />
            <div className={styles.lineBar} />

            <button className={styles.typeButton} onClick={toggleDropdown}>
              <span>{typeButtonText}</span>
            </button>

            {/* Dropdown content */}
            {isDropdownOpen && (
              <div
                className={`${styles.dropdownContent} ${
                  isDropdownOpen ? styles.dropdownContentOpen : ''
                }`}
              >
                <ul>
                  {/* Create links for each tab */}
                  <li>
                    <a onClick={() => handleTabSelect(0, 'Hybrid Search')}>
                      <span>Hybrid Search</span>
                    </a>
                  </li>
                  <li>
                    <a onClick={() => handleTabSelect(1, 'Generative Search')}>
                      <span>Generative Search</span>
                    </a>
                  </li>
                  <li>
                    <a onClick={() => handleTabSelect(2, 'Vector Search')}>
                      <span>Vector Search</span>
                    </a>
                  </li>
                </ul>
              </div>
            )}

            <div className={styles.tabContent}>
              {selectedTab === 0 && (
                <div>
                  {' '}
                  <CodeSnippet code={codeExample} />
                </div>
              )}
              {selectedTab === 1 && (
                <div>
                  {' '}
                  <CodeSnippet code={codeExample2} />
                </div>
              )}
              {selectedTab === 2 && (
                <div>
                  {' '}
                  <CodeSnippet code={codeExample2} />
                </div>
              )}
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
