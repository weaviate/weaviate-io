# START BasicConnect
import weaviate

client = weaviate.connect_to_local(
    port=80,            # The default REST port is 8080
    # grpc_port=50051   # Not needed, as the default gRPC port is 50051
)
# END BasicConnect

client.close()

WEAVIATE_SVC_EXTERNAL_IP = "127.0.0.1"
GRPC_SVC_EXTERNAL_IP = "127.0.0.1"

# START CustomConnect
import weaviate

client = weaviate.connect_to_custom(
  http_host=WEAVIATE_SVC_EXTERNAL_IP,   # The external IP of the weaviate service
  http_port=80,                         # The default REST port is 8080
  http_secure=False,                    # Whether to use https (secure) for the HTTP API connection
  grpc_host=GRPC_SVC_EXTERNAL_IP,       # The external IP of the weaviate-grpc service
  grpc_port=50051,                      # The default gRPC port is 50051
  grpc_secure=False                     # Set to True if the gRPC connection is secure
)
# END CustomConnect

client.close()
