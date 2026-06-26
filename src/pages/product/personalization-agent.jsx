import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { MetaSEO } from "/src/theme/MetaSEO";
import appData from "/data/apps.json";
import styles from "/src/components/Marketplace/styles.module.scss";
import AppCard from "/src/components/Marketplace/card";

export default function QueryPage() {
  const app = appData.find((app) => app.name === "Personalization Agent") ||
    appData.find((app) => app.name === "Engram") || {
      id: "personalization-agent-sunset",
      name: "Personalization Agent",
      category: "Weaviate Agents",
      description:
        "This product is being sunset. For new builds, use Engram and Query Agent.",
      image: "engram-cta-logo.svg",
      overviewImage1: "engram-arch-diagram.png",
      url: "/product/personalization-agent",
      released: "no",
    };

  return (
    <div className="custom-page noBG">
      <Layout
        title="Personalization Agent (Sunset) | Weaviate Workbench"
        description="Personalization Agent is being sunset. Use Engram and Query Agent for new workloads."
      >
        <MetaSEO />
        <section className={styles.productBG}>
          <div className="container">
            <div className={styles.breadCrumbs}>
              <Link to="/product">
                <div className={styles.home} />
              </Link>
              <div className={styles.arrow} />
              <span>
                {app.category}: <Link to={app.url}>{app.name}</Link>
              </span>
            </div>
            <div className={styles.appContainer}>
              <div className={`${styles.sidebar} ${styles.mini}`}>
                <Link to="/product" className={styles.backButton}>
                  Workbench
                </Link>
              </div>
              <div className={styles.mainContent}>
                <div className={styles.appDetailHeader}>
                  <img src={"/img/site/" + app.image} alt={app.name} />
                  <div>
                    <h1>{app.name}</h1>
                    <p>{app.description}</p>
                    <div
                      style={{
                        marginTop: "12px",
                        marginBottom: "12px",
                        padding: "12px 14px",
                        border: "1px solid rgba(255, 183, 3, 0.35)",
                        borderRadius: "8px",
                        background: "rgba(255, 183, 3, 0.08)",
                        color: "#ecf4f8",
                      }}
                    >
                      <strong>Sunset notice:</strong> Personalization Agent is
                      being retired in favor of Query Agent and Engram.
                    </div>
                    <div className={styles.installButtons}>
                      <Link to="/product/engram">
                        <button className={styles.installButton}>
                          Explore Engram
                        </button>
                      </Link>
                      <Link to="/product/query-agent">
                        <button className={styles.docButton}>
                          Explore Query Agent
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className={styles.imageContainer}>
                    <div className={styles.overviewImage}>
                      <img
                        src={"/img/site/" + app.overviewImage1}
                        alt={app.name}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.appDetailContent}>
                  <div className={styles.tabBottomContent}>
                    <div>
                      <h3>Overview</h3>

                      <p>
                        <strong>Personalization Agent is being sunset.</strong>{" "}
                        For new implementations, use <strong>Engram</strong> for
                        memory and personalization context, and{" "}
                        <strong>Query Agent</strong> for natural-language
                        retrieval workflows.
                      </p>
                      <ul>
                        <li>
                          <strong>Migration path:</strong> Move long-term user
                          context and preference memory into Engram.
                        </li>
                        <li>
                          <strong>Query layer:</strong> Use Query Agent for
                          natural-language data retrieval and orchestration.
                        </li>
                        <li>
                          <strong>Recommendation:</strong> Avoid starting new
                          workloads on Personalization Agent.
                        </li>
                      </ul>
                    </div>

                    <div className={styles.additionalInfo}>
                      <h3>Additional details</h3>
                      <p>
                        Status: <strong>Sunset</strong>
                      </p>
                      <p>
                        Recommended replacement:{" "}
                        <Link to="/product/engram">
                          <strong>
                            <u>Engram</u>
                          </strong>
                        </Link>{" "}
                        +{" "}
                        <Link to="/product/query-agent">
                          <strong>
                            <u>Query Agent</u>
                          </strong>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.appDivider} />
                <div className={styles.relatedApps}>
                  <h3>Related Products</h3>
                  <div className={styles.cardContainer}>
                    {appData
                      .filter(
                        (relatedApp) =>
                          relatedApp.category === app.category &&
                          relatedApp.id !== app.id,
                      )
                      .map((relatedApp) => (
                        <AppCard key={relatedApp.id} app={relatedApp} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}
