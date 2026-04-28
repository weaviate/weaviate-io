import React from "react";
import Layout from "@theme/Layout";
import { MetaSEO } from "/src/theme/MetaSEO";

import Opensource from "../../components/Community/Share/Opensource";
import ContactForm from "../../components/Community/Share/ContactForm/contactForm.jsx";
import Values from "../../components/Community/Share/Steps";

import ThemeSwitch from "../../components/ThemeSwitch";

export default function SharePage() {
  return (
    <div className="custom-page noBG">
      <Layout>
        <MetaSEO img="og/company/Community.jpg" />
        <Opensource />
        <section id="contact-form">
          <ContactForm />
        </section>
        <section id="steps">
          <Values />
        </section>
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
