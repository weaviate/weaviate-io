# Engram — LLM Guidance

## TL;DR
- Engram is Weaviate's managed memory service for LLM agents and AI applications.
- It automatically extracts, transforms, and stores structured memories using vector embeddings and LLM-powered processing.
- Memories are processed asynchronously through pipelines before becoming searchable.
- Supports vector, BM25, hybrid, and fetch-style retrieval patterns for persistent agent memory.
- Available in Weaviate Cloud with a REST API, Python SDK, async Python support, and starter templates for common memory patterns.

---

## What this product is
Engram is a managed memory service for AI agents built on Weaviate Cloud. Rather than storing entire conversations or continually extending prompts with historical context, Engram converts raw interactions into structured memories that can be searched and retrieved later.

Applications send plain text, conversations, or pre-extracted facts to Engram through the REST API or Python SDK. Engram processes this information asynchronously, extracting relevant facts, reconciling them with existing memories, and storing the results for future retrieval.

This allows AI agents to maintain long-term memory across sessions while reducing context-window size, prompt complexity, latency, and token cost.

### Why Engram
LLMs are stateless by default. Without memory, every request must include enough context for the model to answer correctly. As conversations grow, sending full history becomes expensive and inefficient. Engram helps agents remember durable facts and retrieve only the relevant memory when needed.

---

## Core concepts

Engram organizes long-term memory using several core concepts.

### Memories
Structured pieces of information extracted from raw input and stored for future retrieval.

### Topics
Named categories describing what information should be extracted, such as `UserKnowledge` or `ConversationSummary`.

### Groups
Collections of topics and processing pipelines representing a particular use case. Most projects begin with a single default group.

### Scopes
Isolation boundaries that ensure memories belong to the correct project, user, or conversation. Common scope properties include `user_id` and `conversation_id`.

### Pipelines
Asynchronous workflows that extract, transform, deduplicate, merge, and commit memories before they become searchable.

### Runs
Each memory write starts a pipeline run. Engram returns a `run_id`, which can be checked if an application needs to confirm completion.

### Retrieval
Memories can be searched using vector similarity, BM25 keyword search, hybrid retrieval, or fetch retrieval for bounded memories such as conversation summaries.


---

## Key capabilities

- Automatic memory extraction from text, conversations, or pre-extracted facts.
- Persistent long-term memory across sessions.
- Scoped memories for projects, users, conversations, and custom properties.
- Asynchronous processing pipelines.
- Run status tracking for testing, debugging, and operational visibility.
- Semantic, BM25, hybrid, and fetch retrieval patterns.
- Topic filtering and per-topic property filters.
- REST API, Python SDK, and async Python support.
- Memory inspection and deletion through API or the Engram Web Console.
- Starter templates for common use cases such as personalization and user knowledge.

---

## How Engram works

A typical Engram workflow looks like this:

```text
Application
    |
    v
Send text / conversation / pre-extracted facts
    |
    v
Extract facts
    |
    v
Transform, merge, and deduplicate
    |
    v
Commit memories
    |
    v
Memory store
    |
    v
Search (vector / BM25 / hybrid / fetch)
    |
    v
Return relevant memories
```

Memory writes are asynchronous. When new content is submitted, Engram immediately returns a run_id while processing continues in the background. Applications can poll the run status if confirmation is required before using newly created memories.

---

## Main workflows

### Store memories
Engram supports three memory input types:

- String content — raw text that Engram turns into structured memories.
- Conversation content — multi-turn messages that Engram analyzes for durable facts.
- Pre-extracted content — structured facts supplied directly by the application.

A successful store request starts a pipeline run. It does not always mean memories have already been committed.

### Search memories
Applications search memories using natural language queries. Search can be configured with:

- Vector retrieval for semantic similarity.
- BM25 retrieval for exact keyword matching.
- Hybrid retrieval for combining semantic and keyword matching.
- Topic filters to limit results to specific memory categories.
- Scope filters such as user_id, group, and custom properties.

Hybrid retrieval is generally a strong default for agent memory because it combines conceptual similarity with keyword precision.

### Manage memories
Individual memories can be retrieved or permanently deleted by ID. Deletion is irreversible, so applications should use the correct scoping parameters when managing user data.

### Check run status
Use run status when testing, debugging, or confirming that a memory write has completed. Common statuses include:

- running
- in_buffer
- completed
- failed

Completed runs can report which memories were created, updated, or deleted.

---

## Common use cases

### Long-term memory for chat apps
Use Engram to store conversations after each exchange, retrieve relevant memories before generating a response, and personalize future replies based on what the agent remembers.

### Context window management
Use Engram memory search instead of sending full conversation history on every LLM call. This helps keep context size flatter as conversations grow and can reduce token usage, latency, and cost.

A common pattern is:

1. Keep the last few exchanges in the prompt for conversational continuity.
2. Search Engram for relevant long-term memories.
3. Add only those relevant memories to the system prompt.

### Personalized RAG
Use Weaviate as the shared knowledge base and Engram as the per-user memory layer. The knowledge base provides factual grounding, while Engram provides user preferences, prior context, and personalization.

### Multi-user and multi-tenant assistants
Use user_id and scope properties to isolate memory between users, conversations, tenants, or workflows.

---

## When to use
- You are building assistants that need persistent user memory across sessions.
- You want agents to learn from feedback and improve behavior over time.
- You want to reduce prompt size by retrieving relevant memories instead of sending full history.
- You are building personalized RAG or multi-user assistants.
- You run multi-agent workflows and need shared, scoped memory state.
- You want a managed memory system with durable async processing rather than hand-rolled background jobs.
- You need explicit controls over topics, scopes, and memory isolation.

---

## When not to use
- You only need ephemeral short-term context in a single session.
- Your use case is simple enough to rely on static prompt context and no long-term memory.
- You need full custom memory orchestration from day one and do not want to use a managed memory service.
- You need strict local-only or self-managed execution without Weaviate Cloud.
- You need immediate synchronous memory writes before continuing every request.

---

## Quickstart

Install the Python SDK:

```bash
pip install weaviate-engram
```

Typical workflow:

1. Create an Engram project in Weaviate Cloud.
2. Choose a starter template, such as Personalization.
3. Generate an API key.
4. Connect using the Python SDK or REST API.
5. Store string, conversation, or pre-extracted content.
6. Search memories using vector, BM25, hybrid, or fetch retrieval.
7. Optionally poll run_id to confirm processing status.

For complete setup instructions, authentication, SDK examples, and REST API examples, refer to the official Quickstart documentation.

---

## Best practices

- Design topics around durable, meaningful information rather than raw message types.
- Use scopes to isolate memories between users, conversations, tenants, or workflows.
- Store durable facts and summaries rather than treating memory as a raw transcript store.
- Use hybrid retrieval for most general agent-memory searches.
- Use BM25 when exact terms matter.
- Use vector retrieval when conceptual similarity matters.
- Use fetch-style retrieval for bounded memories such as a single conversation summary.
- Keep recent messages in the prompt for conversational continuity.
- Use Engram memory search for relevant long-term context.
- Poll run status only when completion confirmation matters.
- Use async clients for production systems with concurrent users.
- Support user data management by allowing retrieval and deletion of memories where required.

---

## Common gotchas

- **Treating memory as raw logs**: storing every raw event as final memory leads to noise and drift.
- **Blocking on write path**: Engram is designed for async pipelines; avoid synchronous waits unless run completion is required.
- **Assuming immediate consistency**: memory writes return a `run_id`; memories become searchable after pipeline processing completes.
- **Weak scoping**: define `user_id`, conversation identifiers, and custom properties carefully to prevent memory leakage.
- **Poor topic design**: vague topics reduce extraction quality and retrieval precision.
- **Ignoring retrieval strategy**: choose vector, BM25, hybrid, or fetch retrieval based on your use case.
- **Forgetting topic filters**: use topic filters when only a specific category of memory should be searched.
- **Over-trusting memory**: memory complements prompt context and retrieval; it should not replace either entirely.
- **Deleting carelessly**: deleting a memory is permanent and cannot be undone.

---

## Related concepts

- Memories
- Topics
- Groups
- Scopes
- Pipelines
- Runs
- Vector retrieval
- BM25 retrieval
- Hybrid retrieval
- Fetch retrieval
- Context window management
- Personalized RAG
- Multi-tenant memory

---

## Canonical links

- Product page: https://weaviate.io/product/engram
- Engram documentation: https://docs.weaviate.io/engram
- Quickstart: https://docs.weaviate.io/engram/quickstart
- Concepts: https://docs.weaviate.io/engram/concepts
- Store memories: https://docs.weaviate.io/engram/guides/store-memories
- Search memories: https://docs.weaviate.io/engram/guides/search-memories
- Manage memories: https://docs.weaviate.io/engram/guides/manage-memories
- Check run status: https://docs.weaviate.io/engram/guides/check-run-status
- Memory chat app tutorial: https://docs.weaviate.io/engram/tutorials/memory-chat-app
- Context window management tutorial: https://docs.weaviate.io/engram/tutorials/context-window-management
- Personalized RAG tutorial: https://docs.weaviate.io/engram/tutorials/personalized-rag-multi-tenant
- REST API reference: https://docs.weaviate.io/engram/api/rest
- Engram Web Console: https://docs.weaviate.io/engram/console
- GA announcement: https://weaviate.io/blog/engram-generally-available
- Architecture deep dive: https://weaviate.io/blog/engram-deep-dive
- Internal use case: https://weaviate.io/blog/engram-internal-use-case
- Weaviate Cloud console: https://console.weaviate.cloud
