export default async (request, context) => {
  const url = new URL(request.url);
  const ua = request.headers.get("user-agent") || "";
  const country = (context.geo && context.geo.country) || "";
  const pathname = url.pathname.toLowerCase();

  const isFeedPath =
    pathname.includes("/feed") ||
    pathname.includes("/rss") ||
    pathname.includes("/atom");

  const isSuspiciousCountry = country === "CN";

  const isSuspiciousUA =
    ua.includes("Chrome/58.0.3029.110") &&
    ua.includes("Windows NT 10.0");

  if (isFeedPath && (isSuspiciousCountry || isSuspiciousUA)) {
    return new Response(null, { status: 204 });
  }

  return context.next();
};