import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import appData from '/data/apps.json'; // Ensure this path is correct
import AppCard from './card';
import styles from './styles.module.scss';

const categoryDescriptions = {
  All: 'Browse all available apps.',
  'Vector Database': (
    <>
      Weaviate’s{' '}
      <u>
        <a href="">open-source datbase</a>
      </u>{' '}
      can be self-hosted or run as a managed service in Weaviate Cloud to reduce
      operational overhead.
    </>
  ),
  'Weaviate Agents':
    'Pre-built agentic workflows that dynamically interact with your data in Weaviate to perform sync, async, and multi-step tasks.',
  'Embeddings and Integrations':
    'Services and integrations to simplify end-to-end AI-native application development.',
  'Cloud Console Tools':
    'Tools that improve developer experience and accessibility within Weaviate Cloud console.',
};

export default function AppFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Add sorting logic here
  const sortedApps = (apps) => {
    return apps.sort((a, b) => a.id - b.id); // Sort by numeric `id`
  };

  const filteredApps = sortedApps(
    appData.filter((app) => {
      return (
        (selectedCategory === 'All' || app.category === selectedCategory) &&
        (app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    })
  );

  const renderCardsByCategory = (category) => {
    const appsInCategory = filteredApps.filter(
      (app) => app.category === category
    );
    if (appsInCategory.length === 0) return null;

    return (
      <div
        key={category}
        id={category === 'Weaviate Agents' ? 'weaviate-agents' : ''}
        className={styles.categorySection}
      >
        <h2>{category === 'Weaviate Agents' ? 'Agents' : category}</h2>
        <p className={styles.categoryDescriptions}>
          {categoryDescriptions[category]}
        </p>
        <div className={styles.cardContainer}>
          {appsInCategory.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className={styles.appContainer}>
        <div className={styles.sidebar}>
          {location.pathname === '/workbench' ? (
            <>
              <input
                type="text"
                placeholder="Search apps..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
              <ul className={styles.categoryList}>
                <li
                  onClick={() => handleCategoryChange('All')}
                  className={selectedCategory === 'All' ? styles.active : ''}
                >
                  All Categories
                </li>
                <li
                  onClick={() => handleCategoryChange('Cloud Tools')}
                  className={
                    selectedCategory === 'Cloud Tools' ? styles.active : ''
                  }
                >
                  Cloud Tools
                </li>
                <li
                  onClick={() => handleCategoryChange('AI-Native Services')}
                  className={
                    selectedCategory === 'AI-Native Services'
                      ? styles.active
                      : ''
                  }
                >
                  AI-Native Services
                </li>
              </ul>
            </>
          ) : (
            <Link to="/marketplace" className={styles.backButton}>
              Back to Marketplace
            </Link>
          )}
        </div>
        <div className={styles.mainContent}>
          {selectedCategory === 'All' ? (
            <>
              {Object.keys(categoryDescriptions).map(
                (category) =>
                  category !== 'All' && renderCardsByCategory(category)
              )}
            </>
          ) : (
            <>
              <h2>
                {selectedCategory === 'Weaviate Agents'
                  ? 'Agents'
                  : selectedCategory}
              </h2>

              <p className={styles.categoryDescriptions}>
                {selectedCategory === 'Weaviate Agents'
                  ? 'Agents'
                  : categoryDescriptions[selectedCategory]}
              </p>

              <div className={styles.cardContainer}>
                {filteredApps.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
