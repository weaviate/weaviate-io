---
title: "30-day Weaviate Enterprise Edition trial"
description: "Try Weaviate Enterprise Edition for 30 days on your own infrastructure. Request a trial license key for your self-hosted deployment."
canonical: https://weaviate.io/enterprise-edition
last-updated: 2026-10-30
---

# Try Weaviate Enterprise Edition for 30 days

## TL;DR

- Request a trial license key valid for 30 days for your self-hosted deployment.
- Weaviate Enterprise Edition adds features for teams running Weaviate on their own infrastructure at scale.
- Enterprise Edition is included with Weaviate Assurance, Weaviate's enterprise subscription for self-hosted teams.
- Community Edition and Enterprise Edition use the same Docker image and binary. A license key selects the edition when Weaviate starts; without a key, it runs Community Edition.
- On Weaviate v1.40 or later, activate Enterprise Edition by requesting a license key and restarting Weaviate with the key, then configure the features you want to use. No separate image or binary is needed.
- License keys apply to self-hosted deployments. Weaviate Cloud customers do not need a license key.

## Request your 30-day trial key

[Request your 30-day self-hosted trial](https://weaviate.io/enterprise-edition).

## How Enterprise Edition works

Weaviate is open source. Enterprise Edition provides additional features for larger self-hosted deployments, with a focus on security, scaling, and stability. The available feature list evolves with releases; see the [Enterprise Edition documentation](https://docs.weaviate.io/deploy/enterprise#frequently-asked-questions) for current features and activation details.

1. Use the same Weaviate image and binary as Community Edition.
2. Provide a license key when starting Weaviate to select Enterprise Edition.
3. If no license key is provided, Weaviate starts as Community Edition.
4. To upgrade an existing self-hosted deployment on v1.40 or later, obtain a key and restart Weaviate with it, then configure the Enterprise features you want to use. No separate image or binary is required.

## Deployment and subscription scope

- **Self-hosted Weaviate:** Enterprise Edition license keys are used to activate the edition on customer-managed infrastructure.
- **Weaviate Assurance:** Enterprise Edition is included with Assurance, Weaviate's enterprise subscription for self-hosted teams.
- **Weaviate Cloud:** Cloud customers do not need a license key; the license-key process is for self-hosted deployments.

## Further information

- [Enterprise Edition documentation](https://docs.weaviate.io/deploy/enterprise#frequently-asked-questions) — activation, environment variables, and the current feature list.
- [Weaviate Assurance](https://weaviate.io/product/assurance) — enterprise subscription and support for self-hosted Weaviate.
- [Request your 30-day Enterprise Edition trial](https://weaviate.io/enterprise-edition) — request a self-hosted trial license key.

## Features to evaluate

Available from Weaviate v1.40: Shard Self-Recovery, Namespaces, and deduplicated backups. Each feature has its own configuration setting. See [Enterprise Edition features and configuration requirements](https://docs.weaviate.io/deploy/enterprise#enterprise-edition-features).

## Enterprise Edition trial FAQ

### Who is the trial for?

Teams evaluating Enterprise Edition on their own infrastructure. Enterprise Edition is included with Weaviate Assurance, our enterprise subscription for self-hosted teams.

### Is this a Weaviate Cloud trial?

No. This trial license is for self-hosted deployments. Weaviate Cloud customers do not need an Enterprise Edition license key.

### Do I need a different image or binary?

No. Community Edition and Enterprise Edition ship in the same Docker image and binary. Without a license key, Weaviate runs as Community Edition.

### How long is the trial?

Your trial license key is valid for 30 days.

### What happens when the trial expires?

To discuss continuing with a full license and confirm how expiry affects your deployment, [contact the Weaviate team](https://weaviate.io/contact) before your trial ends.

### Can I upgrade an existing self-hosted deployment?

Yes. On a supported version (v1.40 or later), provide a valid license key and restart Weaviate, then configure the Enterprise features you want to use. Switching editions does not require a separate image or binary. Follow the [Enterprise Edition activation instructions](https://docs.weaviate.io/deploy/enterprise#activate-the-enterprise-edition).

## Deployment and pricing resources

- [Self-hosted deployment guides](https://docs.weaviate.io/deploy)
- [Weaviate pricing options](https://weaviate.io/pricing)

## Canonical source

[Weaviate Enterprise Edition](https://weaviate.io/enterprise-edition)
