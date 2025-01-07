import React from 'react';
import { GraduationCap } from 'lucide-react';

const styles = {
  card: {
    display: 'block',
    width: '100%',
    margin: '0.75rem 0',
    padding: '1.25rem',
    background: 'linear-gradient(to right, #0F172A, #1E293B)',  // Slate-based colors for a modern look
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    border: '1px solid rgba(148, 163, 184, 0.1)',  // Subtle border
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
  },
  mainContent: {
    flex: '1',
  },
  title: {
    color: '#F8FAFC',  // Slightly warmer white
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    marginTop: 0,
    lineHeight: '1.4',
  },
  description: {
    color: '#94A3B8',  // Warmer gray
    marginBottom: '0',
    marginTop: 0,
    lineHeight: '1.5',
    fontSize: '0.875rem',
  },
  sideContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    minWidth: '140px',
  },
  academyPill: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',  // Lighter green background
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '999px',
    padding: '0.25rem 0.625rem',
    marginBottom: '0.75rem',
  },
  academyPillContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    fontSize: '0.75rem',
    color: '#22C55E',  // Brighter green
    fontWeight: '500',
  },
  pill: {
    padding: '0.375rem 0.75rem',
    borderRadius: '6px',
    backgroundColor: 'rgba(248, 250, 252, 0.05)',
    color: '#E2E8F0',
    fontSize: '0.8125rem',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.375rem',
    width: '100%',
    boxSizing: 'border-box',
  }
};

// Create a stylesheet for hover effects
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .academy-card:hover {
    border-color: rgba(148, 163, 184, 0.2);
  }

  .language-pill {
    position: relative;
  }

  .language-pill:hover {
    background-color: rgba(248, 250, 252, 0.1);
  }

  .language-pill .arrow {
    opacity: 0.6;
    transition: all 0.2s ease;
  }

  .language-pill:hover .arrow {
    opacity: 1;
    transform: translateX(2px);
  }
`;
document.head.appendChild(styleSheet);

const AcademyLinkCard = ({
  title,
  description,
  languages = [],
  ctaText = "View"
}) => {
  return (
    <div style={styles.card} className="academy-card">
      <div style={styles.academyPill} className="academy-pill">
        <span style={styles.academyPillContent}>
          <GraduationCap size={14} />
          <span>Weaviate Academy</span>
        </span>
      </div>
      <div style={styles.cardContent}>
        <div style={styles.mainContent}>
          <h3 style={styles.title}>
            {title}
          </h3>
          <p style={styles.description}>
            {description}
          </p>
        </div>
        <div style={styles.sideContent}>
          {languages.map((lang, index) => (
            <a
              key={index}
              href={lang.href}
              className="language-pill"
              style={styles.pill}
            >
              <span>{lang.name}</span>
              <span className="arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademyLinkCard;
