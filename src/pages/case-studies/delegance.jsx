import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import StudyHeader from "../../components/Service/Delegance/Header";
import ContactForm from "/src/components/Contact/contactForm.jsx";
import Study from "../../components/Service/Delegance/Study";
import ThemeSwitch from "/src/components/ThemeSwitch";

import Integrations from "../../components/Service/CaseStudy/Integrations";

export default function CaseStudyPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Case Study - Delegance Brokerage"
        description="Delegance Brokerage is replacing the career insurance broker with agentic AI that reads, remembers, and acts on a client's entire policy history."
      >
        <StudyHeader />
        <Study />
        <Integrations />
        <ContactForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
