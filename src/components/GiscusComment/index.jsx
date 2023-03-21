import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';

export default function GiscusComment() {
  const { colorMode } = useColorMode();
  const { frontMatter } = useDoc();

  return (
      <Giscus
        repo="weaviate/weaviate-io"
        repoId="R_kgDOG2Daiw"
        category="Docs/blog comments"
        categoryId="DIC_kwDOG2Dai84CVAeq"
        mapping="specific"
        term={frontMatter.title}
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={colorMode}
        lang="en"
        crossorigin="anonymous"
        loading="eager"
      />
  );
}
