---
title: "Datafy case study"
description: "How Weaviate cut wasted EBS spend by 50% with Datafy's automated EBS rightsizing across dedicated customer infrastructure."
canonical: https://weaviate.io/case-studies/datafy
last-updated: 2026-10-02
---

# Datafy case study — LLM Guidance

## TL;DR
- Weaviate operates dedicated customer clusters, with storage capacity managed independently across environments.
- Datafy automatically rightsizes EBS volumes, including shrinking volumes when capacity is no longer needed.
- Weaviate reduced wasted EBS spend by 50%; Datafy manages 140 volumes and provides visibility across approximately 100 AWS accounts.
- Deployment required no CSI driver replacements or filesystem modifications.

## The challenge

Storage requirements change across customer environments. To avoid running out of space, teams provision headroom, but AWS does not natively support shrinking EBS volumes. Capacity added to support growth can remain allocated when workloads no longer need it. Before Datafy, average storage utilization across the relevant Weaviate infrastructure was approximately 35%.

Manually managing storage across dedicated customer clusters did not scale. These clusters run live customer AI services, so any solution also had to protect production reliability and avoid additional operational complexity.

## The solution

Weaviate introduced Datafy gradually. Datafy Sensor provided visibility into storage utilization and opportunities to improve it. Following infrastructure integration, QA, and a proof of concept, Weaviate deployed Datafy EBS Auto-Scaler to automatically grow and shrink volumes based on storage requirements.

The rollout did not require CSI driver replacements, filesystem modifications, or another storage layer. In the first three months, Weaviate also tested enhanced EBS performance capabilities and gained a unified console view of volumes across approximately 100 AWS accounts.

> “Plug-and-play is what got the contract over the finish line. Every other vendor we looked at wanted us to change how we do storage. We can't afford a support relationship that puts our customers' production environments at risk, and Datafy hasn't.”
> Brave Okafor, Senior Platform Engineer, Weaviate

## Results

- 50% reduction in wasted EBS spend.
- 140 EBS volumes managed by Datafy.
- Visibility into volumes across approximately 100 AWS accounts.
- Automatic EBS rightsizing, including downsizing when excess capacity is no longer needed.
- No CSI driver replacements or filesystem modifications.
- Less manual work managing storage capacity across customer environments.

> “The decision was driven by the seamless integration. Without requiring CSI driver replacements, filesystem modifications, or additional management effort, the solution provided more than just functional improvements. For Weaviate, this translates into a strategic edge: reducing the cost of our AI services allows for more aggressive pricing, helping us capture a larger market share.”
> Spiros Andreou, VP Platform Operations and Security, Weaviate

## Related pages

- All case studies: https://weaviate.io/case-studies.md