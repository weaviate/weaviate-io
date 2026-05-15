import React from "react";
import Layout from "@theme/Layout";
import ServiceHeader from "../../components/Service/Shared/Header";
import ServicePlan from "../../components/Service/Shared/Plan";
import ContactUsForm from "../../components/Contact/contactForm";
import CalculatorContainer from "../../components/Service/Shared/CalculatorContainer/index.jsx";
import ThemeSwitch from "/src/components/ThemeSwitch";
import QuoteBox from "../../components/Service/Shared/QuoteBox/quoteBox.jsx";
import Integrations from "../../components/Service/Shared/Integrations/index.jsx";

export default function ServerlessPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Shared Cloud Vector Database"
        description="All the power of Weaviate, as a fully-managed vector database as a service."
      >
        <ServiceHeader />
        <ServicePlan />
        <QuoteBox />
        <Integrations />
        <div id="contact-sales" />
        <ContactUsForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
