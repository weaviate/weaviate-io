import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import StudyHeader from "../../components/Service/FinstarAI/Header";
import ContactForm from "/src/components/Contact/contactForm.jsx";
import Study from "../../components/Service/FinstarAI/Study";
import ThemeSwitch from "/src/components/ThemeSwitch";
import Integrations from "../../components/Service/CaseStudy/Integrations";

export default function CaseStudyPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Case Study - Finster AI"
        description="How Finster AI built a scalable, AI-driven financial data platform with Weaviate"
      >
        <StudyHeader />
        <Study />
        <Integrations />
        <div id="contact-sales" />
        <ContactForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
