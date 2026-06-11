import React, { useEffect } from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";

export default function ContactForm() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.setAttribute("data-cookieconsent", "ignore");
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "8738733",
          formId: "228989b7-50f5-446c-90a6-5ed524210df9",
          target: "#hubspotForm",
          onFormReady: () => {
            setTimeout(styleHubspotIframe, 300);
          },
        });
      }
    });

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const styleHubspotIframe = () => {
    const iframe = document.querySelector("#hubspotForm iframe");

    if (!iframe) return;

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    const style = iframeDoc.createElement("style");
    style.innerHTML = `
    label,
    label span,
    .hs-form-field label,
    .hs-form-field label span,
    .legal-consent-container,
    .legal-consent-container p,
    .legal-consent-container span {
      color: #b9c8de !important;
      font-family: Inter, sans-serif !important;
    }

    .hs-form-required {
      color: #ff6b6b !important;
    }

    input,
    textarea,
    select {
      background: rgba(255, 255, 255, 0.06) !important;
      color: #ddebf2 !important;
      border: 1px solid rgba(255, 255, 255, 0.12) !important;
      border-radius: 0.9rem !important;
    }

    a {
      color: #43e2c5 !important;
    }
  `;

    iframeDoc.head.appendChild(style);
  };

  return (
    <div className={styles.contactBackground} id="contact-sales">
      <div className="container">
        {/* Main contact area */}
        <div className={styles.contactSplit}>
          {/* Left Side */}
          <div className={styles.leftContent}>
            <h2>Ready to get started?</h2>
            <p>
              Try Weaviate Cloud today, or get in touch with our team to discuss
              your needs. We can’t wait to meet you.
            </p>
            <Link className={styles.tryButton} to="/go/console">
              Try Weaviate Cloud
            </Link>
            <ul className={styles.linkList}>
              <li>
                <Link to="/product">Weaviate Products</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/partners">Partners</Link>
              </li>
            </ul>
          </div>

          {/* Right Side - HubSpot Form */}
          <div className={styles.rightForm}>
            <div id="hubspotForm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
