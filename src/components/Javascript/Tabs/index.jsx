import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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

  return (
    <div className="">
      <section className="featured-projects">
        <div className="container">
          <div className="">
            <h2>Templates</h2>
            <p>
              Get template applications to speed up your development. Available for every use case.
            </p>
          </div>
          <Tabs>
            <TabList>
              <Tab>Vue</Tab>
              <Tab>Express</Tab>
              <Tab>React</Tab>
              <Tab>Angular</Tab>
            </TabList>

            <TabPanel>
              <div className="container">
                <div className={styles.header}>
                </div>
                <div className={styles.latestModule}>
                  {option2Data.map((post) => {
                    return <TabCard key={post.tagline} details={post} />;
                  })}
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="container">
                <h3> coming soon</h3>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="container">
                <h3> coming soon</h3>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="container">
                <h3> coming soon</h3>
              </div>
            </TabPanel>

          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default ProjectTabs;
