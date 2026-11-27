import React from "react";
import Layout from "@theme/Layout";
import ServiceHeader from "../../components/Service/Index/Header";
import ServicePlan from "../../components/Service/Index/Plan";
import ContactUsForm from "../../components/Contact/contactForm";
import HybridBusinessCritical from "../../components/Service/Index/HybridBusinessCritical";

import Integrations from "../../components/Service/Index/Integrations";

export default function ServicePage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Services Overview"
        description="Overview of Weaviate Services"
      >
        <ServiceHeader />
        <ServicePlan />
        <HybridBusinessCritical />

        <div id="contact-sales" />
        <ContactUsForm />
      </Layout>
    </div>
  );
}
