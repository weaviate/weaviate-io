import React, { useEffect } from "react";
import Head from "@docusaurus/Head";

const destination = "https://docs.weaviate.io/engram";

export default function EngramRedirect() {
  useEffect(() => {
    window.location.replace(destination);
  }, []);

  return (
    <>
      <Head>
        <title>Engram sunset information</title>
        <meta name="robots" content="noindex" />
        <meta httpEquiv="refresh" content={`0;url=${destination}`} />
        <link rel="canonical" href={destination} />
      </Head>
      <main><p>Engram is being sunset. <a href={destination}>Read the sunset details in the documentation.</a></p></main>
    </>
  );
}
