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
import TSCodeLegacy from '!!raw-loader!/_includes/code/howto/manage-data.multi-tenancy-v2.ts';
import JavaCode from '!!raw-loader!/_includes/code/howto/java/src/test/java/io/weaviate/docs/manage-data.multi-tenancy.java';
import GoCode from '!!raw-loader!/_includes/code/howto/go/docs/manage-data.multi-tenancy_test.go';
import CurlCode from '!!raw-loader!/_includes/code/howto/manage-data.multi-tenancy-curl.sh';

Multi-tenancy provides data isolation. Each tenant is stored on a separate shard. Data stored in one tenant is not visible to another tenant. If your application serves many different users, multi-tenancy keeps their data private and makes database operations more efficient.

<details>
  <summary>
    Multi-tenancy availability
  </summary>

- Multi-tenancy added in `v1.20`
- (Experimental) Tenant activity status setting added in `v1.21`

</details>

## Enable multi-tenancy

Multi-tenancy is disabled by default. To enable multi-tenancy, set `multiTenancyConfig`in the collection definition:

<Tabs groupId="languages">
  <TabItem value="py4" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START EnableMultiTenancy"
      endMarker="# END EnableMultiTenancy"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START EnableMultiTenancy"
      endMarker="# END EnableMultiTenancy"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START EnableMultiTenancy"
      endMarker="// END EnableMultiTenancy"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
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

## Automatically add new tenants

By default, Weaviate returns an error if you try to insert an object into a non-existent tenant. To create a new tenant instead, set `autoTenantCreation` to `true` in the collection definition. The auto-tenant feature is only available during batch imports.

Set `autoTenantCreation` when you create the collection, or update the setting as needed.

Automatic tenant creation is useful when you batch import a large number of objects. Be cautious if your data is likely to have small inconsistencies or typos. For example, the names `TenantOne`, `tenantOne`, and `TenntOne` will create three different tenants.

### Create a collection

<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START EnableAutoMT"
      endMarker="# END EnableAutoMT"
      language="py"
    />
  </TabItem>
  <TabItem value="cURL" label="cURL">
    <FilteredTextBlock
      text={CurlCode}
      startMarker="# START CreateWithAMT"
      endMarker="# END CreateWithAMT"
      language="py"
    />
  </TabItem>
</Tabs>

### Update a collection

Use the client to update the auto-tenant creation setting. Auto-tenant is only available for batch inserts.

<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START UpdateAutoMT"
      endMarker="# END UpdateAutoMT"
      language="py"
    />
  </TabItem>
</Tabs>

## Add new tenants manually

To add tenants to a collection, specify the collection and the new tenants. Optionally, specify the tenant activity status as `HOT`(active, default) or `COLD` (inactive).

This example adds `tenantA` to the `MultiTenancyCollection` collection:

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
  <TabItem value="py4" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START AddTenantsToClass"
      endMarker="# END AddTenantsToClass"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START AddTenantsToClass"
      endMarker="# END AddTenantsToClass"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START AddTenantsToClass"
      endMarker="// END AddTenantsToClass"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
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

## List all tenants

List existing tenants in a collection.

This example lists the tenants in the `MultiTenancyCollection` collection:

<Tabs groupId="languages">
  <TabItem value="py4" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START ListTenants"
      endMarker="# END ListTenants"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START ListTenants"
      endMarker="# END ListTenants"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START ListTenants"
      endMarker="// END ListTenants"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
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

## Get tenants by name

Get tenants from a collection by name. Note that non-existent tenant names are ignored in the response.

This example returns `tenantA` and `tenantB` from the `MultiTenancyCollection` collection:

<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START GetTenantsByName"
      endMarker="# END GetTenantsByName"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START GetOneTenant"
      endMarker="// END GetOneTenant"
      language="ts"
    />
  </TabItem>

</Tabs>

## Get one tenant

Get a particular tenant from a collection.

This example returns a tenant from the `MultiTenancyCollection` collection:

<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START GetOneTenant"
      endMarker="# END GetOneTenant"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START GetOneTenant"
      endMarker="// END GetOneTenant"
      language="ts"
    />
  </TabItem>

</Tabs>


## Delete tenants

To delete tenants from a collection, specify the collection and the tenants. The delete operation ignores tenant names if the named tenant is not a part of the collection.

In this example, Weaviate removes `tenantB` and `tenantX` from the `MultiTenancyCollection` collection.

<Tabs groupId="languages">
  <TabItem value="py4" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START RemoveTenants"
      endMarker="# END RemoveTenants"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START RemoveTenants"
      endMarker="# END RemoveTenants"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START RemoveTenants"
      endMarker="// END RemoveTenants"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
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
  <TabItem value="py4" label="Python Client v4">
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
- For now, please send a [PUT request through the REST API endpoint](/developers/weaviate/api/rest#tag/schema) to update the tenant activity status.

</details>

## CRUD operations

Multi-tenancy collections require tenant name (e.g. `tenantA`) with each CRUD operation, as shown in the object creation example below.

<Tabs groupId="languages">
  <TabItem value="py4" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START CreateMtObject"
      endMarker="# END CreateMtObject"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START CreateMtObject"
      endMarker="# END CreateMtObject"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START CreateMtObject"
      endMarker="// END CreateMtObject"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
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
  <TabItem value="py4" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START Search"
      endMarker="# END Search"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START Search"
      endMarker="# END Search"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START Search"
      endMarker="// END Search"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
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
  <TabItem value="py4" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START AddCrossRef"
      endMarker="# END AddCrossRef"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START AddCrossRef"
      endMarker="# END AddCrossRef"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START AddCrossRef"
      endMarker="// END AddCrossRef"
      language="ts"
    />
  </TabItem>

 <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
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

- [Connect to Weaviate](/developers/weaviate/starter-guides/connect.mdx)
- [How to: Configure a schema](../manage-data/collections.mdx)
- [References: REST API: Schema](/developers/weaviate/api/rest#tag/schema)
- [Concepts: Data Structure: Multi-tenancy](../concepts/data.md#multi-tenancy)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
