import React from "react";
import Layout from "@theme/Layout";
import PricingHeader from "../components/Pricing/V2/Header";

import PricingTiers from "../components/Pricing/V2/TiersUpdate/index.jsx";
import CompareTable from "../components/Pricing/V2/CompareTable/index.jsx";
import AddOnsSection from "../components/Pricing/V2/AddOns/index.jsx";
import PricingFAQ from "../components/Pricing/V2/FAQ";
import ContactForm from "/src/components/Pricing/V2/ContactForm/contactForm";
import ThemeSwitch from "/src/components/ThemeSwitch";
import SecurityCompliance from "../components/Pricing/V2/SOC2/soc2";
import CustomScriptLoader from "../components/scriptSwitch/index.jsx";
import { PriceCalculator } from "../components/Pricing/V2/PriceCalculator/PriceCalculator";
import PricingCTA from "../components/Pricing/V2/PricingCTA";

export default function PricingPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Vector Database Pricing"
        description="Compare pricing options for our different levels of vector database services and solutions."
      >
        <PricingHeader />
        <PricingTiers product="database" />
        <PriceCalculator />
        <AddOnsSection />
        <CompareTable product="database" />
        <SecurityCompliance theme="dark" />
        <PricingFAQ faqType="Database" />
        <PricingCTA product="database" />
        <ContactForm />
      </Layout>

      <ThemeSwitch />
      <CustomScriptLoader />
    </div>
  );
}
