import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import appData from '/data/apps.json'; // Ensure this path is correct
import AppCard from './card';
import styles from './styles.module.scss';

const categoryDescriptions = {
  All: 'Browse all available apps.',
  'Weaviate Cloud Apps':
    'Code-free interfaces for managing data within Weaviate.',
  'Weaviate Labs': 'Pre-built services to accelerate AI-native use cases.',
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
    <div className={styles.appContainer}>
      <div className={styles.sidebar}>
        {location.pathname === '/marketplace' ? (
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
                onClick={() => handleCategoryChange('Weaviate Cloud Apps')}
                className={
                  selectedCategory === 'Weaviate Cloud Apps'
                    ? styles.active
                    : ''
                }
              >
                Weaviate Cloud Apps
              </li>
              <li
                onClick={() => handleCategoryChange('Weaviate Labs')}
                className={
                  selectedCategory === 'Weaviate Labs' ? styles.active : ''
                }
              >
                Weaviate Labs
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
  );
}
