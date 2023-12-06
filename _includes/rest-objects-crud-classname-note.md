:::caution Class Name in Object CRUD Operations
Collections act like namespaces, so two different collections could have duplicate IDs between them.<p><br/></p>

Prior to Weaviate `v1.14` you can manipulate objects without specifying the collection name. This method is deprecated. It will be removed in Weaviate `v2.0.0`.<br/><br/>

Starting in `v1.20`, you can have [multi-tenant](/developers/weaviate/concepts/data#multi-tenancy) datasets. When `multi-tenancy` is enabled, the tenant name is required.<br/><br/>

Always include the collection name, and, when enabled, the tenant name.
:::
