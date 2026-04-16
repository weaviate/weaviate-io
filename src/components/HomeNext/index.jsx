import React from 'react';
import Hero from './sections/Hero';
import TrustedBy from './sections/TrustedBy';
import Capabilities from './sections/Capabilities';
import DeveloperExperience from './sections/DeveloperExperience';
import UseCases from './sections/UseCases';
import Examples from './sections/Examples';
import WhyWeaviate from './sections/WhyWeaviate';
import GetStarted from './sections/GetStarted';

export default function HomeNext() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Capabilities />
      <DeveloperExperience />
      <UseCases />
      <Examples />
      <WhyWeaviate />
      <GetStarted />
    </>
  );
}
