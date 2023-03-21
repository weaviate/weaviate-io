import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComment(props) {
  const { colorMode } = useColorMode();
  console.log(props);

  return (
      <Giscus
        repo="weaviate/weaviate-io"
        repoId="R_kgDOG2Daiw"
        category="Docs/blog comments"
        categoryId="DIC_kwDOG2Dai84CVAeq"
        mapping="path"                       // Only one that doesn't fetch attributes from the previously navigated-to page?
        term="Welcome to @giscus/react component!"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={colorMode}
        lang="en"
        crossorigin="anonymous"
        async
      />
  );
}
