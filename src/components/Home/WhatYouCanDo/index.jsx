import React from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';

export default function HomepageWhatYouCanDo() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2 className={styles.title}>What you can do with Weaviate</h2>
        <p className={styles.subtitle}>
          Beyond search, Weaviate's next-gen vector search engine can power a
          wide range of innovative apps.
        </p>
      </div>
      <div className={styles.module}>
        <Tabs.Root className={styles.tabs} defaultValue="tab1">
          <div className={styles.left}>
            <Tabs.List
              className={styles.tabsList}
              aria-label="What you can do with Weaviate"
            >
              <Tabs.Trigger
                className={styles.tabsTrigger}
                value="tab1"
                disabled={false}
              >
                <h3>Search</h3>
                <p>
                  Go beyond keyword matching, find meaning in anything <br />{' '}
                  from images to molecules.
                </p>
              </Tabs.Trigger>
              <Tabs.Trigger className={styles.tabsTrigger} value="tab2">
                <h3>Recommendations</h3>
                <p>
                  Provide top match recommendations seamlessly with minimal
                  setup.
                </p>
              </Tabs.Trigger>
              <Tabs.Trigger className={styles.tabsTrigger} value="tab3">
                <h3>Integrations</h3>
                <p>
                  Use AI models, datasets and services such as GTP-3, Wikipedia
                  and Jira.
                </p>
              </Tabs.Trigger>
            </Tabs.List>
          </div>
          <div className={styles.right}>
            <Tabs.Content className={styles.tabsContent} value="tab1">
              <p className={styles.code}></p>
            </Tabs.Content>
            <Tabs.Content className={styles.tabsContent} value="tab2">
              <p className={styles.code}></p>
            </Tabs.Content>
            <Tabs.Content className={styles.tabsContent} value="tab3">
              <p className={styles.code}></p>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </div>
    </div>
  );
}
