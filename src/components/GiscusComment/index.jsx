import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import { useBlogPost } from '@docusaurus/theme-common/internal';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  // Extract the path from the location, because frontmatter.slug might not be defined.
  // The path is used to disambiguate between pages with the same title (e.g. 'Modules').
  const path = location.pathname.replace('/developers/weaviate', '');

  return (
    <Giscus
      {...GiscusParams}
      term={`Doc comment on ${frontMatter.title} (${path})`}
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
      term={'Blog comment on ' + frontMatter.title}
      theme={colorMode}
    />
  );
}
