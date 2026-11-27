import React from "react";
import Layout from "@theme/Layout";
import CloudPage from "../../components/Service/CloudPage";

export default function DedicatedPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Dedicated Cloud Vector Database"
        description="Fully managed vector database on dedicated resources, ensuring consistent, high-speed results without the complexities of self-management."
      >
        <CloudPage variant="dedicated" />
      </Layout>
    </div>
  );
}
