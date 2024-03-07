import React from 'react';
import { ButtonContainer } from '../../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Integrations() {
  return (
    <div className={styles.integrationsSection}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.right}>
            <h2>20+ Ecosystem Integrations</h2>
            <p>Move faster with direct integration into the ML ecosystem.</p>
          </div>
        </div>
      </div>

      <div className={styles.integrationsLogos} id={'interLogos'}>
        <div className={styles.inside}>
          <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-openai">
            <div className={styles.logoBg}>
              <span className={styles.logoGoogle} />
            </div>
          </Link>
          <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-cohere">
            <div className={styles.logoBg}>
              <span className={styles.logoCo} />
            </div>
          </Link>
          <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-openai">
            <div className={styles.logoBg}>
              <span className={styles.logoAI} />
            </div>
          </Link>
          <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-huggingface">
            <div className={styles.logoBg}>
              <span className={styles.logoH} />
            </div>
          </Link>
          <Link to="https://haystack.deepset.ai/integrations/weaviate-document-store">
            <div className={styles.logoBg}>
              <span className={styles.logoHaystack} />
            </div>
          </Link>
          <Link to="https://github.com/weaviate/st-weaviate-connection">
            <div className={styles.logoBg}>
              <span className={styles.logoStreamlit} />
            </div>
          </Link>
        </div>

        <div className={styles.inside}>
          <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-openai">
            <div className={styles.logoBg}>
              <span className={styles.logoGoogle} />
            </div>
          </Link>
          <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-cohere">
            <div className={styles.logoBg}>
              <span className={styles.logoCo} />
            </div>
          </Link>
          <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-openai">
            <div className={styles.logoBg}>
              <span className={styles.logoAI} />
            </div>
          </Link>
          <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-huggingface">
            <div className={styles.logoBg}>
              <span className={styles.logoH} />
            </div>
          </Link>
          <Link to="https://haystack.deepset.ai/integrations/weaviate-document-store">
            <div className={styles.logoBg}>
              <span className={styles.logoHaystack} />
            </div>
          </Link>
          <Link to="https://github.com/weaviate/st-weaviate-connection">
            <div className={styles.logoBg}>
              <span className={styles.logoStreamlit} />
            </div>
          </Link>
        </div>
      </div>

      <div className="container">
        <div className={styles.teamContainer}>
          <h3>
            Our team and community are here to support you at every stage of
            your AI journey.
          </h3>

          <div className={styles.parentGrid}>
            <div className={styles.imageGrid1}> </div>
            <div className={styles.imageGrid2}> </div>
            <div className={styles.imageGrid3}> </div>
            <div className={styles.imageGrid4}> </div>
            <div className={styles.imageGrid5}> </div>
            <div className={styles.imageGrid6}> </div>
          </div>
          <div className={styles.mobileImage}></div>
        </div>
      </div>
    </div>
  );
}
