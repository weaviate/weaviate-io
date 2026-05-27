import React from "react";
import styles from "./styles.module.scss";
import databaseCompare from "../data/databaseCompare";
import engramCompare from "../data/engramCompare";

function Cell({ value }) {
  if (value === true) return <span className={styles.yes}>✓</span>;
  if (value === false) return <span className={styles.no}>×</span>;
  return <>{value ?? "—"}</>;
}

export default function CompareTable({ product = "database" }) {
  const data = product === "engram" ? engramCompare : databaseCompare;
  const { title, columns, sections } = data;
  const hasGroups = columns.some((c) => c.group);

  return (
    <section className={styles.wrap}>
      <div className={`container ${styles.compareContainer}`}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.card}>
          <table className={styles.table}>
            <colgroup>
              <col className={styles.featureCol} />
              {columns.map((col) => (
                <col key={col.key} className={styles.planWidthCol} />
              ))}
            </colgroup>

            <thead>
              <tr>
                <th
                  className={styles.planHead}
                  rowSpan={hasGroups ? 2 : 1}
                >
                  Plan
                </th>
                {columns.map((col, i) => {
                  if (col.group) {
                    const firstIdx = columns.findIndex(
                      (c) => c.group === col.group
                    );
                    if (i !== firstIdx) return null;
                    const span = columns.filter(
                      (c) => c.group === col.group
                    ).length;
                    return (
                      <th
                        key={col.group}
                        className={styles.planCol}
                        colSpan={span}
                      >
                        {col.group}
                      </th>
                    );
                  }
                  return (
                    <th
                      key={col.key}
                      className={styles.planCol}
                      rowSpan={hasGroups ? 2 : 1}
                    >
                      {col.label}
                    </th>
                  );
                })}
              </tr>
              {hasGroups && (
                <tr>
                  {columns.map((col) =>
                    col.group ? (
                      <th key={col.key} className={styles.planCol}>
                        {col.label}
                      </th>
                    ) : null
                  )}
                </tr>
              )}
            </thead>

            <tbody>
              {sections.map((section) => (
                <React.Fragment key={section.heading}>
                  <tr className={styles.sectionRow}>
                    <th colSpan={columns.length + 1}>{section.heading}</th>
                  </tr>

                  {section.rows.map((row) => (
                    <tr key={`${section.heading}-${row.label}`}>
                      <th className={styles.rowHeader}>{row.label}</th>
                      {columns.map((col) => (
                        <td key={col.key}>
                          <Cell value={row.values[col.key]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {product === "database" && (
            <div className={styles.notes}>
              <sup>1</sup> Vector dimension pricing varies by index type,
              compression method, and region. For rates specific to your data,
              see the Running Costs module in Weaviate Cloud Console or contact
              support@weaviate.io.
              <br />
              <sup>2</sup> Data transfers currently incur no additional cost for
              a limited promotional period; Weaviate may introduce charges in
              future with advance notice.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
