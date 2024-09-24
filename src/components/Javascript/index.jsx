import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from './styles.module.scss';


const WeaviatePage = () => {
  return (
    <div className="main-container">
      <main>
      <div className="landing-page">
      <section className="hero">
        <div className="content">
          <h1>Unlock the Power of Weaviate Vector Search with Javascript</h1>
          <p>
            Weaviate is a modern, scalable vector database that enables
            powerful semantic search and machine learning-powered
            applications. Learn how to get started and integrate Weaviate
            into your JavaScript projects.
          </p>
          <div className="buttons">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Explore Docs</button>
          </div>
        </div>
        <div className="image-placeholder">
        <p> 📸 </p>
        </div>
      </section>

      <section className="learning-paths">
        <h2>Javascript Learning Paths</h2>
        <p>
          Explore our curated learning paths to become a Weaviate expert. From getting started to
          advanced techniques, we've got you covered.
        </p>
        <div className="path-grid">
          <div className="path-card">
            <h3>Ecommerce</h3>
            <p>Help customers find exactly what they are looking for.</p>
          </div>
          <div className="path-card">
            <h3>Recommender</h3>
            <p>Build a system to recommend anything to anyone.</p>
          </div>
          <div className="path-card">
            <h3>Agents</h3>
            <p>10x your productivity.</p>
          </div>
          <div className="path-card">
            <h3>Search</h3>
            <p>Find anything, anywhere.</p>
          </div>
        </div>
        <div className="image-placeholder">
          <p> 📸 </p>
        </div>
      </section>
    </div>
        <div className="ecommerce-page">
      <section className="ecommerce-resources">
        <h1>Ecommerce Learning Resources</h1>
        <p className="subtitle">Explore our curated resources to build ecommerce applications with Weaviate.</p>
        
        <div className="resources-grid">
          <div className="resource-item">
            <h2>Academy</h2>
            <p>Learn how to build ecommerce apps with Weaviate.</p>
          </div>
          <div className="resource-item">
            <h2>Docs</h2>
            <p>Explore our documentation for ecommerce use cases.</p>
          </div>
          <div className="resource-item">
            <h2>Events</h2>
            <p>Join our events to learn from experts.</p>
          </div>
          <div className="resource-item">
            <h2>Knowledge Cards</h2>
            <p>Explore our knowledge base for ecommerce.</p>
          </div>
          <div className="resource-item">
            <h2>Starter Example Repos</h2>
            <p>Get started with our ecommerce example projects.</p>
          </div>
        </div>
      </section>

      <section className="featured-projects">
        <h1>Featured Projects</h1>
        <p className="subtitle">Check out some of our featured projects built with Weaviate.</p>
        
        <div className="tabs">
          <button className="tab active">Featured</button>
          <button className="tab">Ecommerce</button>
          <button className="tab">Recommender</button>
          <button className="tab">Agents</button>
          <button className="tab">Search</button>
        </div>

        <div className="projects-grid">
          <div className="project-card">
            <div className="icon">🏠</div>
            <h2>www</h2>
            <p>example.com</p>
            <div className="divider"></div>
            <p className="commit-message">feat: update color scheme</p>
            <div className="commit-info">
              <span>3h ago</span>
              <span>main</span>
            </div>
          </div>
          <div className="project-card">
            <div className="icon">📚</div>
            <h2>docs</h2>
            <p>docs.example.com</p>
          </div>
        </div>
      </section>
    </div>
      </main>
    </div>
  );
};

export default WeaviatePage;