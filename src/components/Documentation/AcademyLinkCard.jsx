import React from 'react';
import { GraduationCap } from 'lucide-react';

// Styles object for non-hover states
const styles = {
  card: {
    display: 'block',
    width: '100%',
    margin: '0.75rem 0',
    padding: '1.25rem',
    background: 'linear-gradient(to right, #0F172A, #1E293B)',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    border: '1px solid rgba(148, 163, 184, 0.1)',
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
    color: '#F1F5F9',  // Brightened from #94A3B8
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    marginTop: 0,
    lineHeight: '1.4',
  },
  description: {
    color: '#CBD5E1',  // Brightened from #94A3B8
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
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
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
    color: '#22C55E',
    fontWeight: '500',
  },
  pill: {
    padding: '0.375rem 0.75rem',
    borderRadius: '6px',
    backgroundColor: 'rgba(248, 250, 252, 0.08)',
    color: '#F8FAFC',
    fontSize: '0.8125rem',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.375rem',
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid rgba(59, 130, 246, 0.3)',
  },
  pillText: {
    transition: 'all 0.2s ease',
  },
  arrow: {
    opacity: 0.7,
    transition: 'all 0.2s ease',
    color: '#60A5FA',
  }
};

// CSS for hover states and animations
const css = `
  .academy-card:hover {
    border-color: rgba(148, 163, 184, 0.2);
  }

  .language-pill {
    position: relative;
    transition: all 0.2s ease;
  }

  .language-pill:hover {
    background-color: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.5);
  }

  .pill-text {
    color: #94A3B8;
    font-weight: 400;
    transition: all 0.2s ease;
  }

  .language-pill:hover .pill-text {
    color: #F8FAFC;
    font-weight: 500;
  }

  .language-pill:hover .arrow {
    opacity: 1;
    transform: translateX(2px);
  }
`;

const AcademyLinkCard = ({
  title,
  description,
  languages = [],
  ctaText = "View"
}) => {
  // Add CSS to document head only once
  React.useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = css;
    document.head.appendChild(styleSheet);

    // Cleanup function to remove styles when component unmounts
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

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
              <span style={styles.pillText} className="pill-text">
                {lang.name}
              </span>
              <span style={styles.arrow} className="arrow">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademyLinkCard;
