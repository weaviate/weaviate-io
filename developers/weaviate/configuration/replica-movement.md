---
title: Replica movement
sidebar_position: 65
image: og/docs/configuration.jpg
---

:::caution Do not use in production
Available starting in `v1.31`. This is an experimental feature and shouldn't be used in a production environment for now.
:::

Beyond setting the initial replication factor, you can actively manage the placement of shard replicas within your Weaviate cluster. This is useful for rebalancing data after scaling, decommissioning nodes, or optimizing data locality. Replica movement is managed through a set of dedicated RESTful API endpoints.

## Checking sharding state

Before initiating any movement, you might want to inspect the current distribution of replicas. You can retrieve the locations of all replicas or for specific collections and shards.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/\_includes/code/python/howto.configure.replica.movement.py';

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START CheckShardingState"
      endMarker="# END CheckShardingState"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">

```typescript
// JS/TS support coming soon
```

</TabItem>
<TabItem value="go" label="Go">

```go
// Go support coming soon
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java support coming soon
```

</TabItem>
</Tabs>

---

## Initiating a replica movement operation

This starts the asynchronous process of creating a replica on a new node and, if moving, removing it from the old one. When copying a replica, the replication factor for that shard will be increased as opposed to moving the replica.

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
text={PyCode}
startMarker="# START ReplicateShard"
endMarker="# END ReplicateShard"
language="py"
/>
</TabItem>
<TabItem value="js" label="JS/TS Client v3">

```typescript
// JS/TS support coming soon
```

</TabItem>
<TabItem value="go" label="Go">

```go
// Go support coming soon
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java support coming soon
```

</TabItem>
</Tabs>

---

## Checking the status of a movement operation

Since movement is asynchronous, you can monitor its progress. The movement operation can have one of the following states:

- `REGISTERED`
- `HYDRATING`
- `FINALIZING`
- `DEHYDRATING`
- `READY`
- `CANCELLED`

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
text={PyCode}
startMarker="# START CheckOperationStatus"
endMarker="# END CheckOperationStatus"
language="py"
/>
</TabItem>
<TabItem value="js" label="JS/TS Client v3">

```typescript
// JS/TS support coming soon
```

</TabItem>
<TabItem value="go" label="Go">

```go
// Go support coming soon
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java support coming soon
```

</TabItem>
</Tabs>

---

## Listing replication operations

List all ongoing or recently completed operations. This can be filtered by node, collection and shard.

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
text={PyCode}
startMarker="# START ListReplicationOperations"
endMarker="# END ListReplicationOperations"
language="py"
/>
</TabItem>
<TabItem value="js" label="JS/TS Client v3">

```typescript
// JS/TS support coming soon
```

</TabItem>
<TabItem value="go" label="Go">

```go
// Go support coming soon
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java support coming soon
```

</TabItem>
</Tabs>

---

## Cancelling a movement operation

If a movement needs to be stopped before completion. The operation will be stopped and will remain in a 'CANCELLED' state.

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
text={PyCode}
startMarker="# START CancelOperation"
endMarker="# END CancelOperation"
language="py"
/>
</TabItem>
<TabItem value="js" label="JS/TS Client v3">

```typescript
// JS/TS support coming soon
```

</TabItem>
<TabItem value="go" label="Go">

```go
// Go support coming soon
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java support coming soon
```

</TabItem>
</Tabs>

---

## Deleting a movement operation record

To remove the record of a completed, cancelled, or failed operation. If the operation is active, it will be cancelled first.

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
text={PyCode}
startMarker="# START DeleteOperationRecord"
endMarker="# END DeleteOperationRecord"
language="py"
/>
</TabItem>
<TabItem value="js" label="JS/TS Client v3">

```typescript
// JS/TS support coming soon
```

</TabItem>
<TabItem value="go" label="Go">

```go
// Go support coming soon
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java support coming soon
```

</TabItem>
</Tabs>

## Further resources

For more details about the replica movement operations, check out the [REST API](https://www.google.com/search?q=../api/rest.md) documentation.

## Questions and feedback

import DocsFeedback from '/\_includes/docs-feedback.mdx';

<DocsFeedback/>
