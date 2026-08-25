---
title: "Weaviate authentication"
description: "Machine-readable authentication, authorization, credential lifecycle, and SDK installation guidance for Weaviate."
canonical: https://weaviate.io/auth.md
last-updated: 2026-08-25
---

# Weaviate authentication

Use this guide with the [official authentication documentation](https://docs.weaviate.io/deploy/configuration/authentication). Do not put credentials in source code, prompts, logs, or committed files.

## Weaviate Cloud

Weaviate Cloud (WCD) clusters are pre-configured for API-key authentication.

1. Open the cluster in the [Weaviate Cloud Console](https://console.weaviate.cloud/).
2. Open the cluster's API keys section and choose **Create an API key**.
3. Assign only the RBAC roles required by the application, then copy the key when it is shown.

Store the key in a secret manager or an environment variable. The cluster URL and key are application inputs, not values to infer:

```sh
export WEAVIATE_URL="https://your-cluster.weaviate.cloud"
export WEAVIATE_API_KEY="replace-with-a-secret"
```

The Cloud console supports editing assigned roles, rotating a key (which invalidates the old key), and deleting a key. Use rotation for planned replacement and deletion for immediate revocation. See [Cloud authentication](https://docs.weaviate.io/cloud/manage-clusters/authentication) and [Cloud authorization](https://docs.weaviate.io/cloud/manage-clusters/authorization).

## OIDC

Self-hosted Weaviate supports OpenID Connect (OIDC) when configured with an OpenID Connect Discovery-compatible issuer. API-key and OIDC authentication can be enabled together. Configure OIDC on the deployment using the documented settings in [Authentication: OIDC](https://docs.weaviate.io/deploy/configuration/authentication#oidc-authentication), including the issuer, client ID, username claim, and optional client scopes required by the identity provider.

OIDC users can be assigned Weaviate RBAC roles. The supported token flow and client behavior depend on the identity provider and SDK; follow the [OIDC configuration guide](https://docs.weaviate.io/deploy/configuration/oidc) and the SDK documentation.

**Weaviate Cloud database authentication is documented using API keys.** The official Cloud documentation does not currently describe a Weaviate-hosted delegated OAuth 2.0 consent flow. Do not infer OAuth scopes, token endpoints, manifests, or authorization flows. Self-hosted OIDC uses an external identity provider and is not a substitute for Cloud API-key authentication.

## RBAC and least privilege

Authentication identifies a user; RBAC authorizes actions. Use a separate identity or API key for each application, assign the smallest custom role that covers its required resources, and constrain permissions by collection and tenant where needed. Do not use `root` for routine application traffic. The built-in `viewer` role is read-only; custom roles and available permissions are defined in the [RBAC documentation](https://docs.weaviate.io/weaviate/configuration/rbac).

## Rotation and revocation

- Cloud: rotate or delete keys in the cluster API keys section; rotation invalidates the old key and deletion revokes it.
- Self-hosted: the user management API can create and delete users, assign and revoke roles, and rotate user API keys. See [Manage users](https://docs.weaviate.io/weaviate/configuration/rbac/manage-users).
- Replace the value in the secret manager or environment, deploy the new value, verify access, and then revoke the old credential.

## Cloud onboarding

Sign in to [Weaviate Cloud](https://console.weaviate.cloud/) and create a cluster, trial, or free product option currently offered in the console. Use the endpoint and generated API key supplied for that resource, then follow the [Cloud connection guide](https://docs.weaviate.io/cloud/manage-clusters/connect). Pricing, quotas, expiry, and available plans can change, so use the values shown in the console rather than assuming them.

## Official SDKs

These are the officially maintained SDKs listed by the [Weaviate client-library index](https://docs.weaviate.io/weaviate/client-libraries/). Registry links and installation commands are canonical:

| SDK | Registry | Install |
| --- | --- | --- |
| Python | [PyPI: `weaviate-client`](https://pypi.org/project/weaviate-client/) | `python -m pip install -U weaviate-client` |
| TypeScript / JavaScript | [npm: `weaviate-client`](https://www.npmjs.com/package/weaviate-client) | `npm install weaviate-client` |
| Go | [Go package: `github.com/weaviate/weaviate-go-client/v5`](https://pkg.go.dev/github.com/weaviate/weaviate-go-client/v5) | `go get github.com/weaviate/weaviate-go-client/v5` |
| Java | [Maven Central: `io.weaviate:client6`](https://central.sonatype.com/artifact/io.weaviate/client6) | Add `io.weaviate:client6` using the current version shown in Maven Central |
| C# | [NuGet: `Weaviate.Client`](https://www.nuget.org/packages/Weaviate.Client) | `dotnet add package Weaviate.Client` |

Use the current version and authentication examples from the relevant [client-library documentation](https://docs.weaviate.io/weaviate/client-libraries/).