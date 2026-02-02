import Link from '@docusaurus/Link';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';

const CASE_STUDIES = [
  {
    id: 'instabase',
    title: 'Turning over 450 data types into customer insights',
    href: '/case-studies/instabase',
    tags: ['enterprise', 'analytics', 'rag'],
    styleClass: styles.BS01,
  },
  {
    id: 'kapa',
    title: 'Production-ready AI assistant built in 7 days',
    href: '/case-studies/kapa',
    tags: ['assistant', 'support', 'agentic'],
    styleClass: styles.BS02,
  },
  {
    id: 'neople',
    title: 'Customer service agents with 90% faster search',
    href: '/case-studies/neople',
    tags: ['support', 'search', 'rag'],
    styleClass: styles.BS03,
  },
  {
    id: 'finster',
    title: 'Successful management of 42M vectors in production',
    href: '/case-studies/finster',
    tags: ['scale', 'vectors', 'production'],
    styleClass: styles.BS04,
  },
  {
    id: 'marvelx',
    title: 'How MarvelX is Scaling Insurance Processing at the Speed of AI',
    href: '/case-studies/marvelx',
    tags: ['enterprise', 'insurance', 'automation'],
    styleClass: styles.BS05,
  },
  {
    id: 'loti',
    title:
      'How Loti AI fights likeness infringement and digital impersonation with Weaviate',
    href: '/case-studies/loti',
    tags: ['security', 'media', 'search'],
    styleClass: styles.BS06,
  },
  {
    id: 'morningstar',
    title:
      'How Morningstar built a trustworthy, AI-driven financial data platform',
    href: '/case-studies/morningstar',
    tags: ['finance', 'enterprise', 'trust'],
    styleClass: styles.BS07,
  },
  {
    id: 'stack-ai',
    title: 'How Stack AI Delivers Lighting-Fast Agentic AI for Enterprises',
    href: '/case-studies/stack-ai',
    tags: ['agentic', 'enterprise', 'automation'],
    styleClass: styles.BS08,
  },
  {
    id: 'moonsift',
    title: 'Building an AI-Powered Shopping Copilot',
    href: '/blog/moonsift-story',
    tags: ['ecommerce', 'assistant', 'search'],
    styleClass: styles.BS09,
  },
  {
    id: 'finance',
    title:
      'How a Leading Financial Data Company Commercialized AI in Under a Year',
    href: '/case-studies/finance',
    tags: ['finance', 'enterprise', 'go-to-market'],
    styleClass: styles.BS10,
  },
  {
    id: 'astronomer',
    title: 'Ask Astro: An open source LLM Application',
    href: 'https://www.astronomer.io/blog/ask-astro-open-source-llm-application-apache-airflow/',
    tags: ['llm', 'open-source', 'devtools'],
    styleClass: styles.BS11,
  },
  {
    id: 'preverity',
    title: 'Transforming Risk Management with Generative AI',
    href: 'https://innovativesol.com/success-stories/preverity/',
    tags: ['risk', 'enterprise', 'genai'],
    styleClass: styles.BS12,
  },
  {
    id: 'unbody',
    title: 'Building Foundations for AI-First App Development',
    href: '/blog/unbody-weaviate',
    tags: ['developer', 'platform', 'search'],
    styleClass: styles.BS13,
  },
  {
    id: 'predori',
    title:
      'How predori cut operational costs over 80% with an AI-Powered Patent Intelligence Platform',
    href: '/case-studies/predori',
    tags: ['patents', 'enterprise', 'cost-savings'],
    styleClass: styles.BS14,
  },
];

export default function MainSection() {
  const [mounted, setMounted] = useState(false);

  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const allTags = useMemo(() => {
    const set = new Set();
    CASE_STUDIES.forEach((c) => (c.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return CASE_STUDIES.filter((c) => {
      const matchesQuery =
        !q ||
        (c.title || '').toLowerCase().includes(q) ||
        (c.tags || []).some((t) => String(t).toLowerCase().includes(q));

      const matchesTags =
        activeTags.length === 0 ||
        activeTags.every((t) => (c.tags || []).includes(t));

      return matchesQuery && matchesTags;
    });
  }, [query, activeTags]);

  const hasFilters = query.trim().length > 0 || activeTags.length > 0;

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearAll = () => {
    setQuery('');
    setActiveTags([]);
  };

  const isExternal = (href) =>
    typeof href === 'string' &&
    (href.startsWith('http://') || href.startsWith('https://'));

  const FilteredCard = ({ item }) => {
    const content = (
      <div className={styles.filteredCardInner}>
        <div className={styles.filteredTitle}>{item.title}</div>

        <div className={styles.filteredTags}>
          {(item.tags || []).slice(0, 6).map((t) => (
            <span key={t} className={styles.filteredTag}>
              {t}
            </span>
          ))}
        </div>

        <div className={styles.filteredCta}>Read Case Study →</div>
      </div>
    );

    if (isExternal(item.href)) {
      return (
        <a
          href={item.href}
          className={styles.filteredCard}
          target="_blank"
          rel="noreferrer"
        >
          {content}
        </a>
      );
    }

    return (
      <Link to={item.href} className={styles.filteredCard}>
        {content}
      </Link>
    );
  };

  if (!mounted) return null;

  return (
    <div className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h2>
            Innovative companies of all sizes power AI experiences with Weaviate
          </h2>
        </div>

        <div className={styles.searchRow}>
          <div className={styles.searchInputWrap}>
            <input
              className={styles.searchInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search case studies (e.g. support, scale, RAG)…"
              aria-label="Search case studies"
            />

            {(query || activeTags.length > 0) && (
              <button
                type="button"
                className={`${styles.clearBtn} ${styles.fadeInUp}`}
                onClick={clearAll}
              >
                Clear
              </button>
            )}
          </div>

          <div
            className={styles.tagRow}
            aria-label="Filter case studies by tag"
          >
            {allTags.map((tag) => {
              const isActive = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  className={`${styles.tagPill} ${isActive ? styles.tagPillActive : ''}`}
                  onClick={() => toggleTag(tag)}
                  aria-pressed={isActive}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.bentoGrid}>
          {!hasFilters ? (
            <>
              {/* ======= DEFAULT (BENTO CTA ROWS) ======= */}
              {/* Row 1 - Four small */}
              <div className={styles.row}>
                <Link
                  to="/case-studies/instabase"
                  className={`${styles.bentoSmall} ${styles.BS01}`}
                >
                  <div className={styles.bentoText}>
                    <div className={styles.innerText}>
                      <div className={styles.bentoLogo}></div>
                      <h3>
                        Turning over 450 data types into customer insights{' '}
                      </h3>
                    </div>
                    <div className={styles.buttons}>
                      <Link
                        className={styles.csLink}
                        to="/case-studies/instabase"
                      >
                        Read Case Study {'->'}
                      </Link>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/case-studies/kapa"
                  className={`${styles.bentoSmall} ${styles.BS02}`}
                >
                  <div className={styles.bentoText}>
                    <div className={styles.innerText}>
                      <div className={styles.bentoLogo}></div>
                      <h3>Production-ready AI assistant built in 7 days</h3>
                    </div>
                    <div className={styles.buttons}>
                      <Link className={styles.csLink} to="/case-studies/kapa">
                        Read Case Study {'->'}
                      </Link>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/case-studies/neople"
                  className={`${styles.bentoSmall} ${styles.BS03}`}
                >
                  <div className={styles.bentoText}>
                    <div className={styles.innerText}>
                      <div className={styles.bentoLogo}></div>
                      <h3>Customer service agents with 90% faster search</h3>
                    </div>
                    <div className={styles.buttons}>
                      <Link className={styles.csLink} to="/case-studies/neople">
                        Read Case Study {'->'}
                      </Link>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/case-studies/finster"
                  className={`${styles.bentoSmall} ${styles.BS04}`}
                >
                  <div className={styles.bentoText}>
                    <div className={styles.innerText}>
                      <div className={styles.bentoLogo}></div>
                      <h3>
                        Successful management of 42M vectors in production
                      </h3>
                    </div>
                    <div className={styles.buttons}>
                      <Link
                        className={styles.csLink}
                        to="/case-studies/finster"
                      >
                        Read Case Study {'->'}
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Row 2 - Three small */}
              <div className={styles.row}>
                <Link
                  to="/case-studies/marvelx"
                  className={`${styles.bentoSmall} ${styles.BS05}`}
                >
                  <div className={styles.bentoText}>
                    <div className={styles.innerText}>
                      <div className={styles.bentoLogo}></div>
                      <h3>
                        How MarvelX is Scaling Insurance Processing at the Speed
                        of AI
                      </h3>
                    </div>
                    <div className={styles.buttons}>
                      <Link
                        className={`${styles.csLink} ${styles.csLight}`}
                        to="/case-studies/marvelx"
                      >
                        Read Case Study {'->'}
                      </Link>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/case-studies/loti"
                  className={`${styles.bentoSmall} ${styles.BS06}`}
                >
                  <div className={styles.bentoText}>
                    <div className={styles.innerText}>
                      <div className={styles.bentoLogo}></div>
                      <h3>
                        How Loti AI fights likeness infringement and digital
                        impersonation with Weaviate
                      </h3>
                    </div>
                    <div className={styles.buttons}>
                      <Link className={styles.csLink} to="/case-studies/loti">
                        Read Case Study {'->'}
                      </Link>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/case-studies/morningstar"
                  className={`${styles.bentoSmall} ${styles.BS07}`}
                >
                  <div className={styles.bentoText}>
                    <div className={styles.innerText}>
                      <div className={styles.bentoLogo}></div>
                      <h3>
                        How Morningstar built a trustworthy, AI-driven financial
                        data platform
                      </h3>
                    </div>
                    <div className={styles.buttons}>
                      <Link
                        className={styles.csLink}
                        to="/case-studies/morningstar"
                      >
                        Read Case Study {'->'}
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Row 3 - 1 big/2 small */}
              <div className={styles.row}>
                <Link
                  to="/case-studies/stack-ai"
                  className={`${styles.bentoSmall} ${styles.BS08}`}
                >
                  <div className={styles.bentoText}>
                    <div className={styles.innerText}>
                      <div className={styles.bentoLogo}></div>
                      <h3>
                        How Stack AI Delivers Lighting-Fast Agentic AI for
                        Enterprises
                      </h3>
                    </div>
                    <div className={styles.buttons}>
                      <Link
                        className={styles.csLink}
                        to="/case-studies/stack-ai"
                      >
                        Read Case Study {'->'}
                      </Link>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/blog/moonsift-story"
                  className={`${styles.bentoSmall} ${styles.BS09}`}
                >
                  <div className={styles.bentoText}>
                    <div className={styles.innerText}>
                      <div className={styles.bentoLogo}></div>
                      <h3>Building an AI-Powered Shopping Copilot</h3>
                    </div>
                    <div className={styles.buttons}>
                      <Link className={styles.csLink} to="/blog/moonsift-story">
                        Read Case Study {'->'}
                      </Link>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/case-studies/finance"
                  className={`${styles.bentoSmall} ${styles.BS10}`}
                >
                  <div className={styles.bentoText}>
                    <div className={styles.innerText}>
                      <h3>
                        How a Leading Financial Data Company Commercialized AI
                        in Under a Year
                      </h3>
                    </div>
                    <div className={styles.buttons}>
                      <Link
                        className={styles.csLink}
                        to="/case-studies/finance"
                      >
                        Read Case Study {'->'}
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Row 4 - 4 small */}
              <div className={styles.row}>
                <Link
                  to="https://www.astronomer.io/blog/ask-astro-open-source-llm-application-apache-airflow/"
                  className={`${styles.bentoSmall} ${styles.BS11}`}
                >
                  <div className={styles.bentoText}>
                    <div className={styles.innerText}>
                      <div className={styles.bentoLogo}></div>
                      <h3>Ask Astro: An open source LLM Application</h3>
                    </div>
                    <div className={styles.buttons}>
                      <Link
                        className={styles.csLink}
                        to="https://www.astronomer.io/blog/ask-astro-open-source-llm-application-apache-airflow/"
                      >
                        Read Case Study {'->'}
                      </Link>
                    </div>
                  </div>
                </Link>

                <Link
                  to="https://innovativesol.com/success-stories/preverity/"
                  className={`${styles.bentoSmall} ${styles.BS12}`}
                >
                  <div className={styles.bentoText}>
                    <div className={styles.innerText}>
                      <div className={styles.bentoLogo}></div>
                      <h3>Transforming Risk Management with Generative AI</h3>
                    </div>
                    <div className={styles.buttons}>
                      <Link
                        className={styles.csLink}
                        to="https://innovativesol.com/success-stories/preverity/"
                      >
                        Read Case Study {'->'}
                      </Link>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/blog/unbody-weaviate"
                  className={`${styles.bentoSmall} ${styles.BS13}`}
                >
                  <div className={styles.bentoText}>
                    <div className={styles.innerText}>
                      <div className={styles.bentoLogo}></div>
                      <h3>Building Foundations for AI-First App Development</h3>
                    </div>
                    <div className={styles.buttons}>
                      <Link
                        className={`${styles.csLink} ${styles.csLight}`}
                        to="/blog/unbody-weaviate"
                      >
                        Read Case Study {'->'}
                      </Link>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/case-studies/predori"
                  className={`${styles.bentoSmall} ${styles.BS14}`}
                >
                  <div className={styles.bentoText}>
                    <div className={styles.innerText}>
                      <div className={styles.bentoLogo}></div>
                      <h3>
                        How predori cut operational costs over 80% with an
                        AI-Powered Patent Intelligence Platform
                      </h3>
                    </div>
                    <div className={styles.buttons}>
                      <Link
                        className={`${styles.csLink} ${styles.csLight}`}
                        to="/case-studies/predori"
                      >
                        Read Case Study {'->'}
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div
                className={`${styles.filteredGrid} ${styles.fadeInUp}`}
                key={`filtered-${query}-${activeTags.join(',')}`}
              >
                {filtered.length === 0 ? (
                  <div className={styles.noResults}>
                    No case studies match your search. Try removing a tag or
                    changing the keywords.
                  </div>
                ) : (
                  filtered.map((item, idx) => (
                    <div
                      key={item.id}
                      className={styles.staggerItem}
                      style={{ animationDelay: `${Math.min(idx * 60, 420)}ms` }}
                    >
                      <FilteredCard item={item} />
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          <div className={`${styles.row} ${styles.quoteRow}`}>
            <div
              className={`${styles.imageTile} ${styles.qLoti}`}
              role="img"
              aria-label="Loti testimonial"
            />
            <div
              className={`${styles.imageTile} ${styles.qInstabase}`}
              role="img"
              aria-label="Instabase testimonial"
            />
            <div
              className={`${styles.imageTile} ${styles.qStackAI}`}
              role="img"
              aria-label="Stack AI testimonial"
            />
            <div
              className={`${styles.imageTile} ${styles.qMorningstar}`}
              role="img"
              aria-label="Morningstar testimonial"
            />
          </div>

          <div className={styles.rowWide}>
            <div className={styles.bento06}>
              <div className={styles.bentoText}>
                <div className={styles.innerText}>
                  <h3>Start building with Weaviate for free</h3>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <Link to="/go/console" className={styles.buttonDark}>
                  Get Started
                </Link>
                <Link to="/contact" className={styles.buttonLight}>
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
