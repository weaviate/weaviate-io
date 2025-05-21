import weaviate
from weaviate.classes.config import Configure, Property, DataType

# --- Client Setup ---
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

# Initial query to get shard_name, source_node_name for subsequent operations
# This part is setup for other operations like ReplicateShard.
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
]  # Ensure these nodes exist in your Weaviate cluster setup
target_node_name = next(
    (node for node in potential_target_nodes if node not in replicas), "node2"
)  # Default to "node2" if no other node is available; adjust as needed

# 1. Replicate (Copy) a Shard
# Initiates the copy of a shard to another node.
# START ReplicateShard
operation_id = client.replication.replicate(
    collection=collection_name,
    shard=shard_name,
    source_node=source_node_name,
    target_node=target_node_name,  # This performs a copy. The REST API distinguishes MOVE/COPY.
)
print(f"Replication initiated, ID: {operation_id}")
# END ReplicateShard

# 2. Get Replication Operation Status
# (Assumes 'operation_id' from the previous step is valid)
# START CheckOperationStatus
op_status = client.replication.operations.get(uuid=operation_id)
print(
    f"Status for {operation_id}: {op_status.status.state if op_status else 'Not found'}"
)

op_status_with_history = client.replication.operations.get(
    uuid=operation_id, include_history=True
)
print(
    f"History for {operation_id} (first entry if available): {op_status_with_history.status_history[0] if op_status_with_history and op_status_with_history.status_history else 'No history'}"
)
# END CheckOperationStatus

# 3. List Replication Operations
# START ListReplicationOperations
all_ops = client.replication.operations.list_all()
print(f"Total replication operations: {len(all_ops)}")

filtered_ops = client.replication.operations.query(
    collection=collection_name,
    target_node=target_node_name,  # Using target_node_name from the replicate operation
)
print(
    f"Filtered operations for collection '{collection_name}' on '{target_node_name}': {len(filtered_ops)}"
)
# END ListReplicationOperations

# 4. Cancel a Replication Operation
# (Assumes 'operation_id' is for an ongoing operation. May complete too quickly to cancel in a script.)
# START CancelOperation
try:
    client.replication.operations.cancel(uuid=operation_id)
    print(f"Cancel request sent for operation ID: {operation_id}")
    # op_status_after_cancel = client.replication.operations.get(uuid=operation_id) # Optional: check status after cancel
    # print(f"Status after cancel attempt: {op_status_after_cancel.status.state if op_status_after_cancel else 'Not found'}")
except Exception as e:
    print(
        f"Could not cancel operation {operation_id} (it may have already completed or failed): {e}"
    )
# END CancelOperation


# 5. Delete a Replication Operation Record
# (Assumes 'operation_id' is for a completed, failed, or cancelled operation)
# START DeleteOperationRecord
try:
    client.replication.operations.delete(uuid=operation_id)
    print(f"Delete request sent for operation record ID: {operation_id}")
    # op_status_after_delete = client.replication.operations.get(uuid=operation_id) # Optional: check status after delete
    # print(f"Status after delete attempt: {'Record deleted' if op_status_after_delete is None else 'Record still exists'}")
except Exception as e:
    print(f"Could not delete operation record {operation_id}: {e}")
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
