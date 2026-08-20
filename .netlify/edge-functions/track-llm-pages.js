const TRACKED_PATHS = [
  "/llms.txt",
  "/product.md",
  "/pricing.md",
  "/rag.md",
  "/hybrid-search.md",
  "/agentic-ai.md",
  "/cost-performance-optimization.md",
  "/learn/what-is-an-ai-database.md",
  "/quickstart.md",
  "/python.md",
  "/javascript.md",
  "/deployment.md",
  "/deployment/shared.md",
  "/deployment/dedicated.md",
  "/security.md",
  "/product/query.md",
  "/product/query-agent.md",
  "/product/embeddings.md",
  "/product/transformation-agent.md",
  "/product/personalization-agent.md",
  "/product/engram.md",
  "/product/explorer.md",
  "/product-previews.md",
  "/partners.md",
  "/partners/aws.md",
  "/partners/gcp.md",
  "/partners/databricks.md",
  "/partners/snowflake.md",
];

const TRACKED_PATH_SET = new Set(TRACKED_PATHS);

const REQUEST_AGENTS = [
  // OpenAI
  { pattern: "OAI-SearchBot", source: "ChatGPT", family: "OAI-SearchBot", trafficType: "ai_search_crawler" },
  { pattern: "GPTBot", source: "ChatGPT", family: "GPTBot", trafficType: "ai_crawler" },
  { pattern: "ChatGPT-User", source: "ChatGPT", family: "ChatGPT-User", trafficType: "ai_user_fetcher" },

  // Anthropic
  { pattern: "Claude-SearchBot", source: "Claude", family: "Claude-SearchBot", trafficType: "ai_search_crawler" },
  { pattern: "Claude-User", source: "Claude", family: "Claude-User", trafficType: "ai_user_fetcher" },
  { pattern: "ClaudeBot", source: "Claude", family: "ClaudeBot", trafficType: "ai_crawler" },
  { pattern: "anthropic-ai", source: "Claude", family: "anthropic-ai", trafficType: "ai_crawler" },

  // Perplexity
  { pattern: "Perplexity-User", source: "Perplexity", family: "Perplexity-User", trafficType: "ai_user_fetcher" },
  { pattern: "PerplexityBot", source: "Perplexity", family: "PerplexityBot", trafficType: "ai_search_crawler" },

  // Google
  { pattern: "Google-GeminiNotebook", source: "Gemini Notebook", family: "Google-GeminiNotebook", trafficType: "ai_user_fetcher" },
  { pattern: "Google-NotebookLM", source: "Gemini Notebook", family: "Google-NotebookLM", trafficType: "ai_user_fetcher" },
  { pattern: "Google-Agent", source: "Google Agent", family: "Google-Agent", trafficType: "ai_user_agent" },
  { pattern: "Googlebot", source: "Google", family: "Googlebot", trafficType: "search_crawler" },

  // Apple — more specific pattern MUST precede the shorter one it contains
  { pattern: "Applebot-Extended", source: "Apple", family: "Applebot-Extended", trafficType: "ai_crawler" },
  { pattern: "Applebot", source: "Apple", family: "Applebot", trafficType: "search_crawler" },

  // Other search / generic crawlers
  { pattern: "bingbot", source: "Bing", family: "bingbot", trafficType: "search_crawler" },
  { pattern: "DuckDuckBot", source: "DuckDuckGo", family: "DuckDuckBot", trafficType: "search_crawler" },
  { pattern: "YandexBot", source: "Yandex", family: "YandexBot", trafficType: "search_crawler" },
  { pattern: "CCBot", source: "Common Crawl", family: "CCBot", trafficType: "generic_crawler" },

  // Other AI-training crawlers
  { pattern: "Bytespider", source: "ByteDance", family: "Bytespider", trafficType: "ai_crawler" },
  { pattern: "Amazonbot", source: "Amazon", family: "Amazonbot", trafficType: "ai_crawler" },
];

function detectRequestAgent(ua) {
  if (!ua) {
    return { source: "unknown", family: "no_user_agent", trafficType: "unknown", recognised: false };
  }

  const lowerUA = ua.toLowerCase();

  for (const agent of REQUEST_AGENTS) {
    if (lowerUA.includes(agent.pattern.toLowerCase())) {
      return { ...agent, recognised: true };
    }
  }

  if (/(bot|crawler|spider|slurp|fetcher|scanner|preview)/i.test(ua)) {
    return { source: "unknown", family: "other_automated", trafficType: "other_automated", recognised: false };
  }

  if (/(curl|wget|python-requests|go-http-client|okhttp|node-fetch)/i.test(ua)) {
    return { source: "unknown", family: "script_client", trafficType: "script_client", recognised: false };
  }

  if (/(mozilla\/5\.0|chrome\/|safari\/|firefox\/|edg\/)/i.test(ua)) {
    return { source: "unknown", family: "browser_like", trafficType: "browser_like", recognised: false };
  }

  return { source: "unknown", family: "unknown_client", trafficType: "unknown", recognised: false };
}

async function hashClientId(ip) {
  if (!ip) return "edge-server";
  const data = new TextEncoder().encode(ip);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}

// Runs entirely inside context.waitUntil() — must never be awaited by the
// main handler, and must never throw past its own boundary.
async function sendLlmPageViewEvent({ measurementId, apiSecret, ip, path, origin, agent }) {
  try {
    const clientId = await hashClientId(ip);
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: clientId,
          events: [
            {
              name: "llm_page_view",
              params: {
                page_path: path,
                page_location: `${origin}${path}`,
                ai_source: agent.source,
                is_ai_crawler: agent.trafficType.startsWith("ai_") ? "true" : "false",
                agent_family: agent.family,
                traffic_type: agent.trafficType,
                tracking_version: "v2",
              },
            },
          ],
        }),
      }
    );
  } catch {
    // Fire-and-forget: response has already been served, nothing to recover.
  }
}

export default async (request, context) => {
  const url = new URL(request.url);
  const path = url.pathname;

  // Defence in depth: only our curated LLM endpoints, GET only.
  if (request.method !== "GET" || !TRACKED_PATH_SET.has(path)) {
    return context.next();
  }

  try {
    const measurementId =
      Netlify.env.get("GA4_MEASUREMENT_ID") || Netlify.env.get("GOOGLE_TRACKING_ID");
    const apiSecret = Netlify.env.get("GA4_API_SECRET");

    if (measurementId && apiSecret) {
      const ua = request.headers.get("user-agent") || "";
      const agent = detectRequestAgent(ua);

      context.waitUntil(
        sendLlmPageViewEvent({
          measurementId,
          apiSecret,
          ip: context.ip,
          path,
          origin: url.origin,
          agent,
        })
      );
    }
  } catch {
    // Analytics must never block or break the served file — swallow and continue.
  }

  return context.next();
};

export const config = {
  path: TRACKED_PATHS,
  onError: "bypass",
};
