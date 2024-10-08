import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

import posts from '/data/templates.json';
import TabCard from '../Tabs/tabCard';


export default function Details() {
  const option2Data = posts.javascript;

  return (
    <div className={styles.bgCol}>
      <div className="container">
      <div className={styles.serviceBox}>
          <div className={styles.serviceText}>
            {/*  <div className={styles.serviceIcon}></div> */}

            <h2> 👨🏽‍💻Getting Started</h2>

            <p>
              1. Install the client
            </p>
            <code>
              npm install weaviate-client
            </code>
            <p>
              2. Search!!
            </p>
           
          </div>
          <div className={styles.serviceImage}></div>

        </div>

        <div className={styles.header}>
          <h2>Resources</h2>
          <p> Use cases specific, step-by-step resources to help you build AI-Native Applications in Javascript</p>
          
        </div>
        <Tabs>
            <TabList>
              <Tab>Site Search</Tab>
              <Tab>Chatbots </Tab>
              <Tab>eCommerce</Tab>
              <Tab>Automation</Tab>
            </TabList>

            <TabPanel>
            <div className={styles.typeContainer}>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={styles.homeIcon}></div>
              <h2>1. Getting Started with Vector Search</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Understand the concepts and technology behind Vector Search.
              </p>
              <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/concepts/search"
              >
                Learn more
              </Link>
            </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.search}`}></div>
              <h2>2. Using Machine Learning Models</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Learn how to pick and use various Machine Learning models.
              </p>
              <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/concepts/modules"
              >
                Learn more
              </Link>
            </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.scale}`}></div>
              <h2>3. Building Web Applications </h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Learn how to build production ready full-stack Web Applications.
              </p>
              <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/model-providers"
              >
                Learn more
              </Link>
            </p>
            </div>
          </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className={styles.typeContainer}>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={styles.homeIcon}></div>
              <h2>1. Getting Started with Vector Search</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Understand the concepts and technology behind Vector Search.
              </p>
              <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/concepts/search"
              >
                Learn more
              </Link>
            </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.search}`}></div>
              <h2>2. Using Machine Learning Models</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Learn how to pick and use various Machine Learning models.
              </p>
              <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/concepts/modules"
              >
                Learn more
              </Link>
            </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.scale}`}></div>
              <h2>3. Building Web Applications </h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Learn how to build production ready full-stack Web Applications.
              </p>
              <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/model-providers"
              >
                Learn more
              </Link>
            </p>
            </div>
          </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className={styles.typeContainer}>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={styles.homeIcon}></div>
              <h2>1. Getting Started with Vector Search</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Understand the concepts and technology behind Vector Search.
              </p>
              <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/concepts/search"
              >
                Learn more
              </Link>
            </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.search}`}></div>
              <h2>2. Using Machine Learning Models</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Learn how to pick and use various Machine Learning models.
              </p>
              <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/concepts/modules"
              >
                Learn more
              </Link>
            </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.scale}`}></div>
              <h2>3. Building Web Applications </h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Learn how to build production ready full-stack Web Applications.
              </p>
              <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/model-providers"
              >
                Learn more
              </Link>
            </p>
            </div>
          </div>
              </div>
            </TabPanel>

            <TabPanel>
            <div className={styles.typeContainer}>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={styles.homeIcon}></div>
              <h2>1. Getting Started with Vector Search</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Understand the concepts and technology behind Vector Search.
              </p>
              <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/concepts/search"
              >
                Learn more
              </Link>
            </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.search}`}></div>
              <h2>2. Using Machine Learning Models</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Learn how to pick and use various Machine Learning models.
              </p>
              <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/concepts/modules"
              >
                Learn more
              </Link>
            </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.scale}`}></div>
              <h2>3. Building Web Applications </h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Learn how to build production ready full-stack Web Applications.
              </p>
              <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/model-providers"
              >
                Learn more
              </Link>
            </p>
            </div>
          </div>
        </div>
            </TabPanel>

          </Tabs>
        
        
      </div>
      <header className={styles.headerHome}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.box}>
            <span>Get inspired</span>
            <h1>build with Weaviate</h1>
            <p>
              Look at how developers are building with Weaviate.
            </p>
            <div className={styles.buttons}>
              
              <Link className={styles.buttonOutline} to="https://replit.com/@malgamves/Weaviate-Typescript-Quickstart#index.ts">
              find out
              </Link>
            </div>
          </div>
          <div className={styles.exampleBox}></div>
        </div>
      </div>
    </header>
    </div>
  );
}
