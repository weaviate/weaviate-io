---
title: Runtime configuration management
sidebar_label: Runtime configuration
sidebar_position: 1
image: og/docs/configuration.jpg
---

:::info Added in `v1.30`
:::

Weaviate supports runtime configuration management, allowing certain environment variables to be updated and read by Weaviate on the fly without the need for restarts. This feature helps you adapt settings in real time and fine-tune your instance based on evolving needs.

## Set up runtime configuration

Follow these steps to set up runtime configuration management:

1. **Enable the feature**  
   Set the environment variable `RUNTIME_OVERRIDES_ENABLED` to `true`.

2. **Provide an overrides file**  
   Create a configuration file that contains the runtime overrides and point to it using the `RUNTIME_OVERRIDES_PATH` variable.

<details>
  <summary>Example configuration override file</summary>

```yaml title="overrides.yaml"
ASYNC_REPLICATION_DISABLED: 'false'
MAXIMUM_ALLOWED_COLLECTIONS_COUNT: '20'
```

</details>

3. **Set the update interval**  
   Set the `RUNTIME_OVERRIDES_LOAD_INTERVAL` variable to define how often Weaviate should check for configuration changes (default is `2m`).

4. **Restart the instance**  
   In order to finish the setup, restart your Weaviate instance. 

### Configuration variables

The following environment variables are used to control runtime configuration management:

| Variable                          | Description                                                                  | Type                 |
| --------------------------------- | ---------------------------------------------------------------------------- | -------------------- |
| `RUNTIME_OVERRIDES_ENABLED`       | If set, the runtime configuration management is enabled. Default: `false`    | `boolean`            |
| `RUNTIME_OVERRIDES_PATH`          | Path of the configuration override file. Default: `"/config/overrides.yaml"` | `string - file path` |
| `RUNTIME_OVERRIDES_LOAD_INTERVAL` | Refresh rate for checking if there are configuration changes. Default: `2m`  | `string - duration`  |

## Runtime configurable environment variables

Below you can find a list of the environment variables that can be changed at runtime:

| Variable                            |
| ----------------------------------- |
| `ASYNC_REPLICATION_DISABLED`        |
| `AUTOSCHEMA_ENABLED`                |
| `MAXIMUM_ALLOWED_COLLECTIONS_COUNT` |

For more details about the variables, check out the [Environment variables](./index.md) page.
