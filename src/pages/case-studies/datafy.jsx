import React from "react";
import Layout from "@theme/Layout";
import StudyHeader from "../../components/Service/Datafy/Header";
import ContactForm from "/src/components/Contact/contactForm.jsx";
import Study from "../../components/Service/Datafy/Study";
import ThemeSwitch from "/src/components/ThemeSwitch";
import Integrations from "../../components/Service/CaseStudy/Integrations";

export default function DatafyCaseStudyPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Case Study - Datafy"
        description="How Weaviate cut wasted EBS spend by 50% with Datafy's automated rightsizing across dedicated customer infrastructure."
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
