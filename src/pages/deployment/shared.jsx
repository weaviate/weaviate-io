import React from "react";
import Layout from "@theme/Layout";
import CloudPage from "../../components/Service/CloudPage";

export default function SharedPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Shared Cloud Vector Database"
        description="All the power of Weaviate, as a fully-managed vector database as a service."
      >
        <CloudPage variant="shared" />
      </Layout>
    </div>
  );
}
