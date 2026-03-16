import React, { useEffect, useMemo, useState } from 'react';
import podcasts from '/data/podcasts.json';
import styles from './styles.module.scss';

const ytWatchUrl = (id) => `https://www.youtube.com/watch?v=${id}`;
const ytEmbedUrl = (id) => `https://www.youtube.com/embed/${id}`;

function parsePodcastDate(dateStr) {
  const parts = String(dateStr || '')
    .split('-')
    .map((v) => parseInt(v, 10));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;

  let year, month, day;

  // YYYY-MM-DD
  if (String(parts[0]).length === 4) {
    [year, month, day] = parts;
  } else {
    // YY-MM-DD
    const [yy, mm, dd] = parts;
    year = 2000 + yy;
    month = mm;
    day = dd;
  }

  return new Date(Date.UTC(year, month - 1, day));
}

function sortNewestFirst(a, b) {
  const ta = parsePodcastDate(a?.date)?.getTime() ?? 0;
  const tb = parsePodcastDate(b?.date)?.getTime() ?? 0;
  return tb - ta;
}

function getEpisodeNumber(title) {
  const match = String(title || '').match(/#\s*(\d+)/);
  return match ? match[1] : '';
}

export default function PodcastLibrary() {
  const [mounted, setMounted] = useState(false);

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => setMounted(true), []);

  const all = useMemo(() => {
    return (podcasts || []).filter(Boolean).slice().sort(sortNewestFirst);
  }, []);

  // default selection = latest
  useEffect(() => {
    if (!selected && all.length) setSelected(all[0]);
  }, [all, selected]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return all;

    const qNoHash = q.replace('#', '');

    return all.filter((p) => {
      const title = String(p.title || '').toLowerCase();
      const desc = String(p.description || '').toLowerCase();
      const date = String(p.date || '').toLowerCase();
      const ep = getEpisodeNumber(p.title); // "132"

      return (
        title.includes(q) ||
        desc.includes(q) ||
        date.includes(q) ||
        (ep && ep.includes(qNoHash))
      );
    });
  }, [all, query]);

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  const clearAll = () => {
    setQuery('');
    setVisibleCount(20);
  };

  const onSelect = (p) => setSelected(p);

  if (!mounted) return null;

  return (
    <div className={styles.wrap}>
      <div className="container">
        <div className={styles.grid}>
          <aside className={styles.playerCol} aria-label="Podcast player">
            <div className={styles.playerCard}>
              <div className={styles.playerHeader}>
                <div className={styles.playerKicker}>Now playing</div>

                <h2 className={styles.playerTitle}>
                  {selected?.title || 'Select an episode'}
                </h2>

                <div className={styles.playerMetaRow}>
                  {selected?.date ? (
                    <span className={styles.playerMeta}>{selected.date}</span>
                  ) : null}

                  {selected?.title
                    ? (() => {
                        const ep = getEpisodeNumber(selected.title);
                        return ep ? (
                          <span className={styles.epChip}>Ep {ep}</span>
                        ) : null;
                      })()
                    : null}
                </div>
              </div>

              <div className={styles.playerFrame}>
                {selected?.youtube ? (
                  <iframe
                    key={selected.youtube}
                    src={ytEmbedUrl(selected.youtube)}
                    title={selected.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className={styles.playerEmpty}>No episode selected.</div>
                )}
              </div>

              {selected?.description ? (
                <p className={styles.playerDesc}>{selected.description}</p>
              ) : null}

              {selected?.youtube ? (
                <div className={styles.playerActions}>
                  <a
                    className={styles.primaryBtn}
                    href={ytWatchUrl(selected.youtube)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open on YouTube →
                  </a>
                </div>
              ) : null}
            </div>
          </aside>

          {/* ================= LIST + SEARCH ================= */}
          <section className={styles.listCol} aria-label="Podcast episodes">
            <div className={styles.controls}>
              <div className={styles.searchWrap}>
                <input
                  className={styles.searchInput}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setVisibleCount(20);
                  }}
                  placeholder="Search episodes (title, guest, #132)…"
                  aria-label="Search podcast episodes"
                />

                {(query || visibleCount !== 20) && (
                  <button
                    type="button"
                    className={styles.clearBtn}
                    onClick={clearAll}
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className={styles.countRow}>
                Showing <b>{visible.length}</b> of <b>{filtered.length}</b>
              </div>
            </div>

            <div className={styles.list}>
              {visible.length === 0 ? (
                <div className={styles.noResults}>
                  No episodes match your search. Try different keywords.
                </div>
              ) : (
                visible.map((p) => {
                  const isActive =
                    selected?.youtube && p.youtube === selected.youtube;
                  const ep = getEpisodeNumber(p.title);

                  return (
                    <button
                      key={`${p.youtube || p.date}-${p.title}`}
                      type="button"
                      className={`${styles.rowCard} ${
                        isActive ? styles.rowCardActive : ''
                      }`}
                      onClick={() => onSelect(p)}
                      aria-pressed={isActive}
                    >
                      <div className={styles.thumb}>
                        {p.cover_image ? (
                          <img src={p.cover_image} alt="" />
                        ) : null}
                      </div>

                      <div className={styles.rowBody}>
                        <div className={styles.rowTop}>
                          <h3 className={styles.rowTitle}>{p.title}</h3>
                          <div className={styles.rowMeta}>
                            {p.date ? (
                              <span className={styles.rowDate}>{p.date}</span>
                            ) : null}
                            {ep ? (
                              <span className={styles.epChip}>Ep {ep}</span>
                            ) : null}
                          </div>
                        </div>

                        {p.description ? (
                          <p className={styles.rowDesc}>{p.description}</p>
                        ) : null}

                        <div className={styles.rowCta}>Play →</div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {visibleCount < filtered.length && (
              <div className={styles.loadMoreRow}>
                <button
                  type="button"
                  className={styles.loadMoreBtn}
                  onClick={() => setVisibleCount((c) => c + 20)}
                >
                  Load more
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
