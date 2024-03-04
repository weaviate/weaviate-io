---
title: Telemetry
sidebar_position: 80
image: og/docs/configuration.jpg
# tags: ['HNSW']
---

In order to better understand community needs, Weaviate collects some telemetry data. This data helps Weaviate to identify usage trends and improve our software for our users. Weaviate collects this information by default, but you can disable telemetry at any time.

## Data collected

On startup, the Weaviate server generates a unique instance ID. Every 24 ours the instance sends this information:

- Machine id
- Payload type
- Server version
- Host operating system
- Enabled modules
- Number of objects in the instance

Weaviate does not collect any other telemetry information.

## Disabling Telemetry Data

To disable telemetry data collection, add this line to your [system configuration](./env-vars.md) file:

```bash
DISABLE_TELEMETRY=true
```

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
