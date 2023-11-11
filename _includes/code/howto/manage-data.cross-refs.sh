# How-to: Manage-data -> Update objects - Curl examples

// START OneWay Cross-references
curl \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"beacon": "weaviate://localhost/<REFERENCED_CLASS_NAME>/<REFERENCED_OBJECT_UUID>" }' \
    https://<WEAVIATE_URI>/v1/objects/<REFERENCING_CLASS_NAME>/<REFERENCING_OBJECT_UUID>/references/<REFERENCED_CLASS_PROPERY>?consistency_level=ALL[,tenant=<TENANT_ID>]
// END OneWay Cross-references
