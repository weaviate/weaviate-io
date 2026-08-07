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
];

const TRACKED_PATH_SET = new Set(TRACKED_PATHS);

const REQUEST_AGENTS = [

  {
    pattern: "OAI-SearchBot",
    source: "ChatGPT",
    family: "OAI-SearchBot",
    trafficType: "ai_search_crawler",
  },
  {
    pattern: "GPTBot",
    source: "ChatGPT",
    family: "GPTBot",
    trafficType: "ai_crawler",
  },
  {
    pattern: "ChatGPT-User",
    source: "ChatGPT",
    family: "ChatGPT-User",
    trafficType: "ai_user_fetcher",
  },

  // Anthropic
  {
    pattern: "Claude-SearchBot",
    source: "Claude",
    family: "Claude-SearchBot",
    trafficType: "ai_search_crawler",
  },
  {
    pattern: "Claude-User",
    source: "Claude",
    family: "Claude-User",
    trafficType: "ai_user_fetcher",
  },
  {
    pattern: "ClaudeBot",
    source: "Claude",
    family: "ClaudeBot",
    trafficType: "ai_crawler",
  },
  {
    pattern: "anthropic-ai",
    source: "Claude",
    family: "anthropic-ai",
    trafficType: "ai_crawler",
  },
  {
    pattern: "Perplexity-User",
    source: "Perplexity",
    family: "Perplexity-User",
    trafficType: "ai_user_fetcher",
  },
  {
    pattern: "PerplexityBot",
    source: "Perplexity",
    family: "PerplexityBot",
    trafficType: "ai_search_crawler",
  },
  {
    pattern: "Google-GeminiNotebook",
    source: "Gemini Notebook",
    family: "Google-GeminiNotebook",
    trafficType: "ai_user_fetcher",
  },
  {
    pattern: "Google-NotebookLM",
    source: "Gemini Notebook",
    family: "Google-NotebookLM",
    trafficType: "ai_user_fetcher",
  },
  {
    pattern: "Google-Agent",
    source: "Google Agent",
    family: "Google-Agent",
    trafficType: "ai_user_agent",
  },
  {
    pattern: "Googlebot",
    source: "Google",
    family: "Googlebot",
    trafficType: "search_crawler",
  },
  {
    pattern: "bingbot",
    source: "Bing",
    family: "bingbot",
    trafficType: "search_crawler",
  },
  {
    pattern: "CCBot",
    source: "Common Crawl",
    family: "CCBot",
    trafficType: "generic_crawler",
  },
];

function detectRequestAgent(ua) {
  if (!ua) {
    return {
      source: "unknown",
      family: "no_user_agent",
      trafficType: "unknown",
      recognised: false,
    };
  }

  const lowerUA = ua.toLowerCase();

  for (const agent of REQUEST_AGENTS) {
    if (lowerUA.includes(agent.pattern.toLowerCase())) {
      return {
        ...agent,
        recognised: true,
      };
    }
  }

  
  if (/(bot|crawler|spider|slurp|fetcher|scanner|preview)/i.test(ua)) {
    return {
      source: "unknown",
      family: "other_automated",
      trafficType: "other_automated",
      recognised: false,
    };
  }

  if (/(curl|wget|python-requests|go-http-client|okhttp|node-fetch)/i.test(ua)) {
    return {
      source: "unknown",
      family: "script_client",
      trafficType: "script_client",
      recognised: false,
    };
  }

  if (/(mozilla\/5\.0|chrome\/|safari\/|firefox\/|edg\/)/i.test(ua)) {
    return {
      source: "unknown",
      family: "browser_like",
      trafficType: "browser_like",
      recognised: false,
    };
  }

  return {
    source: "unknown",
    family: "unknown_client",
    trafficType: "unknown",
    recognised: false,
  };
}

export default async (request, context) => {
  const url = new URL(request.url);
  const path = url.pathname;

  // Defence in depth: only our curated LLM endpoints.
  if (request.method !== "GET" || !TRACKED_PATH_SET.has(path)) {
    return context.next();
  }

  const measurementId =
    Netlify.env.get("GA4_MEASUREMENT_ID") ||
    Netlify.env.get("GOOGLE_TRACKING_ID");

  const apiSecret = Netlify.env.get("GA4_API_SECRET");

  if (measurementId && apiSecret) {
    const ua = request.headers.get("user-agent") || "";
    const agent = detectRequestAgent(ua);

    context.waitUntil(
      fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: context.ip || "edge-server",
            events: [
              {
                name: "llm_page_view",
                params: {
                  page_path: path,

                  // Strip query strings to avoid unnecessary GA cardinality.
                  page_location: `${url.origin}${path}`,

                  // Existing dimensions — keep for backwards compatibility.
                  ai_source: agent.source,
                  is_ai_crawler: agent.recognised ? "true" : "false",

                  // New diagnostic dimensions.
                  agent_family: agent.family,
                  traffic_type: agent.trafficType,
                  tracking_version: "v2",
                },
              },
            ],
          }),
        }
      ).catch(() => {})
    );
  }

  return context.next();
};


export const config = {
  path: TRACKED_PATHS,
  method: "GET",
};