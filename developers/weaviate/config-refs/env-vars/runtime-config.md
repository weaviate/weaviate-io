---
title: Runtime configuration management
sidebar_label: Runtime configuration
sidebar_position: 1
image: og/docs/configuration.jpg
---

:::caution Technical preview

Runtime configuration management was added in **`v1.30`** as a **technical preview**.
<br/>

This means that the feature is still under development and may change in future releases, including potential breaking changes.
**We do not recommend using this feature in production environments at this time.**

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
maximum_allowed_collections_count: 8
autoschema_enabled: true
async_replication_disabled: false
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

Below you can find a list of the environment variables that can be changed at runtime and the names that should be used in the override file:

| Environment variable name           | Runtime override name               |
| ----------------------------------- | ----------------------------------- |
| `ASYNC_REPLICATION_DISABLED`        | `async_replication_disabled`        |
| `AUTOSCHEMA_ENABLED`                | `autoschema_enabled`               |
| `MAXIMUM_ALLOWED_COLLECTIONS_COUNT` | `maximum_allowed_collections_count` |

For more details about the variables, check out the [Environment variables](./index.md) page.

## Operation and monitoring

Runtime configuration is based on tracking configuration file changes, which involves certain operational considerations.
If Weaviate attempts to start with an invalid runtime configuration file (e.g., malformed YAML), the process will fail to start and exit.

When modifying the runtime configuration file for a running Weaviate instance, if the new configuration is invalid, Weaviate continues using the last valid configuration that is stored in memory. Error logs and metrics will indicate when configuration loading fails.

### Metrics
Weaviate provides the following [metrics to help you monitor](../../configuration/monitoring.md) runtime configuration status:

| Metric Name                                 | Description                                                                                                       |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `weaviate_runtime_config_last_load_success` | Indicates whether the last loading attempt was successful (`1` for success, `0` for failure)                      |
| `weaviate_runtime_config_hash`              | Hash value of the currently active runtime configuration, useful for tracking when new configurations take effect |

### Logs

Weaviate also provides following logs to about runtime configuration changes and failures.

1. When new config is invalid and weaviate is using the old config. You see following `ERROR` log.
```
loading runtime config every 2m failed, using old config: invalid yaml
```

2. When any value of the runtime config is changed. You see following `INFO` log
```
 runtime overrides: config 'MaximumAllowedCollectionsCount' changed from '-1' to '7'  action=runtime_overrides_changed field=MaximumAllowedCollectionsCount new_value=7 old_value=-1
```
### Failure modes

1. When you try to start Weaviate process with invalid runtime config, Weaviate will fail to start until the config is fixed.
1. Once Weaviate is started with "good" runtime config and for any reason, the runtime config is changed and became invalid, Weaviate will keep using the old "good" runtime config. But care to be taken that for any reason, this Weaviate process OOMs (goes Out Of Memory) or crashes, then it won't be able to start back up until the config is fixed.

The rationale for (2) is based on principle of "Fail early and fail fast". Basically if we let Weaviate to start with old ENV configs instead, then that may be wrong config and we should never let any database to start with wrong config which usually leads to series problems like data corruption or slient failures that is very hard to debug.

Example:
1. You have ENV variable `MAXIMUM_ALLOWED_COLLECTIONS_COUNT` set to 10.
1. You have runtime config to override that `MaximumAllowedCollectionsCount` to 4.
1. Let's say after a year, runtime config becomes invalid and Weaviate cannot load the new runtime config.
1. Weaviate now will be keep using `MaximumAllowedCollectionCount` as 4 (old runtime config).
1. Now say if Weaviate crashes and it cannot load runtime config at the startup (because it's invalid), we cannot let Weaviate start with default ENV config then it's a wrong config (`MAXIMUM_ALLOWED_COLLECTION_COUNT` is 10). So we fail to start and let the operator fix the runtime config.

That's why it's important to set up proper alerting based on these metrics and logs to quickly identify configuration issues proactively.
