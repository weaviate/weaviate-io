import React, { useEffect } from 'react';

const redirectToExternal = true;

export default function awsReinventPage() {
  useEffect(() => {
    if (redirectToExternal) {
      window.location.href = 'https://events.weaviate.io/aws-reinvent-2024';
    }
  }, []);

  if (redirectToExternal) {
    return (
      <div>
        <p>
          Redirecting to{' '}
          <a href="https://events.weaviate.io/aws-reinvent-2024">
            AWS Re:Invent 2024
          </a>
          ...
        </p>
      </div>
    );
  }

  return (
    <div className="custom-page noBG">
      <Layout
        title="AWS Re:Invent 2023"
        description="Weaviate -  AWS Re:Invent 2023"
      >
        <Header />
        <UnlockSection />
        <CallingSection />
        <ContactForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
