:::caution Collection (class) Name in Object CRUD Operations
Prior to Weaviate `v1.14` it was possible to manipulate objects using only their ID without specifying the collection name. This way is still supported for backward compatibility, but is considered deprecated now. Avoid using the deprecated endpoints, as they will be removed with Weaviate `v2.0.0`.<p><br/></p>

The reason for the deprecation is that collections generally act like namespaces, therefore duplicate IDs are possible.<p><br/></p>

Additionally, where [multi-tenancy](/developers/weaviate/concepts/data#multi-tenancy) (available from `v1.20.0`) is enabled, the tenant name is required.<p><br/></p>

It is thus recommended to always include the collection name when manipulating objects.
:::
