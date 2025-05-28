---
title: Adding runtime configurations
sidebar_position: 6
image: og/contributor-guide/weaviate-core.jpg
# tags: ['contributor-guide']
---

:::caution Technical preview

Runtime configuration management was added in **`v1.30`** as a **technical preview**.
<br/>

This means that the feature is still under development and may change in future releases, including potential breaking changes.
**We do not recommend using this feature in production environments at this time.**

:::

Weaviate supports runtime configuration management, allowing certain environment variables to be updated and read by Weaviate on the fly without the need for restarts. This feature helps you adapt settings in real time and fine-tune your instance based on evolving needs.

For more information on how to **use runtime configuration**, look at the [user guide](/developers/weaviate/config-refs/env-vars/runtime-config.md). This document talks about how to add support to the configs to be changed dynamically during runtime.

## Add support for configuration changes during runtime

We have two core types used to manage your configs dynamically: `runtime.DynamicType` and `runtime.DynamicValue`. These look roughly like this:

```go
// DynamicType represents different types that is supported in runtime configs
type DynamicType interface {
	~int | ~float64 | ~bool | time.Duration | ~string
}

// DynamicValue represents any runtime config value. Its zero value is fully usable.
// If you want zero value with different `default`, use `NewDynamicValue` constructor.
type DynamicValue[T DynamicType] struct {
	...[private fields]
}
```

This means `DynamicType` currently supports the types: `~int`, `~float64`, `~bool`, `~string`, `time.Duration`.

If you want a config option to support dynamic updates, follow these high-level steps. For example, suppose you have a config called `MaxLimit` of type `int`.

```go
type Config struct {
	....
	MaxLimit int
}
```

### 1. Convert `int` -> `DynamicValue[int]` (or the appropriate type)

```go
type Config struct {
	MaxLimit *runtime.DynamicValue[int]
}
```

Also update the config parsing code (usually `FromEnv()` in `weaviate/usecases/config/environment.go`)

```go
	config.MaxLimit = runtime.NewDynamicValue(12) // default value for your config is `12` now
```

### 2. Add it to `config.WeaviateRuntimeConfig`.

```go
type WeaviateRuntimeConfig struct {
	...
	MaxLimit *runtime.DynamicValue[int] `json:"max_limit" yaml:"max_limit"`
}
```

### 3. Register your config in `runtime.ConfigManager`.

This usually happens in `initRuntimeOverrides()` in `adaptors/handlers/rest/configure_api.go`.

```go
	registered := &config.WeaviateRuntimeConfig{}
	...
	registered.MaxLimit = appState.ServerConfig.Config.MaxLimit
```

### 4. Consume the dynamic value via `value.Get()`

To access the current value of the config, use `config.MaxLimit.Get()` instead of referencing `config.MaxLimit` directly. This ensures you get the updated value dynamically.

:::info
When `RUNTIME_OVERRIDES_ENABLED=false`, your config still behaves as a static config and uses the default value (`12` in this example) provided via `NewDynamicValue(12)`.
:::
