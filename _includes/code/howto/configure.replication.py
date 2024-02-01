# How-to: Configure -> Replication - Python examples

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# START ConfigureReplication  # START QueryWithReplication
import weaviate
from weaviate.classes.config import Property, DataType, Configure
# END ConfigureReplication  # START QueryWithReplication
from weaviate.classes import ConsistencyLevel
# START ConfigureReplication  # START QueryWithReplication

client = weaviate.connect_to_local(port=8180, grpc_port=50151)

try:
    # END ConfigureReplication  # END QueryWithReplication

    # Create the collections, whether they exist or not
    client.collections.delete(["Article", "Publication"])


    # START ConfigureReplication
    articles = client.collections.create(
        name="Article",
        properties=[
            Property(name="title", data_type=DataType.TEXT)
        ],
        replication_config=Configure.replication(factor=3)
    )
    # END ConfigureReplication

    # Test
    assert articles.config.get().replication_config.factor == 3

    articles.with_consistency_level(ConsistencyLevel.ALL)  # Set the consistency level
    articles.data.insert(
        properties={"title": "Why the Star Wars Holiday Special is the perfect watch for the holidays."},
        uuid="36ddd591-2dee-4e7e-a3cc-eb86d30a4303"
    )

    # START QueryWithReplication
    articles.with_consistency_level(ConsistencyLevel.ONE)  # Set the consistency level
    response = articles.query.fetch_object_by_id(uuid="36ddd591-2dee-4e7e-a3cc-eb86d30a4303")
    # END QueryWithReplication

    assert response.properties["title"].lower().startswith("why the")


# START-ANY

finally:
    client.close()
# END-ANY
