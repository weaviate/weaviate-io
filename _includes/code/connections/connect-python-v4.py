# THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END

# START TimeoutLocal
import weaviate
from weaviate.classes.init import AdditionalConfig, Timeout

client = weaviate.connect_to_local(
    port=8080,
    grpc_port=50051,
    additional_config=AdditionalConfig(
        timeout=Timeout(init=2, query=45, insert=120)  # Values in seconds
    )
)
# END TimeoutLocal