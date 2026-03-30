import React, { useState } from "react";
import { ButtonContainer } from "../../../theme/Buttons";
import styles from "./styles.module.scss";
import { LinkButton } from "/src/theme/Buttons";
import Link from "@docusaurus/Link";

export default function Resources() {
  return (
    <div className={styles.bgCol}>
      <div className={styles.container}>
        <div className={styles.boxContainer}>
          <ul>
            <a href="#get-started">Get started</a>
          </ul>
          <ul>
            <a href="#guided-courses">Guided courses</a>
          </ul>
          <ul>
            <a href="#documentation">Documentation</a>
          </ul>
          <ul>
            <a href="#code-examples">Code examples</a>
          </ul>
          <ul>
            <a href="#ebooks">Ebooks</a>
          </ul>
          <ul>
            <a href="#go-further">Go further</a>
          </ul>
        </div>
      </div>
    </div>
  );
}
