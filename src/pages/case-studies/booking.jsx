import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import StudyHeader from "../../components/Service/Booking/Header";
import ContactForm from "/src/components/Contact/contactForm.jsx";
import Study from "../../components/Service/Booking/Study";
import ThemeSwitch from "/src/components/ThemeSwitch";

import Integrations from "../../components/Service/CaseStudy/Integrations";

export default function CaseStudyPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Case Study - Booking.com"
        description="How Booking.com selected Weaviate as its vector database standard"
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
