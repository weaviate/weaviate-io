import React from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";

export default function BlogSignupLink({ children, className }) {
  const location = useLocation();

  const blogSlug =
    location.pathname.replace(/^\/blog\//, "").replace(/\/$/, "") ||
    "unknown-blog-post";

  const signupUrl = new URL("https://console.weaviate.cloud/");

  signupUrl.searchParams.set("utm_source", "blog");
  signupUrl.searchParams.set("utm_medium", "website");
  signupUrl.searchParams.set("utm_campaign", "blog_signup");
  signupUrl.searchParams.set("utm_content", blogSlug);
  signupUrl.searchParams.set("utm_term", "ready-to-start-building");

  return (
    <Link to={signupUrl.toString()} className={className}>
      {children}
    </Link>
  );
}
