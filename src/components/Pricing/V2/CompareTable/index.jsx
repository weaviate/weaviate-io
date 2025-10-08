import React from 'react';
import styles from './styles.module.scss';

// Columns: stable data key + label for the UI
const COLS = [
  { key: 'free', label: 'Free\u00A0Trial' }, // \u00A0 = non-breaking space
  { key: 'flex', label: 'Flex' },
  { key: 'plus', label: 'Plus' },
  { key: 'premium', label: 'Premium' },
];

/** Renders the content inside a table cell */
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

/** Normalize a "raw" cell spec to {content, mint} */
function normalizeCell(raw) {
  if (raw && typeof raw === 'object' && 'value' in raw && !('badge' in raw)) {
    return { content: raw.value, mint: !!raw.mint };
  }
  if (raw && typeof raw === 'object' && 'badge' in raw) {
    return { content: raw, mint: !!raw.mint };
  }
  return { content: raw, mint: false };
}

/** Section renderer */
function RenderSection({ section }) {
  const { heading, rows, layout = 'rowspan' } = section;

  if (layout === 'flat') {
    return rows.map((row, i) => {
      const rowMint =
        row.mint === true
          ? new Set(COLS.map((c) => c.key)) // mint all
          : Array.isArray(row.mint)
          ? new Set(row.mint) // mint specific keys
          : new Set();

      return (
        <tr key={`${heading}-${i}`}>
          {i === 0 && (
            <th scope="rowgroup" colSpan={2} className={styles.sectionCol}>
              {heading}
            </th>
          )}
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

  // rowspan layout
  return rows.map((row, i) => {
    const rowMint =
      row.mint === true
        ? new Set(COLS.map((c) => c.key))
        : Array.isArray(row.mint)
        ? new Set(row.mint)
        : new Set();

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
            plus: 'Shared or dedicated',
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
            plus: { value: true, mint: true },
            premium: { value: true, mint: true },
          },
        },
        {
          label: 'HIPAA compliant',
          values: {
            free: false,
            flex: { value: false, mint: false },
            plus: { value: '✓ (dedicated)', mint: true },
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

    // AI-Native Services
    {
      heading: 'AI-Native Services',
      layout: 'rowspan',
      rows: [
        {
          label: 'Agents (shared service)',
          values: {
            free: { value: true, mint: true },
            flex: { value: true, mint: true },
            plus: { value: true, mint: true },
            premium: { text: '', badge: 'Coming soon' },
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
            plus: 'Available*',
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
            plus: (
              <>
                Weaviate-managed
                <br />
                <small>(shared)</small>
                <br />
                Customer-directed
                <br />
                <small>(dedicated)</small>
              </>
            ),
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
            flex: 'GCP, AWS (coming soon)',
            plus: (
              <>
                GCP, AWS, Azure<br></br>
                <small>(dedicated)</small>
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
            plus: (
              <>
                Limited (shared)<br></br> All regions (dedicated)
              </>
            ),
            premium: 'All regions',
          },
        },
      ],
    },
  ];

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
                Feature comparison across Free, Flex, Plus, and Premium plans
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
                  {COLS.map((c) => (
                    <th scope="col" key={c.key} className={styles.planCol}>
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {SECTIONS.map((sec) => (
                  <RenderSection key={sec.heading} section={sec} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
