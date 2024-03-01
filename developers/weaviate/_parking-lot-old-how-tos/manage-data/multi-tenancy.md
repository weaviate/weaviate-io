---
title: Multi-tenancy operations
sidebar_position: 60
image: og/docs/configuration.jpg
# tags: ['configuration', 'multi-tenancy']
---



import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/manage-data.multi-tenancy.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/manage-data.multi-tenancy-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/manage-data.multi-tenancy.ts';
import JavaCode from '!!raw-loader!/_includes/code/howto/java/src/test/java/io/weaviate/docs/manage-data.multi-tenancy.java';
import GoCode from '!!raw-loader!/_includes/code/howto/go/docs/manage-data.multi-tenancy_test.go';

:::info Related pages
- [How to: Configure a schema](../manage-data/collections.mdx)
- [References: REST API: Schema: Multi-tenancy](../api/rest/schema.md#multi-tenancy)
- [Concepts: Data Structure: Multi-tenancy](../concepts/data.md#multi-tenancy)
:::

## Enable multi-tenancy

:::info Multi-tenancy availability
- Multi-tenancy added in `v1.20`
- (Experimental) Tenant activity status setting added in `v1.21`
:::

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

To add tenants to a class, you must provide the tenant names to the Weaviate class. From `1.21` onwards, you can specify if the tenant is active (`HOT`, default), or inactive (`COLD`).

import TenantNameFormat from '/_includes/tenant-names.mdx';

<TenantNameFormat/>

Code examples are shown below in which the tenants `tenantA` and `tenantB` are added to the class `MultiTenancyClass`:

<!-- TODO: Add TS/Go/Java examples -->

<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START AddTenantsToClass"
      endMarker="# END AddTenantsToClass"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START AddTenantsToClass"
      endMarker="// END AddTenantsToClass"
      language="java"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START AddTenantsToClass"
      endMarker="// END AddTenantsToClass"
      language="go"
    />
  </TabItem>
</Tabs>

### List tenant(s)

To list existing tenants in a class, you must provide the Weaviate class name.

Code examples are shown below for listing the existing tenants in the `MultiTenancyClass` class:

<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START ListTenants"
      endMarker="# END ListTenants"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START ListTenants"
      endMarker="// END ListTenants"
      language="java"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START ListTenants"
      endMarker="// END ListTenants"
      language="go"
    />
  </TabItem>
</Tabs>

### Delete tenant(s)

You can delete one or more existing tenants in a class by providing the Weaviate class name.

If a tenant specified for deletion doesn't belong to the class, it is ignored.


<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START RemoveTenants"
      endMarker="# END RemoveTenants"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START RemoveTenants"
      endMarker="// END RemoveTenants"
      language="java"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START RemoveTenants"
      endMarker="// END RemoveTenants"
      language="go"
    />
  </TabItem>
</Tabs>

### Update tenant's activity status

:::info Added in `v1.21`
:::

You can update one or more existing tenants' activity status to active ("HOT") or inactive ("COLD").

:::info Client code examples coming soon
For now, please send a [PUT request through the REST API endpoint](../api/rest/schema.md#update-tenants) to update the tenant activity status.
:::

## Object operations

### CRUD operations

If multi-tenancy is enabled, you must provide the tenant name to Weaviate in each CRUD operation.

Code examples are shown below for creating an object in the `MultiTenancyClass` class:

<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START CreateMtObject"
      endMarker="# END CreateMtObject"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START CreateMtObject"
      endMarker="// END CreateMtObject"
      language="java"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START CreateMtObject"
      endMarker="// END CreateMtObject"
      language="go"
    />
  </TabItem>
</Tabs>


### Search queries

`Get` and `Aggregate` queries support multi-tenancy operations. (`Explore` queries do not support multi-tenancy operations at this point.)

If multi-tenancy is enabled, you must provide the tenant name to Weaviate in each search query.

Code examples are shown below for fetching one object in the `MultiTenancyClass` class from the tenant `tenantA`:

<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START Search"
      endMarker="# END Search"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START Search"
      endMarker="// END Search"
      language="java"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START Search"
      endMarker="// END Search"
      language="go"
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
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START AddCrossRef"
      endMarker="# END AddCrossRef"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START AddCrossRef"
      endMarker="// END AddCrossRef"
      language="java"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START AddCrossRef"
      endMarker="// END AddCrossRef"
      language="go"
    />
  </TabItem>
</Tabs>


As described above, the `JeopardyCategory` class object can be either:
- A non-multi-tenancy object or
- A multi-tenancy object belonging to `tenantA`.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
