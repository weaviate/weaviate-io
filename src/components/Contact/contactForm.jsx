import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";

export default function ContactForm() {
  const [title, setTitle] = useState("Get in touch with us");

  useEffect(() => {
    setTitle(
      window.location.pathname === "/deployment/dedicated"
        ? "Get Started with Dedicated Cloud"
        : "Get in touch with us",
    );

    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.setAttribute("data-cookieconsent", "ignore");
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "8738733",
          formId: "c722587c-7ef8-414b-a64e-e33a71bcf02c",
          target: "#contactHubspotForm",
          onFormReady: () => {
            setTimeout(styleHubspotIframe, 300);
          },
        });
      }
    });

    const styleHubspotIframe = () => {
      const iframe = document.querySelector("#contactHubspotForm iframe");

      if (!iframe) return;

      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
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
      font-size: 14px !important;
      font-weight: 600 !important;
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

    .hs-button {
      background: linear-gradient(90deg, #00fe6b 0%, #00b7e2 100%) !important;
      color: #111111 !important;
      border-radius: 0.9rem !important;
      font-weight: 700 !important;
    }
  `;

      iframeDoc.head.appendChild(style);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className={styles.contactBackground} id="contact-sales">
      <div className="container">
        <div className={styles.contactSplit}>
          <div className={styles.leftContent}>
            <h2>{title}</h2>
            <p>
              Tell us a little about what you’re building and our team will help
              you find the right path forward.
            </p>

            <div className={styles.supportNotice}>
              <h3>Already using Weaviate?</h3>

              <p>
                Need technical support, troubleshooting, or account-specific
                help?
              </p>

              <Link
                className={styles.supportLink}
                to="https://docs.weaviate.io/support"
              >
                Visit the Support Center →
              </Link>
            </div>

            <Link className={styles.tryButton} to="/go/console">
              Try Weaviate Cloud
            </Link>

            <ul className={styles.linkList}>
              <li>
                <Link to="/product">Explore products</Link>
              </li>
              <li>
                <Link to="/pricing">View pricing</Link>
              </li>
              <li>
                <Link to="/partners">Partner with us</Link>
              </li>
              <li>
                <Link to="https://forum.weaviate.io/">Forum</Link>
              </li>
              <li>
                <Link to="https://newsletter.weaviate.io/">Newsletter</Link>
              </li>
            </ul>
          </div>

          <div className={styles.rightForm}>
            <div id="contactHubspotForm"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
