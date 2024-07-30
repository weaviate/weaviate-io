import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import appData from '/data/apps.json'; // Ensure this path is correct
import AppCard from './card';
import styles from './styles.module.scss';

const categoryDescriptions = {
  All: 'Browse all available apps.',
  'Cloud Tools':
    'Improve developer experience and accessibility for non-technical users. Available only in Weaviate Cloud.',
  'AI-Native Apps': 'Simplify the development of end-to-end AI solutions.',
};

export default function AppFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();

  useEffect(() => {
    console.log(appData);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredApps = appData.filter((app) => {
    return (
      (selectedCategory === 'All' || app.category === selectedCategory) &&
      (app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const renderCardsByCategory = (category) => {
    const appsInCategory = filteredApps.filter(
      (app) => app.category === category
    );
    if (appsInCategory.length === 0) return null;

    return (
      <div key={category} className={styles.categorySection}>
        <h2>{category}</h2>
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
                  onClick={() => handleCategoryChange('AI-Native Apps')}
                  className={
                    selectedCategory === 'AI-Native Apps' ? styles.active : ''
                  }
                >
                  AI-Native Apps
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
              <h2>{selectedCategory}</h2>
              <p className={styles.categoryDescriptions}>
                {categoryDescriptions[selectedCategory]}
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
