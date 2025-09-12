import React from 'react';
import styles from './styles.module.scss';

const COLS = ['Flex', 'Plus', 'Premium'];

/** Renders the content inside a table cell */
function Cell({ value }) {
  if (value === true) return <span className={styles.yes}>✓</span>;
  if (value === false) return <span className={styles.no}>✕</span>;
  if (value && typeof value === 'object' && value.badge) {
    // { text, badge } (optionally can include mint; mint handled at <td>)
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
  // Per-cell form: { value: <any>, mint?: boolean }
  if (raw && typeof raw === 'object' && 'value' in raw && !('badge' in raw)) {
    return { content: raw.value, mint: !!raw.mint };
  }
  // Badge form can also carry mint: { text, badge, mint? }
  if (raw && typeof raw === 'object' && 'badge' in raw) {
    return { content: raw, mint: !!raw.mint };
  }
  // Primitive (boolean/string/number)
  return { content: raw, mint: false };
}

/** Section renderer
 * layout: 'rowspan' => first column is a single TH with rowSpan across all rows
 * layout: 'flat'    => rows where the first TH spans 2 columns
 */
function RenderSection({ section }) {
  const { heading, rows, layout = 'rowspan' } = section;

  if (layout === 'flat') {
    return rows.map((row, i) => {
      // Row-level mint targeting: true = all, array = specific columns
      const rowMint =
        row.mint === true
          ? new Set(COLS.map((c) => c.toLowerCase()))
          : Array.isArray(row.mint)
          ? new Set(row.mint.map((c) => c.toLowerCase()))
          : new Set();

      return (
        <tr key={`${heading}-${i}`}>
          {i === 0 && (
            <th scope="rowgroup" colSpan={2} className={styles.sectionCol}>
              {heading}
            </th>
          )}
          {COLS.map((col) => {
            const key = col.toLowerCase();
            const { content, mint } = normalizeCell(row.values[key]);
            const isMint = mint || rowMint.has(key);
            return (
              <td key={col} className={isMint ? styles.mint : undefined}>
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
        ? new Set(COLS.map((c) => c.toLowerCase()))
        : Array.isArray(row.mint)
        ? new Set(row.mint.map((c) => c.toLowerCase()))
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
          const key = col.toLowerCase();
          const { content, mint } = normalizeCell(row.values[key]);
          const isMint = mint || rowMint.has(key);
          return (
            <td key={col} className={isMint ? styles.mint : undefined}>
              <Cell value={content} />
            </td>
          );
        })}
      </tr>
    );
  });
}

export default function CompareTable() {
  const SECTIONS = [
    // 4-column: Contract (no mint)
    {
      heading: 'Contract',
      layout: 'flat',
      rows: [
        {
          label: 'Contract',
          values: {
            flex: 'Monthly (Pay-as-you-go)',
            plus: 'Pre-Paid Commitment',
            premium: 'Pre-Paid Commitment',
          },
        },
      ],
    },

    // 5-column sections
    {
      heading: 'Core Database',
      layout: 'rowspan',
      rows: [
        {
          label: 'Deployment type',
          values: {
            flex: 'Shared',
            plus: 'Shared or dedicated',
            premium: 'Dedicated',
          },
        },
        // Example of minting all plan cells for this row:
        {
          label: 'Hybrid search',
          mint: true,
          values: { flex: true, plus: true, premium: true },
        },
        {
          label: 'Backup retention',
          values: { flex: '7 days', plus: '30 days', premium: '45 days' },
        },
        // Example of minting specific columns only:
        {
          label: 'Flexible index types',
          mint: ['flex', 'plus', 'premium'],
          values: { flex: true, plus: true, premium: true },
        },
        {
          label: 'Vector compression',
          mint: true,
          values: { flex: true, plus: true, premium: true },
        },
        // Example of per-cell mint:
        {
          label: 'HA / replication',
          values: {
            flex: { value: true, mint: true },
            plus: { value: true, mint: true },
            premium: { value: true, mint: true },
          },
        },
        {
          label: 'Multi-tenancy',
          mint: true,
          values: { flex: true, plus: true, premium: true },
        },
      ],
    },
    {
      heading: 'Security',
      layout: 'rowspan',
      rows: [
        {
          label: 'RBAC',
          mint: true,
          values: { flex: true, plus: true, premium: true },
        },
        {
          label: 'SSO/SAML',
          values: {
            flex: { value: false, mint: false },
            plus: { value: true, mint: true },
            premium: { value: true, mint: true },
          },
        },
        {
          label: 'Bring your own IdP',
          values: {
            flex: { value: false, mint: false },
            plus: { value: true, mint: true },
            premium: { value: true, mint: true },
          },
        },
        {
          label: 'HIPAA compliant',

          values: {
            flex: { value: false, mint: false },
            plus: { value: '✓ (dedicated)', mint: true },
            premium: { value: true, mint: true },
          },
        },
        {
          label: 'PrivateLink (AWS)',
          values: {
            flex: false,
            plus: false,
            premium: { value: true, mint: true },
          },
        },
        {
          label: 'Encrypted volumes with customer keys',
          values: {
            flex: false,
            plus: false,
            premium: { value: true, mint: true },
          },
        },
      ],
    },
    {
      heading: 'Observability',
      layout: 'rowspan',
      rows: [
        {
          label: 'Metrics endpoint',
          values: {
            flex: false,
            plus: { value: true, mint: true },
            premium: { value: true, mint: true },
          },
        },
      ],
    },
    {
      heading: 'AI-Native Services',
      layout: 'rowspan',
      rows: [
        {
          label: 'Agents (shared service)',
          values: {
            flex: { value: true, mint: true },
            plus: { value: true, mint: true },
            premium: { text: '', badge: 'Coming soon' },
          },
        },
        {
          label: 'Embeddings (shared service)',
          values: {
            flex: { value: true, mint: true },
            plus: { value: true, mint: true },
            premium: { text: '', badge: 'Coming soon' },
          },
        },
      ],
    },
    {
      heading: 'Support / Onboarding',
      layout: 'rowspan',
      rows: [
        {
          label: 'Email support',
          mint: true,
          values: { flex: true, plus: true, premium: true },
        },
        {
          label: 'Phone support',
          values: {
            flex: false,
            plus: { value: true, mint: true },
            premium: { value: true, mint: true },
          },
        },
        {
          label: 'Slack support',
          values: {
            flex: false,
            plus: 'Available*',
            premium: { value: true, mint: true },
          },
        },
        {
          label: 'Technical Account Team',
          values: {
            flex: false,
            plus: { value: true, mint: true },
            premium: { value: true, mint: true },
          },
        },
        {
          label: 'Instructor-led jumpstart training',
          values: { flex: false, plus: 'Available**', premium: 'Available**' },
        },
      ],
    },
    {
      heading: 'SLAs',
      layout: 'rowspan',
      rows: [
        {
          label: 'Availability',
          values: { flex: '99.5%', plus: '99.9%', premium: '99.95%' },
        },
        {
          label: 'Severity 1 response time',
          values: { flex: '1 business day', plus: '4-hour', premium: '1-hour' },
        },
      ],
    },

    // 4-column: Upgrades
    {
      heading: 'Upgrades',
      layout: 'flat',
      rows: [
        {
          label: 'Upgrades',
          values: {
            flex: 'Controlled',
            plus: 'Controlled',
            premium: 'Controlled',
          },
        },
      ],
    },

    // 5-column: Cloud Availability
    {
      heading: 'Cloud Availability',
      layout: 'rowspan',
      rows: [
        {
          label: 'Cloud Service Provider (CSP)',
          values: {
            flex: 'GCP, AWS (coming soon)',
            plus: 'GCP, AWS, Azure (dedicated)',
            premium: 'GCP, AWS, Azure',
          },
        },
        {
          label: 'Regions',
          values: {
            flex: 'Limited',
            plus: 'Limited (shared), All regions (dedicated)',
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
                Feature comparison across Flex, Plus, and Premium plans
              </caption>

              {/* Header: Plan spans the first TWO columns; then Flex / Plus / Premium */}
              <thead>
                <tr>
                  <th colSpan={2} scope="col" className={styles.planHead}>
                    Plan
                  </th>
                  {COLS.map((c) => (
                    <th scope="col" key={c} className={styles.planCol}>
                      {c}
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
