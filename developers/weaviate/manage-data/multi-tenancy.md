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


Multi-tenancy isolates data between tenants (typically end users) in a Weaviate instance, for example in a SaaS application. Each tenant is a separate shard in Weaviate.

<details>
  <summary>
    Multi-tenancy availability
  </summary>

- Multi-tenancy added in `v1.20`
- (Experimental) Tenant activity status setting added in `v1.21`

</details>

## Enable multi-tenancy


Multi-tenancy is disabled by default. To enable it, set the `multiTenancyConfig` variable in the collection definition as shown below:


<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START EnableMultiTenancy"
      endMarker="# END EnableMultiTenancy"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START EnableMultiTenancy"
      endMarker="# END EnableMultiTenancy"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START EnableMultiTenancy"
      endMarker="// END EnableMultiTenancy"
      language="ts"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START EnableMultiTenancy"
      endMarker="// END EnableMultiTenancy"
      language="java"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START EnableMultiTenancy"
      endMarker="// END EnableMultiTenancy"
      language="go"
    />
  </TabItem>
</Tabs>


## Add tenant(s)

Add tenants to a collection (`MultiTenancyCollection`) with a name (e.g. `tenantA`) and an optional tenant activity status as `HOT`(active, default) or `COLD` (inactive).

<details>
  <summary>
    Additional information
  </summary>

import TenantNameFormat from '/_includes/tenant-names.mdx';

Tenant status is available from Weaviate `1.21` onwards.
<br/>

<TenantNameFormat/>

</details>


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

## List tenant(s)

List existing tenants in a collection (e.g.`MultiTenancyCollection`):

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

## Delete tenant(s)

Delete one or more existing tenants in a collection (e.g. `MultiTenancyCollection`) and tenant names (e.g. `["tenantB", "tenantX"]`).

Non-existing tenants are ignored.


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

## Update tenant activity status

Update existing tenants' activity status to active (`HOT`) or inactive (`COLD`).


<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START UpdateTenants"
      endMarker="# END UpdateTenants"
      language="py"
    />
  </TabItem>
</Tabs>

<details>
  <summary>
    Additional information
  </summary>

- This feature was added in `v1.21`
- Other client code examples coming soon
- For now, please send a [PUT request through the REST API endpoint](../api/rest/schema.md#update-tenants) to update the tenant activity status.

</details>


## CRUD operations

Multi-tenancy collections require tenant name (e.g. `tenantA`) with each CRUD operation, as shown in the object creation example below.

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


## Search queries

Multi-tenancy collections require the tenant name (e.g. `tenantA`) with each `Get` and `Aggregate` query operation.

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

A cross-reference can be added from a multi-tenancy collection object to:
- A non-multi-tenancy collection object, or
- An object belonging to the same tenant.

Multi-tenancy collections require the tenant name (e.g. `tenantA`) when creating, updating or deleting cross-references.

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


## Related pages

- [Connect to Weaviate](/developers/weaviate/tutorials/connect.mdx)
- [How to: Configure a schema](../manage-data/collections.mdx)
- [References: REST API: Schema: Multi-tenancy](../api/rest/schema.md#multi-tenancy)
- [Concepts: Data Structure: Multi-tenancy](../concepts/data.md#multi-tenancy)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
