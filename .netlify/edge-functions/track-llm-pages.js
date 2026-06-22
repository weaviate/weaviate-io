const AI_CRAWLERS = [
  { pattern: "GPTBot",        source: "ChatGPT" },
  { pattern: "ChatGPT-User",  source: "ChatGPT" },
  { pattern: "ClaudeBot",     source: "Claude" },
  { pattern: "anthropic-ai",  source: "Claude" },
  { pattern: "PerplexityBot", source: "Perplexity" },
  { pattern: "Google-Extended", source: "Gemini" },
  { pattern: "Googlebot",     source: "Google" },
  { pattern: "bingbot",       source: "Bing/Copilot" },
];

function detectAISource(ua) {
  for (const { pattern, source } of AI_CRAWLERS) {
    if (ua.includes(pattern)) return source;
  }
  return "unknown";
}

export default async (request, context) => {
  const path = new URL(request.url).pathname;

  // Only act on our LLM-optimised pages
  const isTracked =
    path === "/llms.txt" ||
    path.endsWith(".md");

  if (!isTracked) return context.next();

  const measurementId =
    Netlify.env.get("GA4_MEASUREMENT_ID") ||
    Netlify.env.get("GOOGLE_TRACKING_ID");
  const apiSecret = Netlify.env.get("GA4_API_SECRET");

  if (measurementId && apiSecret) {
    const ua = request.headers.get("user-agent") || "";
    const aiSource = detectAISource(ua);

    // Fire-and-forget — never delays serving the file
    context.waitUntil(
      fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_id: context.ip || "edge-server",
            events: [
              {
                name: "llm_page_view",
                params: {
                  page_path: path,
                  page_location: request.url,
                  ai_source: aiSource,
                  is_ai_crawler: aiSource !== "unknown" ? "true" : "false",
                },
              },
            ],
          }),
        }
      ).catch(() => {}) // silently fail — never block the file being served
    );
  }

  return context.next();
};