import weaviate
from weaviate.classes.config import Configure, Property, DataType

client = weaviate.connect_to_local(
    port=8180,
    grpc_port=50151,
)

collection_name = "MyReplicatedDocCollection"

if not client.collections.exists(collection_name):
    replica_collection = client.collections.create(
        name=collection_name,
        properties=[
            Property(name="title", data_type=DataType.TEXT),
            Property(name="body", data_type=DataType.TEXT),
        ],
        replication_config=Configure.replication(factor=2),
    )
else:
    replica_collection = client.collections.get(collection_name)

replica_collection.data.insert(
    {
        "title": "Lorem Ipsum",
        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    }
)

_collection_sharding_state_for_setup = client.replication.query_sharding_state(
    collection=collection_name
)
assert (
    _collection_sharding_state_for_setup and _collection_sharding_state_for_setup.shards
)


shard_name = _collection_sharding_state_for_setup.shards[0].name
replicas = _collection_sharding_state_for_setup.shards[0].replicas
source_node_name = replicas[0]

potential_target_nodes = [
    "node1",
    "node2",
    "node3",
]
target_node_name = next(
    (node for node in potential_target_nodes if node not in replicas), "node2"
)  # Default to "node2" if no other node is available; adjust as needed

# 1. Replicate (Copy) a Shard
# Initiates the copy of a shard to another node.
# START ReplicateShard
from weaviate.replication.models import TransferType

operation_id = client.replication.replicate(
    collection=collection_name,
    shard=shard_name,
    source_node=source_node_name,
    target_node=target_node_name,
    transfer_type=TransferType.COPY,  # or TransferType.MOVE
)
print(f"Replication initiated, ID: {operation_id}")
# END ReplicateShard

# 2. Get Replication Operation Status
# START CheckOperationStatus
op_status = client.replication.operations.get(
    uuid=operation_id,
    # include_history=True
)
print(f"Status for {operation_id}: {op_status.status.state}")
# END CheckOperationStatus

# 3. List Replication Operations
# START ListReplicationOperations
all_ops = client.replication.operations.list_all()
print(f"Total replication operations: {len(all_ops)}")

filtered_ops = client.replication.operations.query(
    collection=collection_name,
    target_node=target_node_name,
)
print(
    f"Filtered operations for collection '{collection_name}' on '{target_node_name}': {len(filtered_ops)}"
)
# END ListReplicationOperations

# 4. Cancel a Replication Operation
# START CancelOperation
client.replication.operations.cancel(uuid=operation_id)
# END CancelOperation

# 5. Delete a Replication Operation Record
# START DeleteOperationRecord
client.replication.operations.delete(uuid=operation_id)
# END DeleteOperationRecord

# 6. Query Sharding State
# START CheckShardingState
collection_sharding_state = client.replication.query_sharding_state(
    collection=collection_name
)
if collection_sharding_state and collection_sharding_state.shards:
    print(
        f"Shards in '{collection_name}': {[s.name for s in collection_sharding_state.shards]}"
    )

# This uses 'shard_name' defined earlier in the script, for example, shard_name = "tF9DtxC59ykC"
specific_shard_state = client.replication.query_sharding_state(
    collection=collection_name, shard=shard_name
)
if specific_shard_state and specific_shard_state.shards:
    print(f"Nodes for shard '{shard_name}': {specific_shard_state.shards[0].replicas}")
# END CheckShardingState

client.close()
