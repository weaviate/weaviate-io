import React from 'react';
import styles from './styles.module.scss';

const ITEMS = [
  {
    title: 'Weaviate Console email',
    body: 'Must match the email used in the Console.',
  },
  { title: 'Company name', body: 'The startup name associated with the deal.' },
  {
    title: 'Program / VC',
    body: 'e.g., Y Combinator, Techstars, partner program.',
  },
  {
    title: 'Optional proof / reference',
    body: 'If requested, include a link or short note.',
  },
];

export default function Requirements() {
  return (
    <aside className={styles.card} aria-label="Requirements">
      <h3>What you’ll need</h3>
      <ul className={styles.list}>
        {ITEMS.map((i) => (
          <li key={i.title} className={styles.item}>
            <div className={styles.dot} />
            <div>
              <div className={styles.title}>{i.title}</div>
              <div className={styles.body}>{i.body}</div>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.note}>
        <strong>Tip:</strong> If your Console email differs from your YC email,
        tell us in the message field.
      </div>
    </aside>
  );
}
