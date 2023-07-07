---
title: Multi-tenancy operations
sidebar_position: 60
image: og/docs/configuration.jpg
# tags: ['configuration', 'multi-tenancy']
---

import Badges from '/_includes/badges.mdx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/howto/manage-data.multi-tenancy.py';
import TSCode from '!!raw-loader!/_includes/code/howto/manage-data.multi-tenancy.ts';


<Badges/>

:::info Related pages
- [How to: Configure a schema](../configuration/schema-configuration.md)
- [References: REST API: Schema](../api/rest/schema.md)
- [Concepts: Data Structure](../concepts/data.md#multi-tenancy)
:::

## Enable multi-tenancy

Multi-tenancy is disabled by default. To enable it, set the `multiTenancyConfig` variable in the class definition as shown below:

```json
{
  "class": "MultiTenancyClass",
  // highlight-start
  "multiTenancyConfig": {"enabled": true}
  // highlight-end
}
```

## Class operations

### Add tenant(s)

To add tenants to a class, you must provide the tenant names to the Weaviate class.

Code examples are shown below in which the tenants `tenantA` and `tenantB` are added to the class `MultiTenancyClass`:

<!-- TODO: Add TS/Go/Java examples -->

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PythonCode}
      startMarker="# START AddTenantsToClass"
      endMarker="# END AddTenantsToClass"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START AddTenantsToClass"
      endMarker="// END AddTenantsToClass"
      language="ts"
    />
  </TabItem>
</Tabs>


### List tenant(s)

To list existing tenants in a class, you must provide the Weaviate class name.

Code examples are shown below for listing the existing tenants in the `MultiTenancyClass` class:

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PythonCode}
      startMarker="# START ListTenants"
      endMarker="# END ListTenants"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START ListTenants"
      endMarker="// END ListTenants"
      language="ts"
    />
  </TabItem>
</Tabs>


### Delete tenant(s)

You can delete one or more existing tenants in a class by providing the Weaviate class name.

If a tenant specified for deletion doesn't belong to the class, it is ignored.


<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PythonCode}
      startMarker="# START RemoveTenants"
      endMarker="# END RemoveTenants"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START RemoveTenants"
      endMarker="// END RemoveTenants"
      language="ts"
    />
  </TabItem>
</Tabs>

## Object operations

### CRUD operations

If multi-tenancy is enabled, you must provide the tenant name to Weaviate in each CRUD operation.

Code examples are shown below for creating an object in the `MultiTenancyClass` class:

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PythonCode}
      startMarker="# START CreateMtObject"
      endMarker="# END CreateMtObject"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START CreateMtObject"
      endMarker="// END CreateMtObject"
      language="ts"
    />
  </TabItem>
</Tabs>


### Search queries

`Get` and `Aggregate` queries support multi-tenancy operations. (`Explore` queries do not support multi-tenancy operations at this point.)

If multi-tenancy is enabled, you must provide the tenant name to Weaviate in each search query.

Code examples are shown below for fetching one object in the `MultiTenancyClass` class from the tenant `tenantA`:

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PythonCode}
      startMarker="# START Search"
      endMarker="# END Search"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START Search"
      endMarker="// END Search"
      language="ts"
    />
  </TabItem>
</Tabs>


## Cross-references

If multi-tenancy is enabled, you must provide the tenant name to Weaviate while creating, updating or deleting cross-references.

You can establish a cross-reference from a multi-tenancy class object to:
- A non-multi-tenancy class object, or
- A multi-tenancy class object belonging to the same tenant.

The example below creates a cross-reference between two objects. It links an object in the `MultiTenancyClass` class that belongs to `tenantA`, to an object in the `JeopardyCategory` class:

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PythonCode}
      startMarker="# START AddCrossRef"
      endMarker="# END AddCrossRef"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START AddCrossRef"
      endMarker="// END AddCrossRef"
      language="ts"
    />
  </TabItem>
</Tabs>


As described above, the `JeopardyCategory` class object can be either:
- A non-multi-tenancy object or
- A multi-tenancy object belonging to `tenantA`.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
