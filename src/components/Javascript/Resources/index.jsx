import React from 'react';
import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import paths from '/data/paths.json';

export default function Resources() {
  const resourcesSite = paths.siteSearch;
  const resourcesEcommerce = paths.ecommerce;
  const resourcesAutomation = paths.automation;
  const resourcesChatbots = paths.chatbots;

  const [activeTabIndex, setActiveTabIndex] = useState(0); // State to track the selected tab

  const handleTabSelect = (index) => {
    setActiveTabIndex(index); // Update the active tab index when a tab is clicked
  };

  const renderResourceBoxes = (resources) => {
    return resources.map((resource, index) => (
      <Link key={index} to={resource.link} className={styles.resourceBox}>
        <div className={styles.resourceTop}>
          <div className={styles.resourceNumber}>{index + 1}</div>
          <h3>{resource.title}</h3>
        </div>
        <p>{resource.description}</p>
      </Link>
    ));
  };

  return (
    <div className="container">
      <div className={styles.resourcesContainer}>
        <h2>Learn</h2>
        <p>
          Use case specific, step-by-step resources to help you build AI-Native
          Applications in JavaScript.
        </p>

        <Tabs
          className={styles.reactTabs}
          selectedIndex={activeTabIndex}
          onSelect={handleTabSelect}
        >
          <TabList className={styles.tabList}>
            <Tab
              className={`${styles.tabs} ${
                activeTabIndex === 0 ? styles.selectedTab : ''
              }`}
              onClick={() => handleTabSelect(0)}
            >
              Site Search
            </Tab>
            {/* coming soon, to be uncommented when other modules are done */}
            {/* <Tab
              className={`${styles.tabs} ${
                activeTabIndex === 1 ? styles.selectedTab : ''
              }`}
              onClick={() => handleTabSelect(1)}
            >
              Chatbots
            </Tab>
            <Tab
              className={`${styles.tabs} ${
                activeTabIndex === 2 ? styles.selectedTab : ''
              }`}
              onClick={() => handleTabSelect(2)}
            >
              eCommerce
            </Tab>
            <Tab
              className={`${styles.tabs} ${
                activeTabIndex === 3 ? styles.selectedTab : ''
              }`}
              onClick={() => handleTabSelect(3)}
            >
              Automation
            </Tab> */}
          </TabList>

          <TabPanel>
            <div className={styles.boxesGrid}>
              {renderResourceBoxes(resourcesSite)}
            </div>
          </TabPanel>

          <TabPanel>
            <div className={styles.boxesGrid}>
              {renderResourceBoxes(resourcesChatbots)}
            </div>
          </TabPanel>

          <TabPanel>
            <div className={styles.boxesGrid}>
              {renderResourceBoxes(resourcesEcommerce)}
            </div>
          </TabPanel>

          <TabPanel>
            <div className={styles.boxesGrid}>
              {renderResourceBoxes(resourcesAutomation)}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
