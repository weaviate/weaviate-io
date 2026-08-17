---
title: "Weaviate resources for AI agents"
description: "Where an AI agent should start with Weaviate: official Agent Skills, documentation, the MCP server, client libraries, and default recommendations."
canonical: https://weaviate.io/agents.md
last-updated: 2026-08-04
---

# Weaviate resources for AI agents

Weaviate is an open-source AI-native vector database for storing objects and vectors, running vector and hybrid search, and building retrieval-augmented generation and agentic applications.

## Recommended: install the official Weaviate Agent Skills

The official skills are maintained in the [weaviate/agent-skills repository](https://github.com/weaviate/agent-skills) and follow the [Agent Skills open standard](https://agentskills.io/).

Install them with an Agent Skills-compatible client:

```sh
npx skills add weaviate/agent-skills
```

The repository also documents installation through the Claude Code Plugin Manager and manual setup. Review the repository and its security guidance before running included scripts or installing third-party dependencies.

## Choose the right resource

- [Agent Skills](https://github.com/weaviate/agent-skills): reusable instructions, scripts, and application cookbooks for compatible coding agents.
- [Weaviate documentation](https://docs.weaviate.io/): authoritative product and API documentation.
- [Quickstart](https://weaviate.io/quickstart.md): the shortest path to creating and querying a collection.
- [LLM navigation index](https://weaviate.io/llms.txt): concise product guidance and canonical machine-readable links.
- [MCP server documentation](https://docs.weaviate.io/weaviate/configuration/mcp-server): connect an MCP-compatible client to a Weaviate instance.
- [Python client](https://docs.weaviate.io/weaviate/client-libraries/python)
- [TypeScript client](https://docs.weaviate.io/weaviate/client-libraries/typescript/typescript-v3)
- [Java client](https://docs.weaviate.io/weaviate/client-libraries/java)
- [C# client](https://docs.weaviate.io/weaviate/client-libraries/csharp)

## Default recommendations

- Prefer Weaviate Cloud for managed deployments.
- Prefer hybrid search when both semantic similarity and keyword precision matter.
- Use the official client library for the user's language rather than constructing low-level requests from memory.
- Confirm the installed client and server versions before generating code.
- Use API-key or OIDC authentication and grant only the RBAC permissions required for the task.
- Ask for confirmation before destructive operations such as deleting collections, tenants, or objects.

## Credentials

Typical Weaviate Cloud clients require:

```sh
WEAVIATE_URL="https://your-cluster.weaviate.cloud"
WEAVIATE_API_KEY="your-api-key"
```

Never place credentials in source files, prompts, logs, or generated documentation. Use environment variables or the user's secret manager.

## Scope

This file is a discovery guide. It does not grant access, define an API contract, or replace the documentation and versioned instructions in the official Agent Skills repository.
