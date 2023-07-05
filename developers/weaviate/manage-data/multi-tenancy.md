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

<!-- TODO: Refactor code examples to separate out Python/TS/etc. files -->
<!-- TODO: Add TS/Go/Java examples -->

<Tabs groupId="languages">
  <TabItem value="py" label="Python">

  ```python
  # add tenants to that schema
  from weaviate import Tenant

  client.schema.add_class_tenants(
      class_name="MultiTenancyClass",  # The class to which the tenants will be added
      tenants=[Tenant(name="tenantA"), Tenant(name="tenantB")]
  )
  ```

  </TabItem>
  <TabItem value="js" label="TypeScript">

  ```ts
  // TypeScript code coming soon
  ```

  </TabItem>
</Tabs>

### List tenant(s)

To list existing tenants in a class, you must provide the Weaviate class name.

Code examples are shown below for listing the existing tenants in the `MultiTenancyClass` class:

<Tabs groupId="languages">
  <TabItem value="py" label="Python">

  ```python
  # Add tenants to a class
  client.schema.get_class_tenants(
    class_name="MultiTenancyClass"  # The class from which the tenants will be retrieved
  )
  ```

  </TabItem>
  <TabItem value="js" label="TypeScript">

  ```ts
  // TypeScript code coming soon
  ```

  </TabItem>
</Tabs>

### Delete tenant(s)

You can delete one or more existing tenants in a class by providing the Weaviate class name.

Code examples are shown below for listing the existing tenants in the `MultiTenancyClass` class:

<Tabs groupId="languages">
  <TabItem value="py" label="Python">

  ```python
  # Remove a list of tenants from a class
  client.schema.remove_class_tenants(
    class_name="MultiTenancyClass",  # The class from which the tenants will be removed
    # highlight-start
    tenants=["tenantA", "tenantX"]  # The tenants to be removed
    # highlight-end
  )
  ```

  </TabItem>
  <TabItem value="js" label="TypeScript">

  ```ts
  // TypeScript code coming soon
  ```

  </TabItem>
</Tabs>

## Object operations

### CRUD operations

If multi-tenancy is enabled, you must provide the tenant name to Weaviate in each CRUD operation.

Code examples are shown below for creating an object in the `MultiTenancyClass` class:

<Tabs groupId="languages">
  <TabItem value="py" label="Python">

  ```python
  client.data_object.create(
      class_name="MultiTenancyClass",  # The class to which the object will be added
      data_object={
          "question": "This vector DB is OSS & supports automatic property type inference on import"
      },
      # highlight-start
      tenant="tenantA"  # The tenant to which the object will be added,
      # highlight-end
  )
  ```

  </TabItem>
  <TabItem value="js" label="TypeScript">

  ```ts
  // TypeScript code coming soon
  ```

  </TabItem>
</Tabs>

### Search queries

`Get` and `Aggregate` queries support multi-tenancy operations. (`Explore` queries do not support multi-tenancy operations at this point.)

If multi-tenancy is enabled, you must provide the tenant name to Weaviate in each search query.

Code examples are shown below for fetching one object in the `MultiTenancyClass` class from the tenant `tenantA`:

<Tabs groupId="languages">
  <TabItem value="py" label="Python">

  ```python
  results = (
      client.query.get("MultiTenancyClass", ["property1", "property2"])
      .with_limit(1)
      # highlight-start
      .with_tenant("tenantA")
      # highlight-end
      .do()
  )
  ```

  </TabItem>
  <TabItem value="js" label="TypeScript">

  ```ts
  // TypeScript code coming soon
  ```

  </TabItem>
</Tabs>

## Cross-references

If multi-tenancy is enabled, you must provide the tenant name to Weaviate while creating, updating or deleting cross-references.

You can establish a cross-reference from a multi-tenancy class object to:
- A non-multi-tenancy class object, or
- A multi-tenancy class object belonging to the same tenant.

Code examples are shown below for creating a cross-reference between two objects. It links an object in the `MTPassage` class that belongs to `tenantA` to an object in the `Document` class:

<Tabs groupId="languages">
  <TabItem value="py" label="Python">

  ```python
  client.data_object.reference.add(
      from_uuid="38618fc9-534c-5484-807e-f63593287eaa"  # MTPassage object UUID
      from_class_name="MTPassage",
      from_property_name="ofDocument",
      tenant="tenantA",
      to_class_name="Document",
      to_uuid="22ff67f5-8534-58ec-b306-f0e76018f07f"  # Document object UUID
  )
  ```

  </TabItem>
  <TabItem value="js" label="TypeScript">

  ```ts
  // TypeScript code coming soon
  ```

  </TabItem>
</Tabs>

As described above, the `Document` class object can be either:
- A non-multi-tenancy object or
- A multi-tenancy object belonging to `tenantA`.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />

