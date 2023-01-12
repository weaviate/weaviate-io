import React from 'react';
import Layout from '@theme/Layout';
import AboutUsHeader from '../../components/AboutUs/header';
import CompanyValues from '../../components/AboutUs/values';
import MeetTheTeam from '../../components/AboutUs/meet-team';
// import MeetTheTeam from '../../components/AboutUs/meet-team';

export default function AboutUsPage() {
  return (
    <Layout>
        <AboutUsHeader />
        <CompanyValues />
        <MeetTheTeam />
    </Layout>
  );
}
