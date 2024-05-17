import React from 'react';
import { ButtonContainer } from '../../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';
import JoinCommunity from '../JoinCommunityUpdate';

export default function HomepageIntegrations() {
  return (
    <>
      <div className={styles.integrationsSection}>
        <div className={styles.topImage}></div>
        <div className="container">
          <div className={styles.box}>
            <div className={styles.right}>
              <h2>Integrations</h2>
              <p>
                With Weaviate, you can bring your own vectors or choose one of
                our our out-of-the-box modules with support for vectorization.
                You can also easily connect to a wide variety of well-known
                neural search frameworks.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.integrationsLogos} id={'interLogos'}>
          <div className={styles.inside}>
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
            <Link to="https://weaviate.io/developers/weaviate/client-libraries/python#neural-search-frameworks">
              <div className={styles.logoBg}>
                <span className={styles.logoJ} />
              </div>
            </Link>

            <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-cohere">
              <div className={styles.logoBg}>
                <span className={styles.logoCo} />
              </div>
            </Link>
            <Link to="https://wpsolr.com/wpsolr-demos/">
              <div className={styles.logoBg}>
                <span className={styles.logoW} />
              </div>
            </Link>
            <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-palm">
              <div className={styles.logoBg}>
                <span className={styles.logoG} />
              </div>
            </Link>
            <Link to="https://weaviate.io/blog/combining-langchain-and-weaviate">
              <div className={styles.logoBg}>
                <span className={styles.logoL} />
              </div>
            </Link>
            <Link to="https://gpt-index.readthedocs.io/en/latest/examples/vector_stores/WeaviateIndexDemo.html">
              <div className={styles.logoBg}>
                <span className={styles.logoLa} />
              </div>
            </Link>
            <Link to="https://haystack.deepset.ai/integrations/weaviate-document-store">
              <div className={styles.logoBg}>
                <span className={styles.logoD} />
              </div>
            </Link>
          </div>

          <div className={styles.inside}>
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
            <Link to="https://weaviate.io/developers/weaviate/client-libraries/python#neural-search-frameworks">
              <div className={styles.logoBg}>
                <span className={styles.logoJ} />
              </div>
            </Link>
            <Link to="https://gpt-index.readthedocs.io/en/latest/examples/vector_stores/WeaviateIndexDemo.html">
              <div className={styles.logoBg}>
                <span className={styles.logoLa} />
              </div>
            </Link>
            <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-palm">
              <div className={styles.logoBg}>
                <span className={styles.logoG} />
              </div>
            </Link>
            <Link to="https://weaviate.io/blog/combining-langchain-and-weaviate">
              <div className={styles.logoBg}>
                <span className={styles.logoL} />
              </div>
            </Link>
            <Link to="https://haystack.deepset.ai/integrations/weaviate-document-store">
              <div className={styles.logoBg}>
                <span className={styles.logoD} />
              </div>
            </Link>
            <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-cohere">
              <div className={styles.logoBg}>
                <span className={styles.logoCo} />
              </div>
            </Link>
            <Link to="https://wpsolr.com/wpsolr-demos/">
              <div className={styles.logoBg}>
                <span className={styles.logoW} />
              </div>
            </Link>
          </div>
        </div>

        <div
          className={`${styles.integrationsLogos} ${styles.mobileIntegrations}`}
        >
          <div className={styles.inside}>
            <Link to="https://weaviate.io/blog/combining-langchain-and-weaviate">
              <div className={styles.logoBg}>
                <span className={styles.logoL} />
              </div>
            </Link>
            <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-huggingface">
              <div className={styles.logoBg}>
                <span className={styles.logoH} />
              </div>
            </Link>
            <Link to="https://wpsolr.com/wpsolr-demos/">
              <div className={styles.logoBg}>
                <span className={styles.logoW} />
              </div>
            </Link>
            <Link to="https://gpt-index.readthedocs.io/en/latest/examples/vector_stores/WeaviateIndexDemo.html">
              <div className={styles.logoBg}>
                <span className={styles.logoLa} />
              </div>
            </Link>
            <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-palm">
              <div className={styles.logoBg}>
                <span className={styles.logoG} />
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
            <Link to="https://haystack.deepset.ai/integrations/weaviate-document-store">
              <div className={styles.logoBg}>
                <span className={styles.logoD} />
              </div>
            </Link>
            <Link to="https://weaviate.io/developers/weaviate/client-libraries/python#neural-search-frameworks">
              <div className={styles.logoBg}>
                <span className={styles.logoJ} />
              </div>
            </Link>
          </div>

          <div className={styles.inside}>
            <Link to="https://gpt-index.readthedocs.io/en/latest/examples/vector_stores/WeaviateIndexDemo.html">
              <div className={styles.logoBg}>
                <span className={styles.logoLa} />
              </div>
            </Link>
            <Link to="https://weaviate.io/developers/weaviate/client-libraries/python#neural-search-frameworks">
              <div className={styles.logoBg}>
                <span className={styles.logoJ} />
              </div>
            </Link>
            <Link to="https://wpsolr.com/wpsolr-demos/">
              <div className={styles.logoBg}>
                <span className={styles.logoW} />
              </div>
            </Link>

            <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-huggingface">
              <div className={styles.logoBg}>
                <span className={styles.logoH} />
              </div>
            </Link>
            <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-palm">
              <div className={styles.logoBg}>
                <span className={styles.logoG} />
              </div>
            </Link>
            <Link to="https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-openai">
              <div className={styles.logoBg}>
                <span className={styles.logoAI} />
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
            <Link to="https://weaviate.io/blog/combining-langchain-and-weaviate">
              <div className={styles.logoBg}>
                <span className={styles.logoL} />
              </div>
            </Link>
            <Link to="https://haystack.deepset.ai/integrations/weaviate-document-store">
              <div className={styles.logoBg}>
                <span className={styles.logoD} />
              </div>
            </Link>
          </div>
        </div>
        <JoinCommunity />
      </div>
    </>
  );
}
