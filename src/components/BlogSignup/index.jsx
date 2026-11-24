import React from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";

export default function BlogSignupLink({ children, className }) {
  const location = useLocation();

  const blogSlug =
    location.pathname.replace(/^\/blog\//, "").replace(/\/$/, "") ||
    "unknown-blog-post";

  const signupParams = new URLSearchParams();

  signupParams.set("utm_source", "blog");
  signupParams.set("utm_medium", "website");
  signupParams.set("utm_campaign", "blog_signup");
  signupParams.set("utm_content", blogSlug);
  signupParams.set("utm_term", "ready-to-start-building");

  return (
    <Link to={`/go/console?${signupParams.toString()}`} className={className}>
      {children}
    </Link>
  );
}
