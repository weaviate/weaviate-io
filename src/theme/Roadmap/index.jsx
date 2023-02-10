import React from 'react';
import { useState, useEffect } from 'react';
import styles from './styles.module.scss';

export function Roadmap({label}) {
  const [roadmapItems, setRoadmap] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/repos/weaviate/weaviate/issues?per_page=1000&labels=${label}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      const parsed_data = data.map(item => { return {
        id: item.number,
        url: item.html_url,
        title: item.title,
        score: item.reactions['+1']
      }})
      .sort((a, b) => b.score - a.score);

      setRoadmap(parsed_data)
    });
  }, []);

  return (
    <ul>
      {roadmapItems.map((item) => {
          if (!item) return null;
          return (
            <li className={styles.roadmapItem} key={item.id}>
            <a href={item.url} target="_blank">
              <i className="far fa-heart"></i>  [{item.score}] - {item.title}
            </a>
            </li>
          );
        })}
    </ul>
  );

}