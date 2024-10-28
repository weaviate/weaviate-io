import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';
import styles from './styles.module.scss';
// import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../theme/Buttons';
import Image from 'react';
import Link from '@docusaurus/Link';
import posts from '/data/templates.json';
import TabCard from './tabCard';

const ProjectTabs = () => {
  const option2Data = posts.javascript;
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabSelect = (index) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="">
      <section className="featured-projects">
        <div className="container">
          <div className={styles.header}>
            <h2>Templates</h2>
            <p>
              Get template applications to speed up your development. Available
              for every use case.
            </p>
          </div>
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
                Vue
              </Tab>
              <Tab
                className={`${styles.tabs} ${
                  activeTabIndex === 1 ? styles.selectedTab : ''
                }`}
                onClick={() => handleTabSelect(1)}
              >
                Express
              </Tab>
              <Tab
                className={`${styles.tabs} ${
                  activeTabIndex === 2 ? styles.selectedTab : ''
                }`}
                onClick={() => handleTabSelect(2)}
              >
                React
              </Tab>
              <Tab
                className={`${styles.tabs} ${
                  activeTabIndex === 3 ? styles.selectedTab : ''
                }`}
                onClick={() => handleTabSelect(3)}
              >
                Angular
              </Tab>
            </TabList>

            <TabPanel>
              <div className={styles.latestModule}>
                {option2Data.map((post) => {
                  return <TabCard key={post.tagline} details={post} />;
                })}
              </div>
            </TabPanel>

            <TabPanel>
              <div className="container">
                <h3>Coming Soon</h3>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="container">
                <h3>Coming Soon</h3>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="container">
                <h3>Coming Soon</h3>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default ProjectTabs;
