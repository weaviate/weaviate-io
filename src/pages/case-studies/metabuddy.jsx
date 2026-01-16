import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import StudyHeader from "../../components/Service/Metabuddy/Header";
import ContactForm from "/src/components/Contact/contactForm.jsx";
import Study from "../../components/Service/Metabuddy/Study";
import ThemeSwitch from "/src/components/ThemeSwitch";
import Integrations from "../../components/Service/CaseStudy/Integrations";

export default function CaseStudyPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Case Study - MetaBuddy"
        description="How MetaBuddy Unifies Wellness Data and Powers Personalized AI Coaching With Query Agent"
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
