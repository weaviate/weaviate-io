import React from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Use() {
  return (
    <div className={styles.integrationsSection}>
      <p> i'm building.... </p>

      <div className={styles.integrationsLogos} id={'interLogos'}>
        <div className={styles.inside}>
          <Link to="/developers/weaviate/model-providers/openai/embeddings">
            <div className={styles.logoBg}>
              <p className={styles.logoAI}>Agents Automation</p>
            </div>
          </Link>
          <Link to="/developers/weaviate/model-providers/cohere/embeddings">
            <div className={styles.logoBg}>
            <p className={styles.logoAI}>eCommerce Sites</p>
            </div>
          </Link>
          <Link to="/developers/weaviate/model-providers/openai/embeddings">
            <div className={styles.logoBg}>
            <p className={styles.logoAI}>Vector Search</p>
            </div>
          </Link>
          <Link to="/developers/weaviate/model-providers/openai/embeddings">
            <div className={styles.logoBg}>
            <p className={styles.logoAI}>RAG Applications</p>
            </div>
          </Link>
          <Link to="/developers/weaviate/model-providers/openai/embeddings">
            <div className={styles.logoBg}>
              <p className={styles.logoAI}>Agents Automation</p>
            </div>
          </Link>
          <Link to="/developers/weaviate/model-providers/cohere/embeddings">
            <div className={styles.logoBg}>
            <p className={styles.logoAI}>eCommerce Sites</p>
            </div>
          </Link>
          <Link to="/developers/weaviate/model-providers/openai/embeddings">
            <div className={styles.logoBg}>
            <p className={styles.logoAI}>Vector Search</p>
            </div>
          </Link>
          <Link to="/developers/weaviate/model-providers/openai/embeddings">
            <div className={styles.logoBg}>
            <p className={styles.logoAI}>RAG Applications</p>
            </div>
          </Link>
          
        </div>

      
      </div>

      <div className={styles.safetyTypeBottom} />
    </div>
  );
}
