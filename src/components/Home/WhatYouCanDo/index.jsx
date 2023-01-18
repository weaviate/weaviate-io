import React from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';

export default function HomepageWhatYouCanDo() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2 className={styles.title}>What you can do with Weaviate</h2>
        <p className={styles.subtitle}>
          Weaviate's next-gen vector search engine can power a
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
                <h3>Vector Search</h3>
                <p>
                Perform lightning-fast pure vector search over raw vectors or similarity search over data objects.
                </p>
              </Tabs.Trigger>
              <Tabs.Trigger className={styles.tabsTrigger} value="tab2">
                <h3>Hybrid Search</h3>
                <p>
                Find data objects by automatically combining vector search with traditional search filters.
                </p>
              </Tabs.Trigger>
              <Tabs.Trigger className={styles.tabsTrigger} value="tab3">
                <h3>Generative Search</h3>
                <p>
                  Use any generative model in combination with your data, for example to do Q&A over your dataset.
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
