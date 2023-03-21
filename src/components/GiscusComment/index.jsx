import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import { useBlogPost } from '@docusaurus/theme-common/internal';

const GiscusParams = {
  repo: "weaviate/weaviate-io",
  repoId: "R_kgDOG2Daiw",
  category: "Docs/blog comments",
  categoryId: "DIC_kwDOG2Dai84CVAeq",
  mapping: "specific",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "en",
  crossorigin: "anonymous",
  loading: "eager",
};

export function GiscusDocComment() {
  const { colorMode } = useColorMode();
  const { frontMatter } = useDoc();

  return (
    <Giscus
      {...GiscusParams}
      term={frontMatter.title}
      theme={colorMode}
    />
  );
}

export function GiscusBlogPostComment() {
  const { colorMode } = useColorMode();
  const { frontMatter } = useBlogPost();

  return (
    <Giscus
      {...GiscusParams}
      term={frontMatter.title}
      theme={colorMode}
    />
  );
}
