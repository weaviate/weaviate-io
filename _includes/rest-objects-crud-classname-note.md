:::caution Class Name in Object CRUD Operations
Prior to Weaviate v1.14 it was possible to manipulate objects using only their ID without specifying the class name. This way is still supported for backward compatibility, but is considered deprecated now. Avoid using the deprecated endpoints, as they will be removed with Weaviate `v2.0.0`.

The reason for the deprecation is that classes generally act like namespaces, therefore it is also feasible to have duplicate IDs across classes. However, when manipulating exactly one object by its ID (such as an update or delete), the ID may not be unique. It is thus recommended to always include the class name when manipulating objects.
:::