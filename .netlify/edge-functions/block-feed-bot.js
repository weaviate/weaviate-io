export default async (request, context) => {
  const url = new URL(request.url);
  const ua = request.headers.get("user-agent") || "";
  const country = (context.geo && context.geo.country) || "";

  const isFeedPath =
    url.pathname.endsWith("/blog/rss.xml") ||
    url.pathname.endsWith("/blog/atom.xml") ||
    url.pathname.includes("/blog/feed");

  const isSuspiciousCountry = country === "CN";

  const isSuspiciousUA =
    ua.includes("Chrome/58.0.3029.110") &&
    ua.includes("Windows NT 10.0");

  if (isFeedPath && (isSuspiciousCountry || isSuspiciousUA)) {
    return new Response("Forbidden", { status: 403 });
  }

  return context.next();
};
