import React, { useState } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

import paths from '/data/paths.json';

export default function Steps() {
  const resoursesSite = paths.siteSearch;
  const resoursesEcommerce = paths.ecommerce;
  const resoursesAutomation = paths.automation;
  const resoursesChatbots = paths.chatbots;

  return (
    <div className={styles.bgCol}>
      <div className="container">
        <div className={styles.header}>
          <h2>Resources</h2>
          <p>
            {' '}
            Use cases specific, step-by-step resources to help you build
            AI-Native Applications in Javascript
          </p>
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
              {resoursesSite.map((post) => {
                return (
                  <div className={styles.typeBox}>
                    <div className={styles.typeIcon}>
                      <div className={styles.homeIcon}></div>
                      <h2>{post.title}</h2>
                    </div>
                    <div className={styles.typeText}>
                      <p>{post.description}</p>
                      <p>
                        <Link className={styles.cardLink} to={post.Link}>
                          Learn more
                        </Link>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabPanel>

          <TabPanel>
            <div className={styles.typeContainer}>
              {resoursesChatbots.map((post) => {
                return (
                  <div className={styles.typeBox}>
                    <div className={styles.typeIcon}>
                      <div className={styles.homeIcon}></div>
                      <h2>{post.title}</h2>
                    </div>
                    <div className={styles.typeText}>
                      <p>{post.description}</p>
                      <p>
                        <Link className={styles.cardLink} to={post.Link}>
                          Learn more
                        </Link>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabPanel>

          <TabPanel>
            <div className={styles.typeContainer}>
              {resoursesEcommerce.map((post) => {
                return (
                  <div className={styles.typeBox}>
                    <div className={styles.typeIcon}>
                      <div className={styles.homeIcon}></div>
                      <h2>{post.title}</h2>
                    </div>
                    <div className={styles.typeText}>
                      <p>{post.description}</p>
                      <p>
                        <Link className={styles.cardLink} to={post.Link}>
                          Learn more
                        </Link>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabPanel>

          <TabPanel>
            <div className={styles.typeContainer}>
              {resoursesAutomation.map((post) => {
                return (
                  <div className={styles.typeBox}>
                    <div className={styles.typeIcon}>
                      <div className={styles.homeIcon}></div>
                      <h2>{post.title}</h2>
                    </div>
                    <div className={styles.typeText}>
                      <p>{post.description}</p>
                      <p>
                        <Link className={styles.cardLink} to={post.Link}>
                          Learn more
                        </Link>
                      </p>
                    </div>
                  </div>
                );
              })}
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
              <p>Look at how developers are building with Weaviate.</p>
              <div className={styles.buttons}>
                <Link
                  className={styles.buttonOutline}
                  to="https://replit.com/@malgamves/Weaviate-Typescript-Quickstart#index.ts"
                >
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
