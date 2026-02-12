import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import ThemeSwitch from '/src/components/ThemeSwitch';

import Header from '/src/components/AgentSkills/Header';
import SkillsGrid from '/src/components/AgentSkills/SkillsGrid';
import AgentSkillsIntro from '/src/components/AgentSkills/Intro';
import AgentSkillsStack from '/src/components/AgentSkills/Stack';
import AgentSkillsGetBuilding from '/src/components/AgentSkills/GetBuilding';
import AgentSkillsFAQ from '/src/components/AgentSkills/FAQ';
import ContactForm from '../components/AgentSkills/Contact/contactForm';

export default function AgentSkillsPage() {
  const pageTitle = 'Agent Skills | Weaviate';
  const pageDescription =
    'Reusable agent skills for building production-ready AI workflows with Weaviate—plus an end-to-end cookbook of practical recipes.';
  const ogImage = 'og/website/home.jpg';
  const pageUrl = 'https://weaviate.io/agent-skills';

  return (
    <div className="custom-page noBG">
      <Layout>
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:url" content={pageUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={pageDescription} />
          <meta name="twitter:image" content={ogImage} />
        </Head>

        <Header />
        <AgentSkillsIntro />
        <SkillsGrid />
        <AgentSkillsGetBuilding />
        <AgentSkillsStack />

        <AgentSkillsFAQ />
      </Layout>

      <ThemeSwitch />
    </div>
  );
}
