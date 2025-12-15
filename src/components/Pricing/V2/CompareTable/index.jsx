import React from 'react';
import styles from './styles.module.scss';

const COLS = [
  { key: 'free', label: 'Free\u00A0Trial' }, // \u00A0 = non-breaking space
  { key: 'flex', label: 'Flex' },
  { key: 'plus', label: 'Plus' },
  { key: 'premium', label: 'Premium' },
];

const SHOW_PLUS = false;
const VISIBLE_COLS = SHOW_PLUS ? COLS : COLS.filter((c) => c.key !== 'plus');
const MERGE_PREMIUM_HEADERS = true;

function getDisplayRawValue(rowValues, colKey) {
  if (!SHOW_PLUS && colKey === 'premium') {
    const plusRaw = rowValues.plus;
    const premRaw = rowValues.premium;
    return plusRaw ?? premRaw;
  }
  return rowValues[colKey];
}

function hasValue(raw) {
  if (raw === undefined || raw === null) return false;
  if (typeof raw === 'string') return raw.trim().length > 0;
  if (typeof raw === 'boolean') return true;
  if (typeof raw === 'object') {
    if ('badge' in raw) return true;
    if ('value' in raw)
      return (
        raw.value !== undefined && raw.value !== null && `${raw.value}` !== ''
      );
    return Object.keys(raw).length > 0;
  }
  return true;
}

function getDisplayCell(rowValues, colKey) {
  if (!SHOW_PLUS && colKey === 'premium') {
    const usePremium = hasValue(rowValues.premium);
    return normalizeCell(usePremium ? rowValues.premium : rowValues.plus);
  }
  return normalizeCell(rowValues[colKey]);
}

function Cell({ value }) {
  if (value === true) return <span className={styles.yes}>✓</span>;
  if (value === false) return <span className={styles.no}>✕</span>;
  if (value && typeof value === 'object' && value.badge) {
    return (
      <span className={styles.cellWithBadge}>
        {value.text} <span className={styles.badge}>{value.badge}</span>
      </span>
    );
  }
  return <>{value ?? '—'}</>;
}

function normalizeCell(raw) {
  if (raw && typeof raw === 'object' && 'value' in raw && !('badge' in raw)) {
    return { content: raw.value, mint: !!raw.mint };
  }
  if (raw && typeof raw === 'object' && 'badge' in raw) {
    return { content: raw, mint: !!raw.mint };
  }
  return { content: raw, mint: false };
}

function RenderSection({ section }) {
  const { heading, rows, layout = 'rowspan' } = section;

  if (layout === 'flat') {
    return rows.map((row, i) => {
      const rowMint =
        row.mint === true
          ? new Set(COLS.map((c) => c.key))
          : Array.isArray(row.mint)
          ? new Set(row.mint)
          : new Set();

      return (
        <tr key={`${heading}-${i}`}>
          {i === 0 && (
            <th scope="rowgroup" colSpan={2} className={styles.sectionCol}>
              {heading}
            </th>
          )}

          {SHOW_PLUS ? (
            COLS.map()
          ) : heading === 'Contract' ? (
            <>
              {/* Free */}
              <td className={rowMint.has('free') ? styles.mint : undefined}>
                <Cell value={normalizeCell(row.values.free).content} />
              </td>
              {/* Flex */}
              <td className={rowMint.has('flex') ? styles.mint : undefined}>
                <Cell value={normalizeCell(row.values.flex).content} />
              </td>
              {/* Premium spanning Plus + Premium */}
              <td
                colSpan={2}
                className={rowMint.has('premium') ? styles.mint : undefined}
              >
                <Cell value={getDisplayCell(row.values, 'premium').content} />
              </td>
            </>
          ) : (
            // flat -> else branch (e.g., Upgrades)
            COLS.map((col) => {
              const raw = row.values[col.key];
              const { content, mint } = normalizeCell(raw);
              const isMint = mint || rowMint.has(col.key);
              return (
                <td key={col.key} className={isMint ? styles.mint : undefined}>
                  <Cell value={content} />
                </td>
              );
            })
          )}
        </tr>
      );
    });
  }

  return rows.map((row, i) => {
    const rowMint =
      row.mint === true
        ? new Set(COLS.map((c) => c.key))
        : Array.isArray(row.mint)
        ? new Set(row.mint)
        : new Set();

    if (row.wide) {
      return (
        <tr key={`${heading}-${row.label}-${i}`}>
          {i === 0 && (
            <th
              scope="rowgroup"
              rowSpan={rows.length}
              className={styles.sectionCol}
            >
              {heading}
            </th>
          )}
          <th scope="row" className={styles.rowHeader}>
            {row.label}
          </th>
          <td
            colSpan={2 + (SHOW_PLUS ? COLS.length : VISIBLE_COLS.length)}
            className={styles.pricingCell}
          >
            <Cell value={row.all} />
          </td>
        </tr>
      );
    }

    return (
      <tr key={`${heading}-${row.label}-${i}`}>
        {i === 0 && (
          <th
            scope="rowgroup"
            rowSpan={rows.length}
            className={styles.sectionCol}
          >
            {heading}
          </th>
        )}
        <th scope="row" className={styles.rowHeader}>
          {row.label}
        </th>
        {COLS.map((col) => {
          const { content, mint } = normalizeCell(row.values[col.key]);
          const isMint = mint || rowMint.has(col.key);
          return (
            <td key={col.key} className={isMint ? styles.mint : undefined}>
              <Cell value={content} />
            </td>
          );
        })}
      </tr>
    );
  });
}

function BannerRow({ children }) {
  return (
    <tr className={styles.bannerRow}>
      <td colSpan={2 + COLS.length}>
        <div className={styles.bannerInner}>{children}</div>
      </td>
    </tr>
  );
}

export default function CompareTable() {
  const PAID = ['flex', 'plus', 'premium'];

  const SECTIONS = [
    // Contract
    {
      heading: 'Contract',
      layout: 'flat',
      rows: [
        {
          label: 'Contract',
          values: {
            free: '14-day free trial',
            flex: 'Monthly (Pay-as-you-go)',
            plus: 'Prepaid Commitment',
            premium: 'Prepaid Commitment',
          },
        },
      ],
    },

    // Core DB
    {
      heading: 'Core Database',
      layout: 'rowspan',
      rows: [
        {
          label: 'Deployment type',
          values: {
            free: 'Shared',
            flex: 'Shared',
            plus: 'Shared',
            premium: 'Dedicated',
          },
        },
        {
          label: 'Hybrid search',
          mint: true,
          values: { free: true, flex: true, plus: true, premium: true },
        },
        {
          label: 'Backup retention',
          values: {
            free: false,
            flex: '7 days',
            plus: '30 days',
            premium: '45 days',
          },
        },
        {
          label: 'Flexible index types',
          mint: true,
          values: { free: true, flex: true, plus: true, premium: true },
        },
        {
          label: 'Vector compression',
          mint: true,
          values: { free: true, flex: true, plus: true, premium: true },
        },
        {
          label: 'HA / replication',
          values: {
            free: { value: true, mint: true },
            flex: { value: true, mint: true },
            plus: { value: true, mint: true },
            premium: { value: true, mint: true },
          },
        },
        {
          label: 'Multi-tenancy',
          mint: true,
          values: { free: true, flex: true, plus: true, premium: true },
        },
      ],
    },

    // Security
    {
      heading: 'Security',
      layout: 'rowspan',
      rows: [
        {
          label: 'RBAC',
          mint: true,
          values: { free: true, flex: true, plus: true, premium: true },
        },
        {
          label: 'SSO/SAML',
          values: {
            free: false,
            flex: { value: false, mint: false },
            plus: { value: true, mint: true },
            premium: { value: true, mint: true },
          },
        },
        {
          label: 'Bring your own IdP',
          values: {
            free: false,
            flex: { value: false, mint: false },
            plus: { value: false, mint: false },
            premium: { value: true, mint: true },
          },
        },
        {
          label: 'HIPAA compliant',
          values: {
            free: false,
            flex: { value: false, mint: false },
            plus: { value: false, mint: false },
            premium: { value: true, mint: true },
          },
        },
        {
          label: 'PrivateLink (AWS)',
          values: {
            free: false,
            flex: false,
            plus: false,
            premium: { value: true, mint: true },
          },
        },
        {
          label: (
            <>
              Encrypted volumes<br></br>
              <small>with customer keys</small>
            </>
          ),
          values: {
            free: false,
            flex: false,
            plus: false,
            premium: { value: true, mint: true },
          },
        },
      ],
    },

    // Observability
    {
      heading: 'Observability',
      layout: 'rowspan',
      rows: [
        {
          label: 'Metrics endpoint',
          values: {
            free: false,
            flex: false,
            plus: { value: true, mint: true },
            premium: { value: true, mint: true },
          },
        },
      ],
    },

    // AI Services
    {
      heading: 'AI Services',
      layout: 'rowspan',
      rows: [
        {
          label: 'Query Agent monthly max requests',
          values: {
            free: '250',
            flex: '30000',
            plus: 'Unlimited',
            premium: 'Unlimited',
          },
        },
        {
          label: 'Embeddings (shared service)',
          values: {
            free: { value: true, mint: true },
            flex: { value: true, mint: true },
            plus: { value: true, mint: true },
            premium: { text: '', badge: 'Coming soon' },
          },
        },
      ],
    },

    // Support / Onboarding
    {
      heading: 'Support / Onboarding',
      layout: 'rowspan',
      rows: [
        {
          label: 'Email support',
          mint: PAID,
          values: { free: false, flex: true, plus: true, premium: true },
        },
        {
          label: 'Phone support',
          values: {
            free: false,
            flex: false,
            plus: { value: true, mint: true },
            premium: { value: true, mint: true },
          },
        },
        {
          label: 'Slack support',
          values: {
            free: false,
            flex: false,
            plus: { value: true, mint: true },
            premium: { value: true, mint: true },
          },
        },
        {
          label: 'Technical Account Team',
          values: {
            free: false,
            flex: false,
            plus: { value: true, mint: true },
            premium: { value: true, mint: true },
          },
        },
        {
          label: 'Instructor-led jumpstart training',
          values: {
            free: false,
            flex: false,
            plus: 'Available**',
            premium: 'Available**',
          },
        },
      ],
    },

    // SLAs
    {
      heading: 'SLAs',
      layout: 'rowspan',
      rows: [
        {
          label: 'Availability',
          values: {
            free: '99.5%',
            flex: '99.5%',
            plus: '99.9%',
            premium: '99.95%',
          },
        },
        {
          label: 'Severity 1 response time',
          values: {
            free: false,
            flex: '1 business day',
            plus: '4-hour',
            premium: '1-hour',
          },
        },
      ],
    },

    // Upgrades
    {
      heading: 'Upgrades',
      layout: 'flat',
      rows: [
        {
          label: 'Upgrades',
          values: {
            free: false,
            flex: 'Weaviate-managed',
            plus: 'Weaviate-managed',
            premium: 'Customer-directed',
          },
        },
      ],
    },

    // Cloud Availability
    {
      heading: 'Cloud Availability',
      layout: 'rowspan',
      rows: [
        {
          label: 'Cloud Service Provider (CSP)',
          values: {
            free: 'GCP',
            flex: (
              <>
                GCP, AWS <br></br>(coming soon)
              </>
            ),
            plus: (
              <>
                GCP, AWS <br></br>(coming soon)
              </>
            ),
            premium: 'GCP, AWS, Azure',
          },
        },
        {
          label: 'Regions',
          values: {
            free: 'Limited',
            flex: 'Limited',
            plus: 'Limited',
            premium: 'All regions',
          },
        },
      ],
    },
  ];

  const PRICING_DIMENSIONS = {
    heading: 'Pricing Dimensions',
    layout: 'rowspan',
    rows: [
      {
        label: 'Minimum',
        values: {
          free: 'Free',
          flex: '$45 / month',
          plus: '$400 / month',
          premium: 'Contact sales for more information',
        },
      },
      {
        label: 'Vector Dimensions',
        values: {
          free: 'Free',
          flex: (
            <>
              <small>from</small>
              <br />
              $0.01668 / 1M
            </>
          ),
          plus: (
            <>
              <small>from</small>
              <br />
              $0.0139 / 1M
            </>
          ),
          premium: (
            <>
              <small>from</small>
              <br />
              $0.00975 / 1M
            </>
          ),
        },
      },
      {
        label: 'Storage',
        values: {
          free: 'Free',
          flex: (
            <>
              <small>from</small>
              <br />
              $0.255 / GiB
            </>
          ),
          plus: (
            <>
              <small>from</small>
              <br />
              $0.2125 / GiB
            </>
          ),
          premium: (
            <>
              <small>from</small>
              <br />
              $0.31875 / GiB
            </>
          ),
        },
      },
      {
        label: 'Backup',
        values: {
          free: 'Free',
          flex: (
            <>
              <small>from</small>
              <br />
              $0.0264 / GiB
            </>
          ),
          plus: (
            <>
              <small>from</small>
              <br />
              $0.022 / GiB
            </>
          ),
          premium: (
            <>
              <small>from</small>
              <br />
              $0.033 / GiB
            </>
          ),
        },
      },

      {
        label: 'Data Transfer',
        wide: true,
        all: (
          <>
            Free for promotional period<sup>1</sup>
          </>
        ),
      },
    ],
  };

  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className={styles.card}>
          <h3 className={styles.title}>Compare Plans</h3>

          <div
            className={styles.scroll}
            role="region"
            aria-label="Plan comparison table"
            tabIndex={0}
          >
            <table className={styles.table}>
              <caption className="sr-only">
                Feature comparison across Free, Flex{SHOW_PLUS ? ', Plus' : ''},
                and Premium plans
              </caption>

              <colgroup>
                <col className={styles.colSection} />
                <col className={styles.colRow} />
                {COLS.map((c) => (
                  <col key={c.key} className={styles.colPlan} />
                ))}
              </colgroup>
              <thead>
                <tr>
                  <th colSpan={2} scope="col" className={styles.planHead}>
                    Plan
                  </th>

                  {COLS.map((c) => {
                    // Skip the Plus header completely when we’re merging into Premium
                    if (
                      MERGE_PREMIUM_HEADERS &&
                      !SHOW_PLUS &&
                      c.key === 'plus'
                    ) {
                      return null;
                    }
                    // Make Premium span Plus + Premium
                    if (
                      MERGE_PREMIUM_HEADERS &&
                      !SHOW_PLUS &&
                      c.key === 'premium'
                    ) {
                      return (
                        <th
                          scope="col"
                          key="premium"
                          className={styles.planCol}
                          colSpan={2}
                        >
                          {c.label}
                        </th>
                      );
                    }
                    return (
                      <th scope="col" key={c.key} className={styles.planCol}>
                        {c.label}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                <BannerRow>FEATURES</BannerRow>
                {SECTIONS.map((sec) => (
                  <RenderSection key={sec.heading} section={sec} />
                ))}
                <BannerRow>PRICING DIMENSIONS</BannerRow>
                <RenderSection section={PRICING_DIMENSIONS} />
              </tbody>
            </table>

            <div className={styles.footnote}>
              <sup>1</sup> Data transfers, including public internet egress,
              cross-region transfers, and VPC-related network traffic, currently
              incur no additional costs to customers for a limited promotional
              period. Weaviate reserves the right to introduce data transfer
              charges in the future, with any changes communicated in advance
              and applied only after notice to customers.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
