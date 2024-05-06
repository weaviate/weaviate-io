# START CreateWithAMT
curl localhost:8080/v1/schema -H 'content-type:application/json' -d \
'{
  "class": "Customer",
  "properties": [
    {
      "name": "customer_name",
      "dataType": ["text"]
    },
    {
      "name": "customer_category",
      "dataType": ["text"]
    }
  ],
  # highlight-start
  "multiTenancyConfig": {
    "enabled": true,
    "autoTenantCreation": true
  }
  # highlight-end
}'
# END CreateWithAMT
