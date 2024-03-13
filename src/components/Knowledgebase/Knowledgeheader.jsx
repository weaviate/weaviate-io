import Link from '@docusaurus/Link';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';
import knowledge from '/data/knowledgecards.json';
import KnowledgeSearch from './knowledgeSearch';

export default function KnowledgeHeader({ searchQuery, onSearchChange }) {
  return (
    <header>
      <div className="container">
        <div className={styles.box}>
          <h1>Weaviate Knowledge Cards</h1>
          <div className={styles.headerBox}>
            <p className="text-center">
              Unlock the power of vector search. Our guides will help you
              conquer vector embeddings and build better AI applications.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.searchContainer}>
        <KnowledgeSearch searchQuery={searchQuery} onSearch={onSearchChange} />
      </div>
    </header>
  );
}
