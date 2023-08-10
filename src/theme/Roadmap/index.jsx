import React from 'react';
import { useState, useEffect } from 'react';
import styles from './styles.module.scss';

export function Roadmap({label}) {
  const [roadmapItems, setRoadmap] = useState([]);

  useEffect(() => {
    // for backlog only show open issues, for other labels show all issues
    const state = (label === 'backlog') ? 'open' : 'all';

    fetch(`https://api.github.com/repos/weaviate/weaviate/issues?per_page=1000&labels=${label}&state=${state}`)
    .then(response => response.json())
    .then(data => {
      const parsed_data = data.map(item => { return {
        id: item.number,
        url: item.html_url,
        title: item.title,
        score: item.reactions['+1'],
        state: item.state
      }})
      .sort((a, b) => b.score - a.score);

      setRoadmap(parsed_data)
    });
  }, []);

  return (
    <ul>
      {roadmapItems.map((item) => {
          if (!item) return null;

          const icon = (item.state === 'open') ? 'far fa-star' : 'fas fa-check'

          return (
            <li className={styles.roadmapItem} key={item.id}>
              <i className={icon}></i>
              <span className={styles.score}>[{item.score}]</span>
              <a href={item.url} target="_blank">{item.title}</a>
            </li>
          );
        })}
    </ul>
  );

}