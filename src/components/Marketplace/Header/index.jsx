import React, { useState } from "react";
import { ButtonContainer } from "../../../theme/Buttons";
import styles from "./styles.module.scss";
import { LinkButton } from "/src/theme/Buttons";
import Link from "@docusaurus/Link";

export default function HomepageHeader() {
  return (
    <header className={styles.headerHome}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.box}>
            <h1>Products</h1>
            <p>
              Our AI database ecosystem was designed to simplify development for
              AI builders
            </p>
            <div className={styles.buttons}>
              <a className={styles.buttonGradient} href="#contact-sales">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
        <div className={styles.agentsContainer}>
          <div className={styles.agent}></div>
          <div className={styles.agentText}>
            <h3>Introducing Weaviate Agents</h3>
            <p>Query, improve, and augment your data with agentic workflows</p>
          </div>
          <a href="#weaviate-agents" className={styles.buttonGradient}>
            Explore Agents
          </a>
        </div>
      </div>
    </header>
  );
}
