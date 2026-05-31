import React from "react";
import styles from "./Header/styles.module.scss";
import KnowledgeSearch from "./knowledgeSearch";

export default function KnowledgeHeader({ searchQuery, onSearchChange }) {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>Weaviate Knowledge Cards</h1>

          <div className={styles.headerBox}>
            <p>
              Unlock the power of vector search. Our guides will help you
              understand vector embeddings and build better AI applications.
            </p>
          </div>

          <div className={styles.searchContainer}>
            <KnowledgeSearch
              searchQuery={searchQuery}
              onSearch={onSearchChange}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
