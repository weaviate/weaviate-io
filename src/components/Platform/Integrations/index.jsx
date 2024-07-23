import React from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
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
        <div className={styles.boxes}>
          <div className={`${styles.card} ${styles.longCard}`}>
            <div className={styles.contentDiv}>
              <h3 className={styles.cTextColor}>
                “Weaviate's batteries-included approach, incorporating both
                model serving and multi-tenancy, has helped us quickly prototype
                and build our vector search at Stack.”
              </h3>
              <p>
                Constantine Kokkinos,<br></br> Stack Overflow
              </p>
              <div className={styles.buttons}>
                <Link
                  className={styles.buttonGradient}
                  to="https://console.weaviate.cloud/"
                >
                  Start Building with Weaviate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.safetyTypeBottom} />
    </div>
  );
}
