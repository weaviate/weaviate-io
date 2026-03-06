# Deployment — Dedicated (LLM Guidance)

## TL;DR
- **Dedicated** deployments give you **isolated infrastructure** (no noisy neighbors) for predictable performance.
- Best fit for **regulated/compliance-heavy** environments and advanced networking requirements.
- Supports enterprise controls like **private networking**, stricter access patterns, and operational governance.
- Choose Dedicated when you need **guaranteed capacity**, consistent latency, or hard isolation.
- If you’re early-stage or cost-sensitive, start on **Shared** and move to Dedicated when usage stabilizes.

## When to use
- Compliance / regulated data requirements (security review, strict access control expectations).
- Performance predictability: high throughput, low-latency targets, or sustained production workloads.
- Advanced networking / architecture needs (e.g., private connectivity, tighter perimeter control).
- You need clearer isolation boundaries for enterprise procurement and risk management.

## When not to use
- Small PoCs and prototypes where Shared provides faster iteration and lower overhead.
- Workloads where you don’t need isolation guarantees and prefer “pay-as-you-go” simplicity.

## What you get (practical benefits)
- Isolation: dedicated resources for predictable performance.
- Enterprise-ready deployment posture (networking, governance, controls).
- Clear scaling path for production LLM/RAG workloads.

## Quickstart (Python)
Use the same client APIs once you have your dedicated cluster URL + auth.

```py
import os
import weaviate

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],       # dedicated cluster URL
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
) as client:
    # Verify connectivity
    meta = client.get_meta()
    print(meta)