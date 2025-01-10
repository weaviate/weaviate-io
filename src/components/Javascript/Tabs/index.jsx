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
  const reactData = posts.react;
  const vueData = posts.vue;
  const otherData = posts.others;

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabSelect = (index) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="">
      <section className="featured-projects">
        <div className="container">
          <div className={styles.header}>
            <h2>Example Apps</h2>
            <p>
              Find example applications to speed up your development. Available
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
                React
              </Tab>
              <Tab
                className={`${styles.tabs} ${
                  activeTabIndex === 2 ? styles.selectedTab : ''
                }`}
                onClick={() => handleTabSelect(2)}
              >
                Vue
              </Tab>
              <Tab
                className={`${styles.tabs} ${
                  activeTabIndex === 3 ? styles.selectedTab : ''
                }`}
                onClick={() => handleTabSelect(3)}
              >
                Others
              </Tab>
            </TabList>

            <TabPanel>
              <div className={styles.latestModule}>
                {reactData.map((post) => {
                  return <TabCard key={post.tagline} details={post} />;
                })}
              </div>
            </TabPanel>

            <TabPanel>
            <div className={styles.latestModule}>
                {vueData.map((post) => {
                  return <TabCard key={post.tagline} details={post} />;
                })}
              </div>
            </TabPanel>

            <TabPanel>
            <div className={styles.latestModule}>
                {otherData.map((post) => {
                  return <TabCard key={post.tagline} details={post} />;
                })}
              </div>
            </TabPanel>

            
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default ProjectTabs;
