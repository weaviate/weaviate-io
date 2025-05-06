import React, { useState } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import * as Tabs from '@radix-ui/react-tabs';

export default function WhatYouCanDo() {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabs = [
    {
      value: 'tab1',
      header: 'AI-native, developer-friendly',
      image: styles.codeImg1,
      para: 'Empower developers to build and scale modern AI applications more easily.',
      headerStyle: styles.tabHeader01,
    },
    {
      value: 'tab2',
      header: 'Cloud, model, and deployment agnostic',
      image: styles.codeImg2,
      para: 'Run anywhere and integrate with your existing and future tech stack.',
      headerStyle: styles.tabHeader02,
    },
    {
      value: 'tab3',
      header: 'Flexible cost-performance optimization',
      image: styles.codeImg3,
      para: 'Drive efficienct resource management, tailored to the needs of your use case.',
      headerStyle: styles.tabHeader03,
    },
    {
      value: 'tab4',
      header: 'Robust developer community and enablement resources',
      image: styles.codeImg4,
      para: 'Stay ahead of the curve with learning resources for developers of all levels.',
      headerStyle: styles.tabHeader04,
    },
  ];

  return (
    <div className={styles.bgContainer}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Why build with Weaviate</h2>
          <p className={styles.subtitle}>
            We’re with you at every stage of your AI journey. Our open source
            AI-native database empowers more developers to build and scale AI
            applications in production.
          </p>
        </div>

        <div className={styles.module}>
          <Tabs.Root
            className={styles.tabs}
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className={styles.left}>
              <Tabs.List
                className={styles.tabsList}
                aria-label="What you can do with Weaviate"
              >
                {tabs.map((tab, index) => (
                  <Tabs.Trigger
                    key={tab.value}
                    className={styles.tabsTrigger}
                    value={tab.value}
                  >
                    <h3 className={tab.headerStyle}>
                      {tab.header}
                      <span className={styles.toggleIcon}>
                        {activeTab === tab.value ? '–' : '+'}
                      </span>
                    </h3>
                    <div className={`${styles.cImage} ${tab.image}`} />
                    <p>{tab.para}</p>
                    <div className={styles.accordianBar}></div>
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </div>

            <div className={styles.right}>
              {tabs.map((tab, index) => (
                <Tabs.Content
                  key={tab.value}
                  className={styles.tabsContent}
                  value={tab.value}
                >
                  <div className={styles.codeContainer}>
                    <p className={styles.tabsText}>
                      {tab.value === 'tab1' &&
                        'Perform lightning-fast pure vector similarity search over raw vectors or data objects, even with filters.'}
                      {tab.value === 'tab2' &&
                        'Combine keyword-based search with vector search techniques for state-of-the-art results.'}
                      {tab.value === 'tab3' &&
                        'Use any generative model in combination with your data, for example to do Q&A over your dataset.'}
                      {tab.value === 'tab4' &&
                        'Use any generative model in combination with your data, for example to do Q&A over your dataset.'}
                    </p>
                    <div
                      className={`${styles.codeImage} ${
                        styles[`code${index + 1}`]
                      }`}
                    />
                  </div>
                </Tabs.Content>
              ))}
            </div>
          </Tabs.Root>
        </div>

        <div className={styles.priceBox}>
          <div className={`${styles.title} ${styles.supportTitle}`}>
            <div className={styles.titleBox}>
              <h3>Get the full pricing list for Enterprise Cloud</h3>
            </div>
            <p>
              Questions about pricing? Download the full Pricing list or{' '}
              <Link className={styles.underline} to="#contact-sales">
                contact our team
              </Link>{' '}
              for more info.
            </p>
          </div>
          <div className={styles.features}>
            <Link
              className={styles.supportLink}
              to="http://events.weaviate.io/pricing-download"
            >
              Request the Pricing List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
