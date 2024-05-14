import React from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../theme/Buttons';

export default function HomepageWhatYouCanDo() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2 className={styles.title}>What you can do with Weaviate</h2>
        <p className={styles.subtitle}>
          Beyond search, Weaviate's next-gen vector database can power a wide
          range of innovative apps.
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
                  Perform lightning-fast pure vector similarity search over raw
                  vectors or data objects, even with filters.
                </p>
              </Tabs.Trigger>
              <Tabs.Trigger className={styles.tabsTrigger} value="tab2">
                <h3>Hybrid Search</h3>
                <p>
                  Combine keyword-based search with vector search techniques for
                  state-of-the-art results.
                </p>
              </Tabs.Trigger>
              <Tabs.Trigger className={styles.tabsTrigger} value="tab3">
                <h3>Generative Search</h3>
                <p>
                  Use any generative model in combination with your data, for
                  example to do Q&A over your dataset.
                </p>
              </Tabs.Trigger>
            </Tabs.List>
          </div>
          <div className={styles.right}>
            <Tabs.Content className={styles.tabsContent} value="tab1">
              <div className={styles.codeContainer}>
                <p className={styles.codeImage + ' ' + styles.code1}></p>
                <ButtonContainer position="left">
                  <LinkButton link="https://console.weaviate.cloud/console/query#weaviate_uri=https://demo.dataset.playground.semi.technology&graphql_query=%7B%0A%20%20Get%20%7B%0A%20%20%20%20Publication(%0A%20%20%20%20%20%20nearText%3A%20%7B%0A%20%20%20%20%20%20%20%20concepts%3A%20%5B%22fashion%22%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20limit%3A%201%0A%20%20%20%20)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20_additional%20%7B%0A%20%20%20%20%20%20%20%20certainty%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%20%20vector%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D">
                    Try Vector Search
                  </LinkButton>
                </ButtonContainer>
              </div>
            </Tabs.Content>
            <Tabs.Content className={styles.tabsContent} value="tab2">
              <div className={styles.codeContainer}>
                <p className={styles.codeImage + ' ' + styles.code2}></p>

                <ButtonContainer position="left">
                  <LinkButton link="https://console.weaviate.cloud/console/query#weaviate_uri=https://demo.dataset.playground.semi.technology&graphql_query=%7B%0A%20%20Get%20%7B%0A%20%20%20%20Article(%0A%20%20%20%20%20%20hybrid%3A%20%7B%0A%20%20%20%20%20%20%20%20query%3A%20%22Board%20games%20people%20are%20looking%20out%20for%22%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20limit%3A%2010%0A%20%20%20%20)%20%7B%0A%20%20%20%20%20%20summary%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20url%0A%20%20%20%20%20%20wordCount%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D">
                    Try Hybrid Search
                  </LinkButton>
                </ButtonContainer>
              </div>
            </Tabs.Content>
            <Tabs.Content className={styles.tabsContent} value="tab3">
              <div className={styles.codeContainer}>
                <p className={styles.codeImage + ' ' + styles.code3}></p>
                <ButtonContainer position="left">
                  <LinkButton link="https://console.weaviate.cloud/console/query#weaviate_uri=https://demo.dataset.playground.semi.technology&graphql_query=%7B%0A%20%20Get%20%7B%0A%20%20%20%20Article(%0A%20%20%20%20%20%20ask%3A%20%7B%0A%20%20%20%20%20%20%20%20question%3A%20%22What%20movie%20did%20Ravensburger%20create%20a%20board%20game%20about%3F%22%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20limit%3A%201%0A%20%20%20%20)%20%7B%0A%20%20%20%20%20%20summary%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20url%0A%20%20%20%20%20%20wordCount%0A%20%20%20%20%20%20_additional%20%7B%0A%20%20%20%20%20%20%20%20answer%20%7B%0A%20%20%20%20%20%20%20%20%20%20result%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D">
                    Try Generative Search
                  </LinkButton>
                </ButtonContainer>
              </div>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </div>
    </div>
  );
}
