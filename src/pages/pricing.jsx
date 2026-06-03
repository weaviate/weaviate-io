import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import PricingHeader from "../components/Pricing/V2/Header";

import PricingTiers from "../components/Pricing/V2/TiersUpdate/index.jsx";
import CompareTable from "../components/Pricing/V2/CompareTable/index.jsx";
import Availability from "../components/Pricing/V2/Availablity/index.jsx";
import AddOnsSection from "../components/Pricing/V2/AddOns/index.jsx";
import PriceList from "../components/Pricing/V2/PriceList/index.jsx";
import PricingFAQ from "../components/Pricing/V2/FAQ";
import ContactForm from "/src/components/Pricing/V2/ContactForm/contactForm";
import HybridBusinessCritical from "../components/Pricing/V2/HybridBusinessCritical";
import ThemeSwitch from "/src/components/ThemeSwitch";
import SecurityCompliance from "../components/Pricing/V2/SOC2/soc2";
import CustomScriptLoader from "../components/scriptSwitch/index.jsx";
import { PriceCalculator } from "../components/Pricing/V2/PriceCalculator/PriceCalculator";
import EngramChargingSteps from "../components/Pricing/V2/EngramChargingSteps";
import PricingCTA from "../components/Pricing/V2/PricingCTA";

export default function PricingPage() {
  const [selectedType, setSelectedType] = useState("database");

  useEffect(() => {
    const hashType = window.location.hash.substring(1);

    if (hashType === "engram" || hashType === "database") {
      setSelectedType(hashType);
    }
  }, []);

  const handlePricingType = (type) => {
    setSelectedType(type);
    window.history.replaceState(null, "", `#${type}`);
  };

  return (
    <div className="custom-page noBG">
      <Layout
        title="Vector Database Pricing"
        description="Compare pricing options for our different levels of vector database services and solutions."
      >
        <PricingHeader
          selectedType={selectedType}
          setSelectedType={handlePricingType}
        />
        {selectedType === "database" ? (
          <>
            <PricingTiers product="database" />
            <PriceCalculator />
            <AddOnsSection />
            <CompareTable product="database" />
            <SecurityCompliance theme="dark" />
            <PricingFAQ
              faqType={selectedType === "database" ? "Database" : "Engram"}
            />
            <PricingCTA product={selectedType} />
          </>
        ) : (
          <>
            <PricingTiers product="engram" />
            <EngramChargingSteps />
            <CompareTable product="engram" />
            <PricingFAQ
              faqType={selectedType === "engram" ? "Engram" : "Database"}
            />
            <PricingCTA product={selectedType} />
          </>
        )}
        <ContactForm />
      </Layout>

      <ThemeSwitch />
      <CustomScriptLoader />
    </div>
  );
}
